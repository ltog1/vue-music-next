<template>
  <div class="singer-detail">
    <music-list
      :bgImage="pic"
      :title="title"
      :songs="songs"
      :loading="loading"
    />
  </div>
</template>

<script>
  import { getSingerDetail } from '@/service/singer'
  import { SINGER_KEY } from 'common/js/constant'
  import createDetailComponent from 'common/js/create-detail-component'

  export default createDetailComponent('singer-detail', SINGER_KEY, getSingerDetail)
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
