<template>
  <div class="slide">
    <div class="slide-group">
      <div class="slide-page" v-for="item in sliders" :key="item.id">
        <a :href="item.link"><img :src="item.pic" /></a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item,index) in sliders"
        :key="item.id"
        :class="{'active': currentPageIndex === index}">
      </span>
    </div>
  </div>
</template>

<script>
  import { reactive, ref } from 'vue'
  export default {
    name: 'index',
    props: {
      sliders: {
        type: Array,
        default: () => []
      }
    },
    setup() {
      const book = reactive({ title: 'Vue 3 Guide' })
      const count = ref(0)
      return {
        book,
        count
      }
    },
    created () {
      console.log(this.book)
      console.log(this.count)
    }
  }
</script>

<style scoped lang="scss">
  .slider {
    min-height: 1px;
    font-size: 0;
    touch-action: pan-y;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        a {
          display: block;
          width: 100%;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots-wrapper {
      position: absolute;
      left: 50%;
      bottom: 12px;
      line-height: 12px;
      transform: translateX(-50%);
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        transform: translateZ(1px);
        border-radius: 50%;
        background: $color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background: $color-text-ll;
        }
      }
    }
  }
</style>
