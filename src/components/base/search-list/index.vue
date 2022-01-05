<template>
  <div class="search-list">
    <transition-group tag="ul" name="list">
      <li
        class="search-item"
        v-for="item in list"
        :key="item"
        @click="selectSearch(item)"
      >
        <span class="text">{{ item }}</span>
        <span
          class="icon"
          @click.stop="deleteHistory(item)"
          v-show="showDelete"
        >
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
      },
      showDelete: {
        type: Boolean,
        default: true
      }
    },
    emits: ['deleteSearch', 'selectSearch'],
    methods: {
      deleteHistory(item) {
        this.$emit('deleteSearch', item)
      },
      selectSearch(item) {
        this.$emit('selectSearch', item)
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
