<template>
  <Header />
  <Tab />
  <router-view/>
  <player />
</template>
<script>
  import Header from 'components/Header/index'
  import Tab from 'components/Tab/index'
  import Player from 'components/player/index'
  export default {
    components: {
      Header,
      Tab,
      Player
    }
  }
</script>

<style lang="scss">

</style>
