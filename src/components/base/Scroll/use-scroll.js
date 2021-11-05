import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(ObserveDOM)

export function useScroll (options, emit) {
  const rootRef = ref(null)
  const scroll = ref(null)

  onMounted(() => {
    scroll.value = new BScroll(rootRef.value, {
      observeDOM: true, // 开启 observe-dom 插件
      ...options
    })

    // 派发滚动事件
    if (options.probeType > 0) {
      scroll.value.on('scroll', pos => {
        emit('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  return {
    rootRef,
    scroll
  }
}
