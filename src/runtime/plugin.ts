import { defineNuxtPlugin, useRouter } from '#app'

const navigate = (event: Event) => {
  if (!(event instanceof MouseEvent)) return

  const router = useRouter()

  const href = (event.currentTarget as HTMLAnchorElement).getAttribute('href') ?? null
  if (href && href[0] === '/') {
    event.preventDefault()
    event.metaKey
      ? window.open(href, '_blank', 'noopener')
      : router.push(href)
  }
  console.log('navigate', { event })
}

const addListeners = (links: HTMLCollectionOf<HTMLAnchorElement>) => {
  for (let i = 0; i < links.length; i++) {
    const target = links[i].getAttribute('target')
    console.log('addListeners1', { target })

    // For improved security `rel="noopener"` will be added automatically if target is `_blank`
    // https://github.com/mathiasbynens/rel-noopener/
    if (target && target === '_blank') {
      const rel = links[i].getAttribute('rel')
      console.log('addListeners2', { rel })
      if (!rel?.includes('noopener')) {
        const attributes = rel ? `${rel} noopener` : 'noopener'
        console.log('addListeners3', { attributes })
        links[i].setAttribute('rel', attributes)
      }
    }
    links[i].addEventListener('click', navigate, false)
  }
  console.log('addListeners4', { links })
}

const removeListeners = (links: HTMLCollectionOf<HTMLAnchorElement>) => {
  for (let i = 0; i < links.length; i++) {
    links[i].removeEventListener('click', navigate, false)
  }
  console.log('removeListeners', { links })
}

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('interpolation', {
    beforeMount: (element) => {
      const links = element.getElementsByTagName('a')
      console.log('beforeMount1', { links })
      addListeners(links)
      console.log('beforeMount2', { links })
    },
    beforeUpdate: (element) => {
      const links = element.getElementsByTagName('a')
      console.log('beforeUpdate1', { links })
      removeListeners(links)
      console.log('beforeUpdate2', { links })
    },
    updated: (element) => {
      const links = element.getElementsByTagName('a')
      console.log('updated1', { links })
      addListeners(links)
      console.log('updated2', { links })
    },
    unmounted: (element) => {
      const links = element.getElementsByTagName('a')
      console.log('unmounted2', { links })
      removeListeners(links)
      console.log('unmounted2', { links })
    },
  })
})
