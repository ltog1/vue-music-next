<template>
  <div
    class="progress-bar"
    @click="progressBarClick"
  >
    <div class="bar-inner">
      <div class="progress" :style="`width: ${currentPercent * 100}%`"></div>
      <div
        class="progress-btn-wrapper"
        :style="barStyle"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'progress-bar',
    props: {
      currentPercent: {
        type: Number,
        default: 0
      }
    },
    emits: ['progressChanging', 'progressChange'],
    data() {
      return {
        barWidth: 0
      }
    },
    computed: {
      barStyle() {
        const moveX = this.currentPercent * this.barWidth - 8
        return {
          transform: `translate(${moveX}px, 0)`
        }
      }
    },
    updated() {
      if (!this.barWidth) {
        this.barWidth = this.$el.clientWidth
        this.touch.startX = this.$el.getBoundingClientRect().left
      }
    },
    mounted() {
      this.touch = {
        startX: 0,
        isStart: false,
        percent: 0
      }
    },
    methods: {
      progressBarClick(e) {
        const percent = (e.offsetX - 8) / this.barWidth
        this.$emit('progressChange', percent)
      },
      onTouchStart() {
        this.touch.isStart = true
      },
      onTouchMove(e) {
        const touch = this.touch
        if (!touch.isStart) {
          return
        }
        const clientX = e.touches[0].clientX
        const diffX = Math.min(Math.max(0, clientX - touch.startX - 8), this.barWidth)
        touch.percent = diffX / this.barWidth
        this.$emit('progressChanging', touch.percent)
      },
      onTouchEnd() {
        const touch = this.touch
        touch.isStart = false
        this.$emit('progressChange', touch.percent)
      }
    }
  }
</script>

<style scoped lang="scss">
  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        transform: translate(0px, 0);
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>
