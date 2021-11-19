import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

function useCd() {
  const cdImageRef = ref(null)
  const cdRef = ref(null)
  const store = useStore()
  const playing = computed(() => store.state.playing)

  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })

  watch(playing, value => {
    // 计算内层Image的transform旋转, 并同步到外层容器
    if (!value) {
      const wrapperTransform = getComputedStyle(cdRef.value, null).transform
      const innerTransform = getComputedStyle(cdImageRef.value, null).transform
      const newTransform = wrapperTransform === 'none' ? innerTransform : wrapperTransform.concat(' ', innerTransform)
      cdRef.value.style.transform = newTransform
    }
  })

  return {
    cdRef,
    cdImageRef,
    cdCls
  }
}

export default useCd
