import { ref, watch, nextTick } from 'vue'

const itemHeight = 18

export function useShortcut(props, groupRef) {
  const shortcutList = ref(null)
  const scrollRef = ref(null)
  const touch = {
    startY: 0,
    dataLength: 0
  }

  watch(() => props.data, async val => {
    await nextTick()
    touch.dataLength = val.length
  })

  function alphabetTouchStart(e) {
    touch.startY = shortcutList.value.getBoundingClientRect().y
    const anchorIndex = +e.target.dataset.index
    scrollTo(anchorIndex)
  }

  function alphabetTouchMove(e) {
    const clientY = e.touches[0].clientY
    const anchorIndex = Math.min(
      Math.max(
        0,
        Math.floor((clientY - touch.startY) / itemHeight)
      ),
      touch.dataLength - 1
    )
    scrollTo(anchorIndex)
  }

  function scrollTo(index) {
    const $scroll = scrollRef.value.scroll // scroll组件实例
    const targetElm = groupRef.value.children[index]
    $scroll.scrollToElement(targetElm, 10)
  }

  return {
    shortcutList,
    scrollRef,
    alphabetTouchStart,
    alphabetTouchMove
  }
}
