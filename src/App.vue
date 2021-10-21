<template>
  <Header />
  <Tab />
  <router-view/>
</template>
<script>
  import Header from 'components/Header/index'
  import Tab from 'components/Tab/index'
  export default {
    components: {
      Header,
      Tab
    }
  }
</script>

<style lang="scss">

</style>
