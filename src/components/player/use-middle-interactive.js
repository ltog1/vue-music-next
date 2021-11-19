import { ref } from 'vue'

function useMiddleInteractive() {
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)
  const currentShow = ref('cd') // 大播放cd和歌词列表的切换显示
  const currentView = ref('cd')
  const touch = {
    startX: 0,
    startY: 0
  }

  function onMiddleTouchStart(e) {
    touch.startX = e.touches[0].clientX
    touch.startY = e.touches[0].clientY
    touch.clientWidth = window.innerWidth || document.body.offsetWidth
    touch.directionLock = ''
  }
  function onMiddleTouchMove(e) {
    const diffX = Math.floor(e.touches[0].clientX - touch.startX)
    const diffY = Math.floor(e.touches[0].clientY - touch.startY)
    // 方向锁
    if (!touch.directionLock) {
      touch.directionLock = Math.abs(diffY) > Math.abs(diffX) ? 'V' : 'H'
    }

    if (touch.directionLock === 'V') {
      return
    }

    const left = currentView.value === 'cd' ? 0 : -touch.clientWidth
    const offsetWidth = Math.min(Math.max(-touch.clientWidth, diffX + left), 0)
    touch.percent = Math.abs(offsetWidth / touch.clientWidth)

    if (currentView.value === 'cd') {
      if (touch.percent >= 0.2) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    } else {
      if (1 - touch.percent >= 0.2) {
        currentShow.value = 'cd'
      } else {
        currentShow.value = 'lyric'
      }
    }

    middleLStyle.value = {
      opacity: 1 - touch.percent
    }
    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`
    }
  }
  function onMiddleTouchEnd() {
    let offsetWidth
    let opacity
    if (currentShow.value === 'cd') {
      currentView.value = 'cd'
      opacity = 1
      offsetWidth = 0
    } else {
      currentView.value = 'lyric'
      opacity = 0
      offsetWidth = -touch.clientWidth
    }

    middleLStyle.value = {
      opacity,
      transitionDuration: '300ms'
    }
    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: '300ms'
    }
  }

  return {
    middleLStyle,
    middleRStyle,
    currentShow,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd
  }
}

export default useMiddleInteractive
