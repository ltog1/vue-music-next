<template>
  <div class="tab">
    <router-link
      tag="div"
      class="tab-item"
      v-for="(tab,index) in tabs"
      :key="index"
      :to="tab.path"
    >
      <span class="tab-link">{{ tab.name }}</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        tabs: Object.freeze([
          {
            name: '推荐',
            path: '/Recommend'
          },
          {
            name: '歌手',
            path: '/Singer'
          },
          {
            name: '排行',
            path: '/rank'
          },
          {
            name: '搜索',
            path: '/Search'
          }
        ])
      }
    }
  }
</script>

<style scoped lang="scss">
  .tab {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: $font-size-medium;
    .tab-item {
      flex: 1;
      text-align: center;
      .tab-link {
        padding-bottom: 5px;
        color: $color-text-l;
      }
      &.router-link-active {
        .tab-link {
          color: $color-theme;
          border-bottom: 2px solid $color-theme;
        }
      }
    }
  }
</style>
