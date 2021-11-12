import { PLAY_MODE } from 'common/js/constant'
import { useStore } from 'vuex'
import { computed } from 'vue'

function useMode() {
  const store = useStore()
  const playMode = computed(() => store.state.playMode)

  const modeIcon = computed(() => {
    const icon =
      playMode.value === PLAY_MODE.sequence
        ? 'icon-sequence'
        : playMode.value === PLAY_MODE.loop
        ? 'icon-loop'
        : 'icon-random'
    return icon
  })

  function changeMode() {
    const mode = (playMode.value + 1) % 3
    store.dispatch('changeMode', mode)
  }

  return {
    modeIcon,
    changeMode
  }
}

export default useMode
