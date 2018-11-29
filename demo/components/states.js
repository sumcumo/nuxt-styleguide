export const A = [
  {
    data: {
      props: {
        href: '#',
      },
      on: {
        click(event) {
          event.preventDefault()
          // eslint-disable-next-line no-alert
          alert('yeah 🎉')
        },
      },
    },
    content: 'Click me!',
    wrapperStyle: {
      border: '2px solid green',
      display: 'inline',
    },
    wrapper: {
      render(createElement) {
        return createElement(
          'span',
          { style: { border: '2px solid fuchsia', padding: '5px' } },
          this.$slots.default
        )
      },
    },
  },
]

export const Headline = [
  {
    title: 'Default',
    content: 'Hello World!',
  },
  {
    title: 'With anchor',
    content: 'Hello See!',
    props: {
      anchor: 'hello-see',
    },
  },
]
