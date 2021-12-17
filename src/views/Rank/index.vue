<template>
  <div class="rank">
    <scroll class="rank-content">
      <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img width="100" height="100" v-lazy="item.pic">
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="song in item.songList"
              :key="song.id"
            >
              {{ song.singerName }} - {{ song.songName }}
            </li>
          </ul>
        </li>
      </ul>
    </scroll>

    <router-view v-slot="{ Component }">
      <transition name="g-slide" appear>
        <component :is="Component" :selectedSinger="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
  import { getRankList } from '@/service/rank'
  import { RANK_KEY } from 'common/js/constant'
  import Scroll from 'components/wrap-scroll'
  export default {
    name: 'index',
    components: {
      Scroll
    },
    data() {
      return {
        topList: [],
        selectedSinger: null
      }
    },
    created() {
      this.getRankList()
    },
    methods: {
      async getRankList() {
        const data = await getRankList()
        this.topList = data.topList
      },
      selectItem(item) {
        this.selectedSinger = item
        window.sessionStorage.setItem(RANK_KEY, JSON.stringify(item))
        this.$router.push({
          path: `/rank/${item.id}`
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .rank-content {
      height: 100%;
      overflow: hidden;
      .item {
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
        &:last-child {
          padding-bottom: 20px;
        }
        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }
        .song-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: $color-highlight-background;
          color: $color-text-d;
          font-size: $font-size-small;
          .song {
            @include no-wrap();
            line-height: 26px;
          }
        }
      }
    }
  }
</style>
