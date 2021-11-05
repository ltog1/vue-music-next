<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
  import { useScroll } from './use-scroll'
  export default {
    name: 'index',
    props: {
      // 为1时,滚动的时候派发scroll事件(屏幕滑动超过一定时间后),会截流
      // 为2时,滚动的时候派发scroll事件(实时),不会截流
      // 为3时,除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
      probeType: {
        type: Number,
        default: 0
      },
      // 点击列表是否派发click事件
      click: {
        type: Boolean,
        default: true
      }
    },
    emits: ['scroll'],
    setup(props, { emit }) {
      const { rootRef, scroll } = useScroll(props, emit)

      return {
        rootRef,
        scroll
      }
    }
  }
</script>

<style scoped>

</style>
