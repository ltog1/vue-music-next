<template>
  <div
    class="user-center"
    v-no-result:[noResultText]="!currentList.length"
    >
    <div class="back" @click="back"><i class="icon-back"></i></div>
    <div class="switches-wrapper">
      <switches :list="switches" v-model="currentIndex" />
    </div>
    <div
      class="play-btn"
      @click="randomPlay"
      v-if="currentList.length"
    >
      <i class="icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrapper">
      <scroll class="list-scroll" v-if="currentIndex === 0">
        <div class="list-inner">
          <song-list
            :songs="favoriteList"
            @selectSong="selectSong"
          />
        </div>
      </scroll>
      <scroll class="list-scroll" v-if="currentIndex === 1">
        <div class="list-inner">
          <song-list
            :songs="playHistory"
            @selectSong="selectSong"
          />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import Switches from 'components/base/switches'
  import Scroll from 'components/wrap-scroll'
  import SongList from 'components/base/song-list'
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  export default {
    name: 'index',
    components: {
      Switches,
      Scroll,
      SongList
    },
    setup() {
      // data
      const currentIndex = ref(0)
      const switches = ref(['我喜欢的', '最近播放'])
      const store = useStore()
      const router = useRouter()

      // computed
      const favoriteList = computed(() => store.state.favoriteList)
      const playHistory = computed(() => store.state.playHistory)
      const currentList = computed(() => {
        return currentIndex.value === 0 ? favoriteList.value : playHistory.value
      })
      const noResultText = computed(() => {
        return currentIndex.value === 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
      })

      function back() {
        router.back()
      }
      function selectSong(song) {
        store.dispatch('insertSong', song)
      }
      function randomPlay() {
        store.dispatch('randomPlay', currentList.value)
      }

      return {
        // data
        currentIndex,
        switches,
        // computed
        playHistory,
        favoriteList,
        currentList,
        noResultText,
        // methods
        back,
        selectSong,
        randomPlay
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./index";
</style>
