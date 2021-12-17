<template>
  <div class="progress-circle">
    <svg
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      :width="svgWidth"
      :height="svgHeight"
    >
      <circle
        class="progress-ci"
        fill="transparent"
        :r="r"
        :cx="cx"
        :cy="cy"
        :style="`stroke: ${fillColor};stroke-width: ${strokeWidth}px`"
      >
      </circle>
      <circle
        class="progress-bar"
        :r="r"
        :cx="cx"
        :cy="cy"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashoffset"
        :style="`stroke: ${strokeColor};stroke-width: ${strokeWidth}px`"
      >
      </circle>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'progress-circle',
    props: {
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      currentPercent: {
        type: Number,
        default: 0
      },
      fillColor: {
        type: String,
        default: '#FACEB3'
      },
      strokeColor: {
        type: String,
        default: '#EC6F21'
      },
      strokeWidth: {
        type: Number,
        default: 7
      }
    },
    computed: {
      dashoffset() {
        return (1 - this.currentPercent) * this.dashArray
      },
      dashArray () {
        return this.width * Math.PI // 圆的周长:2πr
      }
    },
    data() {
      return {
        r: this.width / 2 - this.strokeWidth / 2,
        cx: this.width / 2,
        cy: this.height / 2,
        svgWidth: this.width,
        svgHeight: this.height
      }
    }
  }
</script>

<style scoped lang="scss">
  .progress-circle {
    width: 100%;
    height: 100%;
    position: relative;
    .progress-ci {
      /*stroke-width: 15px;*/
      transform-origin: center;
    }
    .progress-bar {
      transform: rotate(-90deg);
      /*stroke-width: 15px;*/
      transform-origin: center;
    }
  }

</style>
