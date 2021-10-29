<template>
  <div class="recommend" ref="recommend">
<!--    <Slider ref="slider"></Slider>-->
    <div style="height: 500px" v-if="falg">
      <Slider :list="sliders">
        <div v-for="(item,index) in sliders" :key="index"><img :src="item.pic" style="display: block;width: 100%"></div>
      </Slider>
    </div>
  </div>
</template>

<script>
  import { getRecommend } from '@/service/recommend'
  // import Slider from 'components/base/Slider'
  import Slider from 'components/base/my-slider'
  import { provide, ref, readonly } from 'vue'
  export default {
    name: 'index',
    components: {
      Slider
    },
    setup() {
      const location = ref('North Pole')
      provide('location', readonly(location))
      provide('updateLocation', (value) => {
        location.value = value
      })
    },
    data() {
      return {
        sliders: [],
        albums: [],
        falg: false
      }
    },
    created() {
      this.getRecommend()
    },
    methods: {
      async getRecommend() {
        const data = await getRecommend()
        console.log(data)
        this.sliders = data.sliders
        this.albums = data.albums
        this.falg = true
      }
    }
  }
</script>

<style scoped lang="scss">
 @import "./index.scss";
</style>
