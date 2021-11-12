<template>
  <div class="player">
    <transition name="normal" appear>
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.pic" />
        </div>
        <div class="top">
          <div class="back" @click="back"><i class="icon-back"></i></div>
          <h1 class="title">{{ currentSong.name}}</h1>
          <h2 class="subtitle">{{ currentSong.singer }}</h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" ref="cdRef">
                <img
                  ref="cdImageRef"
                  :class="{'playing': playing}"
                  :src="currentSong.pic"
                />
              </div>
            </div>
          </div>
          <div class="middle-r"></div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{ formatTime(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                :currentPercent="currentPercent"
                @progressChange="onProgressChange"
                @progressChanging="onProgressChanging"
              />
            </div>
            <span class="time time-r">{{ formatTime(currentSong.duration) }}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i
                :class="modeIcon"
                @click="changeMode"
              ></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i
                :class="[playing ? 'icon-pause' : 'icon-play']"
                @click="togglePlaying"
              ></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i
                :class="getFavoriteIcon(currentSong)"
                @click="toggleFavorite(currentSong)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <audio
      ref="audioRef"
      :src="currentSong.url"
      @pause="pause"
      @canplay="canplay"
      @error="error"
      @ended="ended"
      @timeupdate="timeupdate"
    />
  </div>
</template>

<script>
  import ProgressBar from './components/progress-bar'
  import { PLAY_MODE } from 'common/js/constant'
  import { formatTime } from 'common/js/util'
  import { useStore } from 'vuex'
  import { computed, watch, ref, nextTick } from 'vue'
  import useMode from './use-mode'
  import useFavorite from './use-favorite'
  import useCd from './use-cd'
  export default {
    name: 'index',
    components: {
      ProgressBar
    },
    setup() {
      // data
      const audioRef = ref(null)
      const songReady = ref(false)
      const currentTime = ref(0)
      let progressChanging = false

      // vuex
      const store = useStore()
      const fullScreen = computed(() => store.state.fullScreen)
      const currentSong = computed(() => store.getters.currentSong)
      const playing = computed(() => store.state.playing)
      const currentIndex = computed(() => store.state.currentIndex)
      const playList = computed(() => store.state.playList)
      const playMode = computed(() => store.state.playMode)

      // hooks
      const { modeIcon, changeMode } = useMode()
      const { getFavoriteIcon, toggleFavorite } = useFavorite()
      const { cdRef, cdImageRef } = useCd()

      // computed
      const disableCls = computed(() => songReady.value ? '' : 'disable')
      const currentPercent = computed(() => currentTime.value / currentSong.value.duration)

      // watch
      watch(currentSong, async newSong => {
        if (!newSong.id || !newSong.url) {
          return
        }

        songReady.value = false
        await nextTick()
        audioRef.value.play()
      })
      watch(playing, newVal => {
        if (!songReady.value) {
          return
        }
        newVal ? audioRef.value.play() : audioRef.value.pause()
      })

      // methods
      function back() {
        store.commit('setFullScreen', false)
      }
      function togglePlaying() {
        store.commit('setPlaying', !playing.value)
      }
      function prev() {
        if (!songReady.value) {
          return
        }

        if (playList.value.length === 1 || playMode.value === PLAY_MODE.loop) {
          loop()
        } else {
          let index = currentIndex.value - 1
          if (index <= 0) {
            index = playList.value.length - 1
          }
          store.commit('setCurrentIndex', index)
        }
        store.commit('setPlaying', true)
      }
      function next() {
        if (!songReady.value) {
          return
        }

        if (playList.value.length === 1 || playMode.value === PLAY_MODE.loop) {
          loop()
        } else {
          let index = currentIndex.value + 1
          if (currentIndex.value >= playList.value.length - 1) {
            index = 0
          }
          store.commit('setCurrentIndex', index)
        }
        store.commit('setPlaying', true)
      }
      function loop() {
        const $audio = audioRef.value
        $audio.currentTime = 0
        $audio.play()
      }
      // 兼容不是用户行为触发的暂停事件 (如电脑待机，关闭屏幕等) 此时应把播放器暂停,避免后续数据出错
      function pause() {
        store.commit('setPlaying', false)
      }
      function canplay() {
        songReady.value = true
      }
      function error() {
        songReady.value = true
      }
      function ended() {
        next()
      }
      function timeupdate() {
        if (progressChanging) {
          return
        }
        currentTime.value = audioRef.value.currentTime
      }
      function onProgressChange(percent) {
        progressChanging = false
        audioRef.value.currentTime = percent * currentSong.value.duration
        if (!playing.value) store.commit('setPlaying', true)
      }
      function onProgressChanging(percent) {
        progressChanging = true
        currentTime.value = percent * currentSong.value.duration
      }

      return {
        // data
        audioRef,
        currentTime,
        // vuex
        fullScreen,
        currentSong,
        playing,
        // computed
        disableCls,
        currentPercent,
        // methods
        back,
        togglePlaying,
        pause,
        prev,
        next,
        canplay,
        error,
        ended,
        timeupdate,
        formatTime,
        onProgressChange,
        onProgressChanging,
        // hooks
        // mode
        changeMode,
        modeIcon,
        // favorite
        getFavoriteIcon,
        toggleFavorite,
        // cd
        cdRef,
        cdImageRef
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./index";
</style>
