import Scroll from 'components/base/Scroll/index'
import { h, mergeProps, withCtx, renderSlot, ref, watch, computed, nextTick } from 'vue'
import { useStore } from 'vuex'

// <template>
//  <scroll ref="scrollRef" v-bind="$props" @scroll="$emit('scroll', $event)">
//     <slot></slot>
//  </scroll>
// </template>

export default {
  name: 'wrap-scroll',
  props: Scroll.props,
  emits: Scroll.emits,
  render(ctx) {
    return h(Scroll, mergeProps({
      ref: 'scrollRef'
    }, ctx.$props, {
      onScroll: (e) => {
        ctx.$emit('scroll', e)
      }
    }), {
      // withCtx保持上下文正确
      default: withCtx(() => {
        return [
          renderSlot(ctx.$slots, 'default')
        ]
      })
    })
  },
  setup() {
    const scrollRef = ref(null)
    const scroll = computed(() => scrollRef.value.scroll)

    const store = useStore()
    const playList = computed(() => store.state.playList)

    watch(playList, async () => {
      await nextTick()
      scroll.value.refresh()
    })

    return {
      scrollRef,
      scroll
    }
  }
}
