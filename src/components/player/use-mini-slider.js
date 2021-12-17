import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, onUnmounted, ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'

BScroll.use(Slide)

function useMiniSlider() {
  const sliderWrapperRef = ref(null)
  const slider = ref(null)

  const store = useStore()
  const fullScreen = computed(() => store.state.fullScreen)
  const currentIndex = computed(() => store.state.currentIndex)
  const playList = computed(() => store.state.playList)

  const sliderShow = computed(() => {
    return playList.value.length && !fullScreen.value
  })

  onMounted(() => {
    watch(sliderShow, async newShow => {
      await nextTick()
      if (newShow) {
        if (!slider.value) {
          slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            slide: {
              loop: true,
              autoplay: false
            },
            momentum: false,
            bounce: false,
            probeType: 3
          })
          slider.value.on('slidePageChanged', page => {
            if (currentIndex.value !== page.pageX) {
              store.commit('setCurrentIndex', page.pageX)
            }
          })

          // 此watch只需开启一次,放在外层会开启多个监听
          watch(currentIndex, newIndex => {
            if (slider.value && sliderShow.value) {
              slider.value.goToPage(newIndex, 0, 0)
            }
          })
        } else {
          slider.value.refresh()
        }

        slider.value.goToPage(currentIndex.value, 0, 0)
      }
    })
  })

  onUnmounted(() => {
    if (slider.value) slider.value.destroy()
  })

  return {
    sliderWrapperRef
  }
}

export default useMiniSlider
