<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(item,index) in songs" :key="index">
        <div class="rank" v-if="rank"></div>
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="desc">{{ item.album }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      rank: {
        type: Boolean,
        default: false
      },
      songs: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="scss">
  .song-list {
    .item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 64px;
      font-size: $font-size-medium;
      .rank {
        flex: 0 0 25px;
        width: 25px;
        margin-right: 20px;
        text-align: center;
        .icon {
          display: inline-block;
          width: 25px;
          height: 24px;
          background-size: 25px 24px;
          &.icon0 {
            @include bg-image('first');
          }
          &.icon1 {
            @include bg-image('second');
          }
          &.icon2 {
            @include bg-image('third');
          }
        }
        .text {
          color: $color-theme;
          font-size: $font-size-large;
        }
      }
      .content {
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name {
          @include no-wrap();
          color: $color-text
        }
        .desc {
          @include no-wrap();
          margin-top: 4px;
          color: $color-text-d;
        }
      }
    }
  }
</style>
