<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
  import { useScroll } from './use-scroll'
  import { ref } from 'vue'
  export default {
    name: 'index',
    setup() {
      const rootRef = ref(null)
      useScroll(rootRef)
      return {
        rootRef
      }
    }
  }
</script>

<style scoped>

</style>
