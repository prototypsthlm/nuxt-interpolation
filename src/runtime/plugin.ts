import { defineNuxtPlugin, useRouter } from '#app'

const navigate = (event: Event) => {
  if (!(event instanceof MouseEvent) || !(event.currentTarget instanceof HTMLAnchorElement)) {
    return
  }

  const href = event.currentTarget.getAttribute('href')

  if (href?.startsWith('/')) {
    event.preventDefault()

    if (event.metaKey) {
      window.open(href, '_blank', 'noopener')
    } else {
      useRouter().push(href)
    }
  }
}

const addListeners = (links: HTMLCollectionOf<HTMLAnchorElement>) => {
  for (let i = 0; i < links.length; i++) {
    const target = links[i].getAttribute('target')

    // For improved security `rel="noopener"` will be added automatically if target is `_blank`
    // https://github.com/mathiasbynens/rel-noopener/
    if (target && target === '_blank') {
      const rel = links[i].getAttribute('rel')
      if (!rel?.includes('noopener')) {
        const attributes = rel ? `${rel} noopener` : 'noopener'
        links[i].setAttribute('rel', attributes)
      }
    }
    links[i].addEventListener('click', navigate, false)
  }
}

const removeListeners = (links: HTMLCollectionOf<HTMLAnchorElement>) => {
  for (let i = 0; i < links.length; i++) {
    links[i].removeEventListener('click', navigate, false)
  }
}

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('interpolation', {
    beforeMount: (element) => {
      const links = element.getElementsByTagName('a')
      addListeners(links)
    },
    beforeUpdate: (element) => {
      const links = element.getElementsByTagName('a')
      removeListeners(links)
    },
    updated: (element) => {
      const links = element.getElementsByTagName('a')
      addListeners(links)
    },
    unmounted: (element) => {
      const links = element.getElementsByTagName('a')
      removeListeners(links)
    },
  })
})
