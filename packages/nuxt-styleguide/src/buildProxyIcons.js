import * as fs from 'fs'
import * as path from 'path'
import _template from 'lodash.template'
import options from '@sum.cumo/nuxt-styleguide-config'
import Deferred from './Deferred'

const styleguideSrcDir = path.resolve(__dirname, '..', 'src')

const proxyTemplatePromise = new Promise((resolve, reject) => {
  fs.readFile(
    path.resolve(styleguideSrcDir, 'proxyComponent', 'proxyIcon.tjs'),
    (err, content) =>
      err ? reject(err) : resolve(_template(content.toString()))
  )
})

let i = 0

export default function buildProxyIcons(icons, tmpDir) {
  const d = new Deferred()

  icons
    .on('update', (icon) => {
      proxyTemplatePromise.then((template) => {
        const { relPath, name, file } = icon
        const proxyPath = path.join(tmpDir, `${name}.icon.js`)
        const importPath =
          options.importFrom === 'local'
            ? relPath
            : relPath.replace(/^~/, options.name)

        return new Promise((resolve, reject) => {
          const content = template({
            rendererPath: require.resolve(
              path.join(options.renderer, 'Icon.vue')
            ),
            buildId: i,
            file,
            name,
            relPath,
            importPath,
          })

          i += 1

          fs.writeFile(
            proxyPath,
            content,
            (err) => (err ? reject(err) : resolve())
          )
        }).catch((e) => {
          process.stderr.write(e.stack)
        })
      })
    })
    .on('unlink', ({ name }) => {
      fs.unlinkSync(path.join(tmpDir, `${name}.icon.js`))
    })
    .on('ready', () => {
      d.resolve()
    })

  return d.promise
}
