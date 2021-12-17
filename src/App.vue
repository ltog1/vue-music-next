<template>
  <Header />
  <Tab />
  <router-view :style="viewStyle" />
  <player />
</template>
<script>
  import Header from 'components/Header/index'
  import Tab from 'components/Tab/index'
  import Player from 'components/player/index'
  import { mapState } from 'vuex'
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
    }
  }
</script>

<style lang="scss">

</style>
