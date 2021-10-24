<template>
  <div class="recommend" ref="recommend">
    <Slider></Slider>
    recommend
  </div>
</template>

<script>
  import { getRecommend } from '@/service/recommend'
  import Slider from 'components/base/Slider'
  // import { ref, computed } from 'vue'
  export default {
    name: 'index',
    components: {
      Slider
    },
    data() {
      return {
        sliders: [],
        albums: []
      }
    },
    // setup(props) {
    //   const count = ref(0)
    //   const recommend = ref(null)
    //   const list = ref([{
    //     item: 1
    //   }])
    //   console.log(props)
    //   const newCount = computed(() => count.value * 2)
    //   return {
    //     count,
    //     recommend,
    //     list,
    //     newCount
    //   }
    // },
    mounted () {
      // console.log(this.count)
      // console.log(this.recommend)
      // console.log(this.list)
      // this.fn()
      // console.log(this.newCount)
    },
    created() {
      this.getRecommend()
    },
    methods: {
      async getRecommend() {
        const data = await getRecommend()
        this.sliders = data.sliders
        this.albums = data.albums
      }
      // fn() {
      //   this.count += 5
      // }
    }
  }
</script>

<style scoped lang="scss">
 @import "./index.scss";
</style>
