<template>
  <ul class="switches" ref="switches">
    <li
      class="switch-item"
      v-for="(item,index) in list"
      :key="index"
      :class="{'active': modelValue === index}"
      @click="switchItem(index)"
    >
      {{ item }}
    </li>
    <div class="active-bar" :style="barMove"></div>
  </ul>
</template>

<script>
  export default {
    name: 'index',
    props: {
      list: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: Number,
        default: 0
      }
    },
    computed: {
      barMove() {
        return {
          transform: `translate3d(${this.modelValue * 120}px, 0, 0)`
        }
      }
    },
    emits: ['update:modelValue'],
    methods: {
      switchItem(index) {
        this.$emit('update:modelValue', index)
      }
    }
  }
</script>

<style scoped lang="scss">
  .switches {
    display: flex;
    position: relative;
    align-items: center;
    width: 240px;
    margin: 0 auto;
    border: 1px solid $color-highlight-background;
    border-radius: 5px;
    .switch-item {
      position: relative;
      z-index: 10;
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text-d;
      &.active {
        color: $color-text
      }
    }
    .active-bar {
      position: absolute;
      left: 0;
      top: 0;
      width: 120px;
      height: 30px;
      transition: transform 0.3s;
      border-radius: 5px;
      background: $color-highlight-background;
    }
  }
</style>
