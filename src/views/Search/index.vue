<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query" />
    </div>
    <scroll
      ref="scrollRef"
      class="search-content"
      v-show="!query"
    >
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for="item in hotKeys"
              :key="item.id"
              @click="addQuery(item.key)"
            >
              {{ item.key }}
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <div class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </div>
          <search-list
            :list="searchHistory"
            @deleteSearch="deleteSearch"
            @selectSearch="addQuery"
          />
        </div>
      </div>
    </scroll>
    <div class="search-result" v-show="query">
      <suggest
        :query="query"
        :showSinger="true"
        @selectSong="selectSong"
        @selectSinger="selectSinger"
      />
    </div>
    <Confirm
      ref="confirmRef"
      @confirm="clearSearch"
      message="是否清空所有搜索历史"
    />
    <router-view v-slot="{ Component }">
      <transition name="g-slide" appear>
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
  import SearchInput from 'components/base/search-input'
  import Suggest from 'components/suggest'
  import SearchList from 'components/base/search-list'
  import Scroll from 'components/wrap-scroll'
  import Confirm from 'components/base/confirm'
  import { getHotKeys } from '@/service/search'
  import { SINGER_KEY } from 'common/js/constant'
  import { ref, onMounted, computed, watch, nextTick } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import useSearchHistory from './use-search-history'
  export default {
    name: 'index',
    components: {
      SearchInput,
      Suggest,
      SearchList,
      Scroll,
      Confirm
    },
    setup() {
      // data
      const query = ref('')
      const hotKeys = ref([])
      const selectedSinger = ref(null)
      const confirmRef = ref(null)
      const scrollRef = ref(null)
      const store = useStore()
      const router = useRouter()

      // computed
      const searchHistory = computed(() => store.state.searchHistory)

      // hooks
      const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

      // watch
      watch(query, async newVal => {
        if (!newVal) {
          await nextTick()
          scrollRef.value.scroll.refresh()
        }
      })

      onMounted(() => {
        getHotKey()
      })

      async function getHotKey() {
        const data = await getHotKeys()
        hotKeys.value = data.hotKeys
      }
      function addQuery(key) {
        query.value = key
      }
      function selectSong(song) {
        saveSearch(song.name)
        store.dispatch('insertSong', song)
      }
      function selectSinger(singer) {
        selectedSinger.value = singer
        saveSearch(singer.name)
        window.sessionStorage.setItem(SINGER_KEY, JSON.stringify(singer))
        router.push({
          path: `/search/${singer.mid}`
        })
      }
      function showConfirm() {
        confirmRef.value.show()
      }

      return {
        // data
        query,
        hotKeys,
        selectedSinger,
        confirmRef,
        scrollRef,
        // computed
        searchHistory,
        // methods
        addQuery,
        selectSong,
        selectSinger,
        showConfirm,
        deleteSearch,
        clearSearch
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
