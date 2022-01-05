import { save } from 'common/js/store'
import { PLAY_KEY, PLAY_MAX_KEY } from 'common/js/constant'
import { useStore } from 'vuex'

function usePlayHistory() {
  const store = useStore()

  function savePlay(song) {
    const playList = save(PLAY_KEY, song, compare, PLAY_MAX_KEY)
    store.commit('setPlayHistory', playList)

    function compare(item) {
      return item.id === song.id
    }
  }

  return {
    savePlay
  }
}

export default usePlayHistory
