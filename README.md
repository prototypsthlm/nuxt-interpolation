# Nuxt 3 Interpolation Module

Port to nuxt 3/vue 3 of [nuxt-interpolation](https://github.com/daliborgogic/nuxt-interpolation) module.

Which is a:

[Nuxt](https://github.com/nuxt/nuxt.js/) module as directive for binding every link to catch the click event, and if
it's a relative link router will push. For improved security `rel="noopener"` will be added automatically if target
is `_blank`.

## Setup

- Add `@prototyp-stockholm/nuxt-interpolation` as dependency
- Add `@prototyp-stockholm/nuxt-interpolation` to modules section of `nuxt.config.js`

```js
{
  modules: [
    ['@prototyp-stockholm/nuxt-interpolation']
  ]
}
```

## Usage

```html
<div v-interpolation v-html="content"></div>
```

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

.
