<template>
  <Header />
  <Tab />
  <router-view v-slot="{ Component }" :style="viewStyle">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view
    v-slot="{ Component }"
    :style="viewStyle"
    name="user"
  >
    <transition name="g-slide" appear>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <player />
</template>
<script>
  import Header from 'components/Header/index'
  import Tab from 'components/Tab/index'
  import Player from 'components/player/index'
  import { mapState } from 'vuex'
  import { FAVORITE_KEY, PLAY_KEY } from 'common/js/constant'
  import { load } from 'common/js/store'
  import { storage } from 'common/js/util'
  import { processSongs } from '@/service/song'
  export default {
    components: {
      Header,
      Tab,
      Player
    },
    computed: {
      ...mapState([
        'playList'
      ]),
      viewStyle() {
        const bottom = this.playList.length ? '60px' : '0'
        return {
          bottom
        }
      }
    },
    async created() {
       // 每次打开应用都更新一下缓存中歌曲的url,防止缓存中歌曲的url歌曲过期,导致无法播放
       const favoriteList = load(FAVORITE_KEY)
       const playHistory = load(PLAY_KEY)
       await processSongs(favoriteList)
       await processSongs(playHistory)
       storage.set(FAVORITE_KEY, favoriteList)
       storage.set(PLAY_KEY, playHistory)
     }
  }
</script>

<style lang="scss">

</style>
