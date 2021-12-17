<template>
  <div class="rank-detail">
    <music-list
      :bgImage="pic"
      :title="title"
      :songs="songs"
      :loading="loading"
      :rank="true"
    />
  </div>
</template>

<script>
  import { getRankDetail } from '@/service/rank'
  import { RANK_KEY } from 'common/js/constant'
  import createDetailComponent from 'common/js/create-detail-component'

  export default createDetailComponent('rank-detail', RANK_KEY, getRankDetail)
</script>

<style scoped lang="scss">
 .rank-detail {
   position: fixed;
   z-index: 10;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   background: $color-background;
 }
</style>
