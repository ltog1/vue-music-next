<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query" />
    </div>
    <scroll ref="scrollRef" class="search-content" v-show="!query">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for="item in hotKeys"
              :key="item.id"
              @click="selectHotKey(item.key)"
            >
              {{ item.key }}
            </li>
          </ul>
        </div>
        <div class="search-history">
          <div class="title">
            <span class="text">搜索历史</span>
            <span class="clear"><i class="icon-clear"></i></span>
          </div>
          <search-list :list="historyList" @deleteHistory="deleteHistory" />
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
  import { getHotKeys } from '@/service/search'
  import { SINGER_KEY } from 'common/js/constant'
  import { ref, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import useSearchHistory from './use-search-history'
  export default {
    name: 'index',
    components: {
      SearchInput,
      Suggest,
      SearchList,
      Scroll
    },
    setup() {
      // data
      const query = ref('')
      const hotKeys = ref([])
      const selectedSinger = ref(null)
      const scrollRef = ref(null)
      const store = useStore()
      const router = useRouter()

      // hooks
      const { historyList, saveHistory } = useSearchHistory(query)

      onMounted(() => {
        getHotKey()
      })

      async function getHotKey() {
        const data = await getHotKeys()
        hotKeys.value = data.hotKeys
      }
      function selectHotKey(key) {
        query.value = key
      }
      function selectSong(song) {
        store.dispatch('insertSong', song)
        saveHistory(song.name)
      }
      function selectSinger(singer) {
        selectedSinger.value = singer
        window.sessionStorage.setItem(SINGER_KEY, JSON.stringify(singer))
        router.push({
          path: `/search/${singer.mid}`
        })
      }
      function deleteHistory(item) {
        console.log(item)
      }

      return {
        // data
        query,
        hotKeys,
        scrollRef,
        historyList,
        selectedSinger,
        // methods
        selectHotKey,
        selectSong,
        selectSinger,
        deleteHistory
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
