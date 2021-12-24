<template>
  <div class="singer" v-loading="loading">
    <index-list :data="singers" @selectItem="selectItem" />
    <router-view v-slot="{ Component }">
      <transition name="g-slide" appear>
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
  import { getSingerList } from '@/service/singer'
  import IndexList from 'components/index-list'
  import { SINGER_KEY } from 'common/js/constant'
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
        window.sessionStorage.setItem(SINGER_KEY, JSON.stringify(singer))
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
