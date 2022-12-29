<script setup>
const showClass = false

const parsedMarkdownText = `
  <div style="display: flex; flex-direction: column">
    <a href="/goo">relative</a>
    <a target="_blank" href="/goo">relative with blank</a>
    <a href="https://goo.go">out without target</a>
    <a target="_blank" href="https://goo.go">out without target</a>
  </div>
`

</script>

<template>
  <div
    v-interpolation
    :style="showClass && 'border: 2px solid red'"
    @click="showClass = !showClass"
    v-html="parsedMarkdownText"
  />
</template>
