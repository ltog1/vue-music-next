import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

function useCd() {
  const cdImageRef = ref(null)
  const cdRef = ref(null)

  const store = useStore()
  const playing = computed(() => store.state.playing)

  watch(playing, () => {
    const wrapperTransform = getComputedStyle(cdRef.value, null).transform
    const innerTransform = getComputedStyle(cdImageRef.value, null).transform
    const newTransform = wrapperTransform === 'none' ? innerTransform : wrapperTransform.concat(' ', innerTransform)
    cdRef.value.style.transform = newTransform
  })

  return {
    cdRef,
    cdImageRef
  }
}

export default useCd
