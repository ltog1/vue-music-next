<template>
  <div class="recommend" ref="recommend" v-loading="loading">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider :sliders="sliders" v-if="sliders.length"></Slider>
          </div>
        </div>
        <div class="recommend-list">
          <div class="list-title" v-if="!loading">热门歌单推荐</div>
          <ul>
            <li class="item" v-for="item in albums" :key="item.id">
              <div class="icon"><img width="60" height="60" v-lazy="item.pic" /></div>
              <div class="text">
                <h2 class="name">{{ item.username }}</h2>
                <p class="title">{{ item.title }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import { getRecommend } from '@/service/recommend'
  import Slider from 'components/base/Slider'
  import Scroll from 'components/base/Scroll'
  export default {
    name: 'index',
    components: {
      Slider,
      Scroll
    },
    data() {
      return {
        sliders: [],
        albums: []
      }
    },
    computed: {
      loading() {
        return !this.sliders.length && !this.albums.length
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
