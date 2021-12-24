import { save, load } from 'common/js/store'
import { SEARCH_KEY, SEARCH_MAX_LENGTH } from 'common/js/constant'
import { ref, onMounted, watch } from 'vue'

function useSearchHistory(queryRef) {
  const historyList = ref([])

  watch(queryRef, val => {
    if (!val) getHistory()
  })

  onMounted(() => {
    getHistory()
  })

  function saveHistory(key) {
    save(SEARCH_KEY, key, compare, SEARCH_MAX_LENGTH)

    function compare(item) {
      return item === key
    }
  }
  function getHistory() {
    historyList.value = load(SEARCH_KEY)
  }

  return {
    historyList,
    saveHistory,
    getHistory
  }
}

export default useSearchHistory
