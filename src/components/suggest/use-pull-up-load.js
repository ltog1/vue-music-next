import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Pullup)
BScroll.use(ObserveDOM)

function usePullUpLoad(pullingUpHandler, preventPullUpLoad) {
  const scroll = ref(null)
  const rootRef = ref(null)
  const isPullUpLoad = ref(false)

  onMounted(() => {
    scroll.value = new BScroll(rootRef.value, {
      observeDOM: true,
      click: true,
      pullUpLoad: true
    })

    scroll.value.on('pullingUp', async () => {
      if (preventPullUpLoad.value) {
        scroll.value.finishPullUp()
        scroll.value.refresh()
        return
      }

      isPullUpLoad.value = true
      await pullingUpHandler()
      scroll.value.finishPullUp()
      scroll.value.refresh()
      isPullUpLoad.value = false
    })
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  return {
    rootRef,
    scroll,
    isPullUpLoad
  }
}

export default usePullUpLoad
