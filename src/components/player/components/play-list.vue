<template>
  <teleport to="body">
    <transition name="list-fade" appear>
      <div
        class="playlist"
        v-show="visible && playList.length"
        @click="hide"
      >
        <div class="list-wrapper" @click.stop>
          <div class="list-header">
            <h1 class="title">
              <i
                class="icon"
                :class="modeIcon"
                @click="changeMode"
              ></i>
              <span class="text">{{ modeText }}</span>
              <span class="clear" @click.stop="showConfirm"><i class="icon-clear"></i></span>
            </h1>
          </div>
          <scroll class="list-content" ref="scrollRef">
            <transition-group
              name="list"
              tag="ul"
              ref="listRef"
            >
              <li
                class="item"
                v-for="song in sequenceList"
                :key="song.id"
              >
                <i class="current" :class="getCurrentIcon(song)"></i>
                <span class="text" >{{ song.name }}</span>
                <span class="favorite" @click.stop="toggleFavorite(song)">
                  <i :class="getFavoriteIcon(song)"></i>
                </span>
                <span
                  class="delete"
                  :class="{'disable': removeing}"
                  @click.stop="removeSong(song)"
                >
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </scroll>
          <div class="list-add">
            <div class="add">
              <i class="icon-add"></i>
              <span class="text">添加歌曲到队列</span>
            </div>
          </div>
          <div class="list-footer" @click="hide">关闭</div>
        </div>

        <confirm ref="confirmRef" @confirm="clearPlay" />
      </div>
    </transition>
  </teleport>
</template>

<script>
  import { ref, computed, watch, nextTick } from 'vue'
  import { useStore } from 'vuex'
  import { findIndex } from 'common/js/util'
  import Scroll from 'components/base/Scroll'
  import Confirm from 'components/base/confirm'
  import useFavorite from '../use-favorite'
  import useMode from '../use-mode'
  export default {
    name: 'play-list',
    components: {
      Scroll,
      Confirm
    },
    setup() {
      // data
      const visible = ref(false)
      const confirmRef = ref(null)
      const scrollRef = ref(null)
      const listRef = ref(null)
      const removeing = ref(false)

      // vuex
      const store = useStore()
      const sequenceList = computed(() => store.state.sequenceList)
      const playList = computed(() => store.state.playList)
      const currentSong = computed(() => store.getters.currentSong)

      // watch
      watch([currentSong, visible], async ([newSong]) => {
        if (!newSong.id || !newSong.url) {
          return
        }

        await nextTick()
        if (visible.value) scrollToCurrent()
      })

      // hooks
      const { getFavoriteIcon, toggleFavorite } = useFavorite()
      const { modeIcon, modeText, changeMode } = useMode()

      // methods
      function show() {
        visible.value = true
      }
      function hide() {
        visible.value = false
      }
      function showConfirm() {
        confirmRef.value.show()
      }
      function clearPlay() {
        hide()
        store.dispatch('clearPlay')
      }
      function getCurrentIcon(song) {
        return song.id === currentSong.value.id ? 'icon-play' : ''
      }
      function removeSong(song) {
        if (removeing.value) {
          return
        }

        removeing.value = true
        store.dispatch('removeSong', song)
        if (!playList.value.length) hide()
        setTimeout(() => {
          removeing.value = false
        }, 300)
      }
      function selectItem(song) {
        const index = findIndex(playList.value, song)
        if (index > -1) {
          store.commit('setCurrentIndex', index)
          store.commit('setPlaying', true)
        }
      }
      function scrollToCurrent() {
        const listElm = listRef.value.$el
        const index = findIndex(sequenceList.value, currentSong.value)
        const currentElm = listElm.children[index]
        if (currentElm) {
          scrollRef.value.scroll.scrollToElement(currentElm, 500)
        }
      }

      return {
        // data
        visible,
        confirmRef,
        scrollRef,
        listRef,
        removeing,
        // vuex
        sequenceList,
        playList,
        // methods
        show,
        hide,
        getCurrentIcon,
        removeSong,
        selectItem,
        showConfirm,
        clearPlay,
        // favourite
        getFavoriteIcon,
        toggleFavorite,
        // mode
        modeIcon,
        changeMode,
        modeText
      }
    }
  }
</script>

<style scoped lang="scss">
  .playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: $color-background-d;
    &.list-fade-enter-active, &.list-fade-leave-active {
      transition: opacity .3s;
      .list-wrapper {
        transition: all .3s;
      }
    }
    &.list-fade-enter-from, &.list-fade-leave-to {
      opacity: 0;
      .list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
    .list-wrapper {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 210;
      width: 100%;
      background-color: $color-highlight-background;
      .list-header {
        position: relative;
        padding: 20px 30px 10px 20px;
        .title {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 10px;
            font-size: 24px;
            color: $color-theme-d;
          }
          .text {
            flex: 1;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
      .list-content {
        max-height: 240px;
        overflow: hidden;
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          .current {
            flex: 0 0 20px;
            width: 20px;
            font-size: $font-size-small;
            color: $color-theme-d;
          }
          .text {
            flex: 1;
            @include no-wrap();
            font-size: $font-size-medium;
            color: $color-text-d;
          }
          .favorite {
            @include extend-click();
            margin-right: 15px;
            font-size: $font-size-small;
            color: $color-theme;
            .icon-favorite {
              color: $color-sub-theme;
            }
          }
          .delete {
            @include extend-click();
            font-size: $font-size-small;
            color: $color-theme;
            &.disable {
              color: $color-theme-d;
            }
          }
        }
      }
      .list-add {
        width: 140px;
        margin: 20px auto 30px auto;
        .add {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid $color-text-l;
          border-radius: 100px;
          color: $color-text-l;
          .icon-add {
            margin-right: 5px;
            font-size: $font-size-small-s;
          }
          .text {
            font-size: $font-size-small;
          }
        }
      }
      .list-footer {
        text-align: center;
        line-height: 50px;
        background: $color-background;
        font-size: $font-size-medium-x;
        color: $color-text-l;
      }
    }
  }
</style>
