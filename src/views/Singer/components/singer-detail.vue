<template>
  <div class="singer-detail">
    <music-list
      :bgImage="pic"
      :title="name"
      :songs="songs"
    />
  </div>
</template>

<script>
  import { getSingerDetail } from '@/service/singer'
  import { processSongs } from '@/service/song'
  import MusicList from 'components/music-list'
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
        songs: []
      }
    },
    computed: {
      pic() {
        return this.selectedSinger && this.selectedSinger.pic
      },
      name() {
        return this.selectedSinger && this.selectedSinger.name
      }
    },
    created() {
      this.getSingerDetail()
    },
    methods: {
      async getSingerDetail() {
        if (!this.selectedSinger) {
          this.$router.push({
            path: '/singer'
          })
          return
        }
        const mid = this.selectedSinger && this.selectedSinger.mid
        const data = await getSingerDetail(mid)
        await processSongs(data.songs) // 批量获取歌曲url
        this.songs = data.songs
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
