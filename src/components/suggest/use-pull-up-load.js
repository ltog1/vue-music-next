import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Pullup)
BScroll.use(ObserveDOM)

function usePullUpLoad(pullingUpHandler) {
  const pullup = ref(null)
  const rootRef = ref(null)

  onMounted(() => {
    pullup.value = new BScroll(rootRef.value, {
      observeDOM: true,
      click: true,
      pullUpLoad: true
    })

    pullup.value.on('pullingUp', () => {
      pullingUpHandler()
    })
  })

  onUnmounted(() => {
    pullup.value.destroy()
  })

  return {
    rootRef,
    pullup
  }
}

export default usePullUpLoad
