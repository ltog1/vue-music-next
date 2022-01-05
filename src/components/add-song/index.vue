<template>
  <teleport to="body">
    <transition name="g-slide" appear>
      <div class="add-song" v-show="visible">
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <div class="close" @click="hide"><i class="icon-close"></i></div>
        </div>
        <div class="search-input-wrapper">
          <search-input v-model="query" />
        </div>
        <div v-show="!query">
          <switches :list="switches" v-model="currentIndex" />
          <div class="list-wrapper">
            <scroll
              ref="scrollRef"
              class="list-scroll"
              v-if="currentIndex === 0"
            >
              <div class="list-inner">
                <song-list
                  :songs="playHistory"
                  @selectSong="selectSongBySongList"
                />
              </div>
            </scroll>
            <scroll
              ref="scrollRef"
              class="list-scroll"
              v-if="currentIndex === 1"
            >
              <div class="list-inner">
                <search-list
                  :list="searchHistory"
                  :showDelete="false"
                  @selectSearch="addQuery"
                />
              </div>
            </scroll>
          </div>
        </div>
        <div class="search-result" v-show="query">
          <suggest
            :query="query"
            :showSinger="false"
            @selectSong="selectSongBySuggest"
          />
        </div>
        <message ref="messageRef">
          <div class="message-title">
            <i class="icon-ok"></i>
            <span class="text">1首歌曲已经添加到播放列表</span>
          </div>
        </message>
      </div>
    </transition>
  </teleport>
</template>

<script>
  import SearchInput from 'components/base/search-input'
  import Switches from 'components/base/switches'
  import Scroll from 'components/wrap-scroll'
  import SongList from 'components/base/song-list'
  import SearchList from 'components/base/search-list'
  import Message from 'components/base/Message'
  import Suggest from 'components/suggest'
  import useSearchHistory from '@/views/Search/use-search-history'
  import { ref, computed, nextTick, watch } from 'vue'
  import { useStore } from 'vuex'
  export default {
    name: 'index',
    components: {
      SearchInput,
      Switches,
      Scroll,
      SongList,
      SearchList,
      Message,
      Suggest
    },
    setup() {
      // data
      const scrollRef = ref(null)
      const messageRef = ref(null)
      const visible = ref(false)
      const query = ref('')
      const switches = ref(['最近播放', '搜索历史'])
      const currentIndex = ref(0)
      const store = useStore()

      // hooks
      const { saveSearch } = useSearchHistory()

      // computed
      const searchHistory = computed(() => store.state.searchHistory)
      const playHistory = computed(() => store.state.playHistory)

      watch(query, async newVal => {
        if (!newVal) {
          await nextTick()
          scrollRef.value.scroll.refresh()
        }
      })

      async function show() {
        visible.value = true
        await nextTick()
        scrollRef.value.scroll.refresh()
      }
      function hide() {
        visible.value = false
      }
      function addQuery(key) {
        query.value = key
      }
      function selectSongBySongList(song, index) {
        if (index === 0) {
          return
        }

        messageRef.value.show()
        store.dispatch('insertSong', song)
      }
      function selectSongBySuggest(song) {
        messageRef.value.show()
        saveSearch(song.name)
        store.dispatch('insertSong', song)
      }

      return {
        // data
        scrollRef,
        messageRef,
        visible,
        query,
        switches,
        currentIndex,
        // computed
        searchHistory,
        playHistory,
        // methods
        show,
        hide,
        addQuery,
        selectSongBySongList,
        selectSongBySuggest
      }
    }
  }
</script>

<style scoped lang="scss">
  .add-song {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 300;
    background: $color-background;
    .header {
      position: relative;
      height: 44px;
      text-align: center;
      .title {
        line-height: 44px;
        font-size: $font-size-large;
        color: $color-text;
      }
      .close {
        position: absolute;
        top: 0;
        right: 8px;
        .icon-close {
          display: block;
          padding: 12px;
          font-size: 20px;
          color: $color-theme;
        }
      }
    }
    .search-input-wrapper {
      margin: 20px
    }
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;
      .list-scroll {
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 20px 30px;
        }
      }
    }
    .search-result {
      position: fixed;
      top: 124px;
      bottom: 0;
      width: 100%;
    }
  }

  .message-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }
    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
</style>
