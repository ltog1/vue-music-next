import { onUpdated, ref, computed } from 'vue'

const fixedHeight = 30

export function useFixed(props) {
  const groupRef = ref(null)
  const fixedShow = ref(false)
  const currentIndex = ref(0)
  const diffY = ref(0)
  const listHeight = [] // 存放每个歌手对应的列表高度

  const fixedStyle = computed(() => {
    const diffValue = diffY.value += 10
    const move = (diffValue > 0 && diffValue <= fixedHeight) ? diffValue - fixedHeight : 0
    return {
      transform: `translate3d(0,${move}px,0)`
    }
  })

  const fixedTitle = computed(() => {
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  onUpdated(() => {
    calculateHeight()
  })

  function calculateHeight() {
    let height = 0
    listHeight[0] = height
    const children = groupRef.value.children
    for (let i = 0; i < children.length; i++) {
      const item = children[i]
      height += item.clientHeight
      listHeight.push(height)
    }
  }

  function listviewScroll(pos) {
    let y = pos.y
    if (y > 0) {
      fixedShow.value = false
      return
    }

    fixedShow.value = true

    y = Math.floor(Math.abs(y - 10))
    // 在中间滚动
    for (let i = 0, length = listHeight.length; i < length; i++) {
      const heightTop = listHeight[i]
      const heightBottom = listHeight[i + 1]
      if (y >= heightTop && y < heightBottom) {
        diffY.value = heightBottom - y
        currentIndex.value = i
        return
      }
    }
  }

  return {
    groupRef,
    currentIndex,
    fixedShow,
    fixedStyle,
    fixedTitle,
    listviewScroll
  }
}
