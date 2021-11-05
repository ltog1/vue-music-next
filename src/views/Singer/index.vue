<template>
  <div class="singer" v-loading="loading">
    <index-list :data="singers" @selectItem="selectItem" />
    <router-view :selectedSinger="selectedSinger"></router-view>
  </div>
</template>

<script>
  import { getSingerList } from '@/service/singer'
  import IndexList from 'components/base/index-list'
  export default {
    name: 'index',
    components: {
      IndexList
    },
    data() {
      return {
        singers: [],
        selectedSinger: null
      }
    },
    computed: {
      loading() {
        return !this.singers.length
      }
    },
    created() {
      this.getSingerList()
    },
    methods: {
      async getSingerList() {
        const data = await getSingerList()
        this.singers = data.singers
      },
      selectItem(singer) {
        this.selectedSinger = singer
        this.$router.push({
          path: `/singer/${singer.mid}`
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
