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
            <li class="item" v-for="item in albums" :key="item.id" @click="selectItem(item)">
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

    <router-view v-slot="{ Component }">
      <transition name="g-slide" appear>
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
  import { getRecommend } from '@/service/recommend'
  import Slider from 'components/base/Slider'
  import Scroll from 'components/wrap-scroll'
  import { ALBUM_KEY } from 'common/js/constant'
  export default {
    name: 'index',
    components: {
      Slider,
      Scroll
    },
    data() {
      return {
        sliders: [],
        albums: [],
        selectedSinger: null
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
      },
      selectItem(item) {
        this.selectedSinger = item
        window.sessionStorage.setItem(ALBUM_KEY, JSON.stringify(item))
        this.$router.push({
          path: `/recommend/${item.id}`
        })
      }
    }
  }
</script>

<style scoped lang="scss">
 @import "./index.scss";
</style>
