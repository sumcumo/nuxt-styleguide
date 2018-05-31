import NuxtMarkdownComponentLoader from './nuxtMarkdownComponentLoader'

describe('nuxtMarkdownComponentLoader', () => {
  it('adds a new loader rule to nuxt module config', () => {
    const config = {
      module: {
        rules: [],
      },
    }
    const context = {
      extendBuild(cb) {
        cb(config)
      },
      options: {},
    }

    NuxtMarkdownComponentLoader.call(context, {
      components: { foo: 'bar.js' },
    })

    expect(config.module.rules.length).toBe(1)
    expect(config.module.rules[0]).toEqual({
      loader: '@sum.cumo/vue-markdown-component-loader',
      options: {
        components: {
          foo: 'bar.js',
        },
      },
      test: /\.md?$/,
    })
  })

  it('falls back to global configured components', () => {
    const config = {
      module: {
        rules: [],
      },
    }
    const context = {
      extendBuild(cb) {
        cb(config)
      },
      options: {
        markdownComponents: { foo: 'bar.js' },
      },
    }

    NuxtMarkdownComponentLoader.call(context, {})

    expect(config.module.rules.length).toBe(1)
    expect(config.module.rules[0]).toEqual({
      loader: '@sum.cumo/vue-markdown-component-loader',
      options: {
        components: {
          foo: 'bar.js',
        },
      },
      test: /\.md?$/,
    })
  })

  it('extends loader', () => {
    const config = {
      module: {
        rules: [],
      },
    }
    const context = {
      extendBuild(cb) {
        cb(config)
      },
      options: {},
    }

    NuxtMarkdownComponentLoader.call(context, { loader: { exclude: 'foo.js' } })

    expect(config.module.rules.length).toBe(1)
    expect(config.module.rules[0]).toEqual({
      loader: '@sum.cumo/vue-markdown-component-loader',
      options: {
        components: undefined,
      },
      exclude: 'foo.js',
      test: /\.md?$/,
    })
  })
})
