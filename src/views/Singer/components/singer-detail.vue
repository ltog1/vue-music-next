<template>
  <div class="singer-detail">
    <music-list
      :bgImage="pic"
      :title="name"
      :songs="songs"
      :loading="loading"
    />
  </div>
</template>

<script>
  import { getSingerDetail } from '@/service/singer'
  import { processSongs } from '@/service/song'
  import MusicList from 'components/music-list'
  import { SINGER_KEY } from 'common/js/constant'
  export default {
    name: 'singer-detail',
    components: {
      MusicList
    },
    props: {
      selectedSinger: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        songs: [],
        loading: true
      }
    },
    computed: {
      computedSinger() {
        let singer
        if (this.selectedSinger) {
          singer = this.selectedSinger
        } else {
          const localSinger = JSON.parse(window.sessionStorage.getItem(SINGER_KEY)) || null
          //  缓存的singer中的mid和路由参数中的mid做判断  判断是否在当前页刷新
          if (localSinger.mid === this.$route.params.id) singer = localSinger
        }
        return singer
      },
      pic() {
        return this.computedSinger && this.computedSinger.pic
      },
      name() {
        return this.computedSinger && this.computedSinger.name
      }
    },
    created() {
      this.getSingerDetail()
    },
    methods: {
      async getSingerDetail() {
        if (!this.computedSinger) {
          this.$router.push({
            path: this.$route.matched[0].path
          })
          return
        }
        const data = await getSingerDetail(this.computedSinger.mid)
        await processSongs(data.songs) // 批量获取歌曲url
        this.songs = data.songs
        this.loading = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
