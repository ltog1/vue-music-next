import { ref } from 'vue'

function useAnimation() {
  const cdWrapperRef = ref(null)
  const miniPlayerRef = ref(null)

  function enter() {
    const { moveX, moveY, scale } = getPosAndScale()
    cdWrapperRef.value.animate([
      {
        transform: `translate3d(${moveX}px, ${moveY}px, 0) scale(${scale})`
      },
      {
        transform: 'translate3d(0, 0, 0) scale(1)'
      }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
    })
  }
  function afterEnter() {
    console.log('afterEnter')
  }
  function leave() {
    const { moveX, moveY, scale } = getPosAndScale()
    cdWrapperRef.value.animate([
      {
        transform: 'translate3d(0, 0, 0) scale(1)'
      },
      {
        transform: `translate3d(${moveX}px, ${moveY}px, 0) scale(${scale})`
      }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
    })
  }
  function afterLeave() {
    console.log('afterLeave')
  }
  function getPosAndScale() {
    const miniPaddingLeft = 40
    const miniPaddingBottom = 30
    const miniCdImage = miniPlayerRef.value.cdImageRef
    const cdWrapperRect = cdWrapperRef.value.getBoundingClientRect()
    const moveX = -(window.innerWidth / 2 - miniPaddingLeft)
    const moveY = window.innerHeight - cdWrapperRect.top - cdWrapperRect.height / 2 - miniPaddingBottom
    const scale = (miniCdImage.clientWidth / cdWrapperRect.width) || 1

    return { moveX, moveY, scale }
  }

  return {
    cdWrapperRef,
    miniPlayerRef,
    enter,
    afterEnter,
    leave,
    afterLeave
  }
}

export default useAnimation
