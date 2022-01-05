import { save, clear, remove } from 'common/js/store'
import { SEARCH_KEY, SEARCH_MAX_LENGTH } from 'common/js/constant'
import { useStore } from 'vuex'

function useSearchHistory() {
  const store = useStore()

  function saveSearch(key) {
    const searchList = save(SEARCH_KEY, key, compare, SEARCH_MAX_LENGTH)
    store.commit('setSearchHistory', searchList)

    function compare(item) {
      return item === key
    }
  }

  function deleteSearch(key) {
    const searchList = remove(SEARCH_KEY, compare)
    store.commit('setSearchHistory', searchList)

    function compare(item) {
      return item === key
    }
  }

  function clearSearch() {
    clear(SEARCH_KEY)
    store.commit('setSearchHistory', [])
  }

  return {
    saveSearch,
    deleteSearch,
    clearSearch
  }
}

export default useSearchHistory
