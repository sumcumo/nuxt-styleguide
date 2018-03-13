import * as fs from 'fs';
import * as path from 'path';
import _template from 'lodash.template';
import options from '@sum.cumo/nuxt-styleguide-config';
import getComponentInfo from './getComponentInfo';
import Deferred from './Deferred';

const styleguideSrcDir = path.resolve(__dirname, '..', 'src');

const proxyTemplatePromise = new Promise((resolve, reject) => {
  fs.readFile(
    path.resolve(styleguideSrcDir, 'proxyComponent', 'proxyComponent.tjs'),
    (err, content) => {
      return err ? reject(err) : resolve(_template(content.toString()));
    }
  );
});

let i = 0;

export default function buildProxyComponents(components, tmpDir) {
  const d = new Deferred();

  components
    .on('update', (component) => {
      proxyTemplatePromise.then((template) => {
        const { relPath, name, file } = component;
        const proxyPath = path.join(tmpDir, `${name}.js`);

        return new Promise((resolve, reject) => {
          const componentInfo = getComponentInfo(file, relPath, options.dev);

          const content = template({
            rendererPath: require.resolve(
              path.join(options.renderer, 'component.vue')
            ),
            normalizeStatesPath: path.resolve(
              styleguideSrcDir,
              'proxyComponent',
              'normalizeStates.js'
            ),
            componentInfo: JSON.stringify(componentInfo),
            buildId: i++,
            name,
            relPath,
          });

          fs.writeFile(proxyPath, content, (err) => {
            return err ? reject(err) : resolve();
          });
        }).catch((e) => {
          process.stderr.write(e.stack);
        });
      });
    })
    .on('unlink', ({ name }) => {
      fs.unlinkSync(path.join(tmpDir, `${name}.js`));
    })
    .on('ready', () => {
      d.resolve();
    });

  return d.promise;
}
