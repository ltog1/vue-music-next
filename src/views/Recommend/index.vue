<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <div class="slider-content">
          <Slider :sliders="sliders" v-if="sliders.length"></Slider>
        </div>
      </div>
      <div class="recommend-list">
        <div class="list-title">热门歌单推荐</div>
        <ul>
          <li class="item" v-for="item in albums" :key="item.id">
            <div class="icon"><img width="60" height="60" :src="item.pic" /></div>
            <div class="text">
              <h2 class="name">{{ item.username }}</h2>
              <p class="title">{{ item.title }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { getRecommend } from '@/service/recommend'
  import Slider from 'components/base/Slider'
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
    created() {
      this.getRecommend()
    },
    methods: {
      async getRecommend() {
        const data = await getRecommend()
        this.sliders = data.sliders
        this.albums = data.albums
      }
    }
  }
</script>

<style scoped lang="scss">
 @import "./index.scss";
</style>
