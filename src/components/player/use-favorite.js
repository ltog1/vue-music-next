import { useStore } from 'vuex'
import { computed } from 'vue'
import { findIndex } from 'common/js/util'
import { FAVORITE_KEY, FAVORITE_MAX_LENGTH } from 'common/js/constant'
import { save, remove } from 'common/js/store'

function useFavorite() {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList)

  function getFavoriteIcon(song) {
    const index = findIndex(favoriteList.value, song)
    const icon = index > -1 ? 'icon-favorite' : 'icon-not-favorite'
    return icon
  }

  function toggleFavorite(song) {
    let list
    const index = findIndex(favoriteList.value, song)
    if (index > -1) { // 取消收藏
      list = remove(FAVORITE_KEY, compare)
    } else { // 收藏
      list = save(FAVORITE_KEY, song, compare, FAVORITE_MAX_LENGTH)
    }
    store.commit('setFavoriteList', list)

    function compare(item) {
      return item.id === song.id
    }
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}

export default useFavorite
