<template>
  <div
    ref="rootRef"
    class="suggest"
    v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
        <div class="icon"><i class="icon-mine"></i></div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li
        class="suggest-item"
        v-for="song in suggestList"
        :key="song.id"
        @click="selectSong(song)"
      >
        <div class="icon"><i class="icon-music"></i></div>
        <div class="name">
          <p class="text">{{ song.singer }}-{{ song.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { search } from '@/service/search'
  import { processSongs } from '@/service/song'
  import { watch, ref, computed } from 'vue'
  import usePullUpLoad from './use-pull-up-load'
  export default {
    name: 'index',
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: false
      }
    },
    emits: ['selectSong', 'selectSinger'],
    setup(props, { emit }) {
      // data
      const page = ref(1)
      const suggestList = ref([])
      const hasMore = ref(false)
      const singer = ref(null)
      const loading = ref(true)
      const loadingText = ref(' ')
      let isPullUpLoad = false

      // computed
      const noResult = computed(() => !loading.value && !suggestList.value.length)
      const noResultText = computed(() => '抱歉,暂无搜素结果')

      // hooks
      const { rootRef, pullup } = usePullUpLoad(pullingUpHandler)

      watch(() => props.query, val => {
        if (!val) {
          reset()
          return
        }

        getSearch(val, page.value)
      })

      function reset() {
        suggestList.value = []
        hasMore.value = false
        page.value = 1
        singer.value = null
      }
      async function getSearch(query, page, isPullUpLoad = false) {
        const data = await search(query, page, props.showSinger)
        await processSongs(data.songs) // 批量获取歌曲url
        if (isPullUpLoad) {
          suggestList.value = suggestList.value.concat(data.songs)
        } else {
          suggestList.value = data.songs
        }
        hasMore.value = data.hasMore
        singer.value = data.singer
        loading.value = false

        return data
      }
      async function pullingUpHandler() {
        if (hasMore.value) {
          if (isPullUpLoad) {
            return
          }

          isPullUpLoad = true
          page.value++
          await getSearch(props.query, page.value, true)
          pullup.value.finishPullUp()
          pullup.value.refresh()
          isPullUpLoad = false
        } else {
          console.log('nomore')
        }
      }
      function selectSong(song) {
        emit('selectSong', song)
      }
      function selectSinger(singer) {
        emit('selectSinger', singer)
      }

      return {
        // data
        suggestList,
        singer,
        loading,
        loadingText,
        // computed
        noResult,
        noResultText,
        // hooks
        // pullup
        rootRef,
        // methods
        selectSong,
        selectSinger
      }
    }
  }
</script>

<style scoped lang="scss">
  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          flex: 0 0 30px;
          width: 30px;
          [class^="icon-"] {
            font-size: 14px;
            color: $color-text-d;
          }
        }
        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-d;
          overflow: hidden;
          .text {
            @include no-wrap();
          }
        }
      }
    }
  }
</style>
