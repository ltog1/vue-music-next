<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back" @click="back"></i>
    </div>
    <h1 class="title" ref="title">{{ title }}</h1>
    <div
      ref="bgImage"
      class="bg-image"
      :style="`background-image: url(${bgImage})`"
    >
      <div
        ref="playWrapper"
        class="play-btn-wrapper"
        v-show="songs.length > 0"
      >
        <div class="play-btn" @click="randomClick">
          <i class="icon-play"></i>
          <span class="text">播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <scroll
      ref="list"
      class="list"
      :style="listBottom"
      :probeType="3"
      @scroll="listScroll"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
    >
      <div class="song-list-wrapper">
        <song-list
          :rank="rank"
          :songs="songs"
          @selectSong="selectSong"
        />
      </div>
    </scroll>
  </div>
</template>

<script>
  import SongList from 'components/base/song-list'
  import Scroll from 'components/wrap-scroll'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'index',
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      noResultText: {
        type: String,
        default: '抱歉,没有找到可播放的歌曲'
      },
      songs: {
        type: Array,
        default: () => []
      }
    },
    components: {
      SongList,
      Scroll
    },
    data() {
      return {
        scrollY: 0
      }
    },
    computed: {
      noResult() {
        return !this.loading && !this.songs.length
      },
      ...mapState([
        'playList'
      ]),
      listBottom() {
        const bottom = this.playList.length ? '60px' : '0'
        return {
          bottom
        }
      }
    },
    mounted() {
      this.initDom()
    },
    methods: {
      initDom() {
        this.$list = this.$refs.list
        this.$bgImage = this.$refs.bgImage
        this.$playWrapper = this.$refs.playWrapper
        this.$filter = this.$refs.filter
        this.bgImageHeight = this.$bgImage.clientHeight
        this.$list.$el.style.top = `${this.bgImageHeight}px`
        this.maxTranslateY = this.bgImageHeight - this.$refs.title.clientHeight
      },
      listScroll(pos) {
        const percent = pos.y / this.bgImageHeight
        let scale = 1
        let height = 0
        let paddingTop = '70%'
        let zIndex = 0
        let display = 'block'
        let blur = 0

        if (pos.y >= 0) {
          scale += percent
        } else {
          blur = Math.min(Math.abs(pos.y) / this.bgImageHeight * 20, this.maxTranslateY / this.bgImageHeight * 20)
          if (Math.abs(pos.y) >= this.maxTranslateY) {
            height = 40
            paddingTop = 0
            zIndex = 10
            display = 'none'
          }
        }
        this.$bgImage.style.transform = `scale(${scale})`
        this.$bgImage.style.height = `${height}px`
        this.$bgImage.style.paddingTop = paddingTop
        this.$bgImage.style.zIndex = zIndex
        this.$playWrapper.style.display = display
        this.$filter.style.backdropFilter = `blur(${blur}px)`
      },
      selectSong(song, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      randomClick() {
        this.randomPlay(this.songs)
      },
      back() {
        this.$router.back()
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    }
  }
</script>

<style scoped lang="scss">
  .music-list {
    position: relative;
    height: 100%;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 20;
      transform: translateZ(2px);
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      z-index: 20;
      transform: translateZ(2px);
      @include no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .bg-image {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
        }
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 0;
      .song-list-wrapper {
        padding: 20px 30px;
        background: $color-background;
      }
    }
  }
</style>
