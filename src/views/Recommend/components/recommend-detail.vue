<template>
  <div class="recommend-detail">
    <music-list
      :bgImage="pic"
      :title="title"
      :songs="songs"
      :loading="loading"
    />
  </div>
</template>

<script>
  import { getAlbum } from '@/service/recommend'
  import { ALBUM_KEY } from 'common/js/constant'
  import createDetailComponent from 'common/js/create-detail-component'

  export default createDetailComponent('recommend-detail', ALBUM_KEY, getAlbum)
</script>

<style scoped lang="scss">
  .recommend-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
