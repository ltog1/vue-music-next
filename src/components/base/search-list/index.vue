<template>
  <div class="search-list">
    <transition-group tag="ul" name="list">
      <li
        class="search-item"
        v-for="(item,index) in list"
        :key="index"
      >
        <span class="text">{{ item }}</span>
        <span class="icon" @click="deleteHistory(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    emits: ['deleteHistory'],
    methods: {
      deleteHistory(item) {
        this.$emit('deleteHistory', item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .search-list {
    .search-item {
      display: flex;
      align-items: center;
      height: 40px;
      overflow: hidden;
      .text {
        flex: 1;
        color: $color-text-l;
      }
      .icon {
        @include extend-click();
        .icon-delete {
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }
</style>
