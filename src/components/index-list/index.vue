<template>
  <scroll
    class="index-list"
    :probeType="3"
    @scroll="listviewScroll"
    ref="scrollRef"
  >
    <ul ref="groupRef">
      <li
        class="group"
        v-for="(item,key) in data"
        :key="key"
      >
        <h2 class="title">{{ item.title }}</h2>
        <ul>
          <li
            class="item"
            v-for="singer in item.list"
            :key="singer.id"
            @click="selectItem(singer)"
          >
            <img class="avatar" v-lazy="singer.pic" />
            <div class="name">{{ singer.name }}</div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="shortcut">
      <ul
        ref="shortcutList"
        @touchstart.stop.prevent="alphabetTouchStart"
        @touchmove.stop.prevent="alphabetTouchMove"
      >
        <li
          class="item"
          v-for="(item,index) in data"
          :key="index"
          :data-index="index"
          :class="{'current': currentIndex === index}"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="fixed" v-if="fixedShow" :style="fixedStyle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/wrap-scroll'
  import { useFixed } from './use-fixed'
  import { useShortcut } from './use-shortcut'
  export default {
    name: 'index',
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    emits: ['selectItem'],
    components: {
      Scroll
    },
    setup(props, { emit }) {
      const { groupRef, currentIndex, fixedShow, fixedTitle, listviewScroll, fixedStyle } = useFixed(props)
      const { shortcutList, scrollRef, alphabetTouchStart, alphabetTouchMove } = useShortcut(props, groupRef)

      // methods
      function selectItem(singer) {
        emit('selectItem', singer)
      }

      return {
        // fixed
        groupRef,
        currentIndex,
        fixedShow,
        fixedStyle,
        fixedTitle,
        listviewScroll,
        // shortcut
        shortcutList,
        scrollRef,
        alphabetTouchStart,
        alphabetTouchMove,
        selectItem
      }
    }
  }
</script>

<style scoped lang="scss">
  .index-list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .group {
      padding-bottom: 30px;
      .title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
      .item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .name {
          margin-left: 20px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      }
    }
    .fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
    }
    .shortcut {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: $color-background-d;
      font-family: Helvetica;
      .item {
        padding: 3px;
        line-height: 1;
        color: $color-text-l;
        font-size: $font-size-small;
        &.current {
          color: $color-theme
        }
      }
    }
  }
</style>
