import * as fs from 'fs';
import * as path from 'path';
import osTmpdir from 'os-tmpdir';

// const tmpDir = osTmpdir();
const tmpDir = path.resolve(__dirname, '..', '.tmp');

export default function buildProxyComponents(options, components) {
  return Promise.all(
    Object.keys(components).map((name) => {
      const filePath = path.join(tmpDir, `${name}.js`);

      return new Promise((resolve, reject) => {
        fs.writeFile(
          filePath,
          `
          import Vue from 'vue';
          import Comp from '${components[name]}';
          import Renderer from '${require.resolve(
            path.join(options.renderer, 'component.vue')
          )}';

          const styleguide = Comp.__styleguide || {};

          export default Vue.component('nuxt-styleguide-${name}', {
            render: function(createElement) {
              return createElement(Renderer, { props: {
                Comp,
                name: '${name}',
                importPath: '${components[name]}',
                states: styleguide.states || [],
                docs: styleguide.docs,
              } });
            },
          });
          `,
          (err) => {
            return err ? reject(err) : resolve();
          }
        );
      }).then(() => {
        return {
          name,
          filePath,
        };
      });
    })
  );
}
