import * as fs from 'fs';
import * as path from 'path';
import _template from 'lodash.template';
import options from '@sum.cumo/nuxt-styleguide-config';
import Deferred from './Deferred';
import postcss from 'postcss';
import syntax from 'postcss-scss';
import doctrine from 'doctrine';
import applyMarkdownToDocs from './applyMarkdownToDocs';

const styleguideSrcDir = path.resolve(__dirname, '..', 'src');

const proxyTemplatePromise = new Promise((resolve, reject) => {
  fs.readFile(
    path.resolve(styleguideSrcDir, 'proxyComponent', 'proxyVariable.tjs'),
    (err, content) => {
      return err ? reject(err) : resolve(_template(content.toString()));
    }
  );
});

function readFile(file) {
  const d = new Deferred();

  fs.readFile(file, (err, data) => {
    return err ? d.reject(err) : d.resolve(data);
  });

  return d.promise;
}

let i = 0;

function getGlobalComment(ast) {
  if (ast.nodes.length < 2) {
    return {};
  }

  if (
    ast.nodes[0].type === 'comment' &&
    (ast.nodes[1].raws.before.split('\n').length >= 3 ||
      ast.nodes[1].type === 'comment')
  ) {
    return applyMarkdownToDocs(
      doctrine.parse(`${ast.nodes[0].text}`, { unwrap: true })
    );
  }

  return {};
}

const allowedTypes = ['comment', 'decl'];
function validate(ast, file) {
  ast.nodes.forEach((node) => {
    if (allowedTypes.indexOf(node.type) === -1) {
      throw new Error(
        `Unexpected ${node.type} in ./${path.relative(process.cwd(), file)}:${
          node.source.start.line
        }:${node.source.start.column}`
      );
    }
  });
}

function getRenderFromTags(tags) {
  return tags.render && tags.render.length && tags.render[0].description;
}

function getRestTags(tags) {
  const rest = { ...tags };
  delete rest.render;

  return rest;
}

function getDecoratedDeclarations(ast, globalComment) {
  const defaultRenderer =
    getRenderFromTags(globalComment.tags || {}) || 'default';

  // console.log(defaultRenderer);
  return ast.nodes.reduce((memo, node, i) => {
    if (node.type !== 'decl') {
      return memo;
    }

    const nodeData = {
      name: node.prop,
      value: node.value,
      render: defaultRenderer,
      tags: {},
      description: '',
    };

    if (
      ast.nodes[i - 1] &&
      ast.nodes[i - 1].type === 'comment' &&
      node.raws.before.split('\n').length === 2
    ) {
      const docs = applyMarkdownToDocs(
        doctrine.parse(`${ast.nodes[i - 1].text}`, { unwrap: true })
      );

      memo.push({
        ...nodeData,
        render: getRenderFromTags(docs.tags || {}) || nodeData.render,
        tags: getRestTags(docs.tags),
        description: docs.description,
      });
    } else {
      memo.push(nodeData);
    }

    return memo;
  }, []);
}

function getVariableInfo(file) {
  return readFile(file).then((content) => {
    const ast = postcss.parse(content, { syntax });
    validate(ast, file);

    const globalComment = getGlobalComment(ast);

    // console.log(getRestTags(globalComment.tags));

    return {
      description: globalComment.description || '',
      tags: getRestTags(globalComment.tags),
      declarations: getDecoratedDeclarations(ast, globalComment),
    };
  });
}

export default function buildProxyVariables(variables, tmpDir) {
  const d = new Deferred();

  variables
    .on('update', ({ relPath, name, file }) => {
      const proxyPath = path.join(tmpDir, `${name}.vars.js`);

      Promise.all([getVariableInfo(file), proxyTemplatePromise])
        .then(([varInfo, template]) => {
          const content = template({
            rendererPath: require.resolve(
              path.join(options.renderer, 'variables.vue')
            ),
            variables: JSON.stringify(varInfo),
            buildId: i++,
            name,
            relPath,
          });

          return new Promise((resolve, reject) => {
            fs.writeFile(proxyPath, content, (err) => {
              return err ? reject(err) : resolve();
            });
          });
        })
        .catch((e) => {
          process.stderr.write(e.stack);
        });
    })
    .on('unlink', ({ name }) => {
      // fs.unlinkSync(path.join(tmpDir, `${name}.js`));
    })
    .on('ready', () => {
      d.resolve();
    });

  return d.promise;
}
