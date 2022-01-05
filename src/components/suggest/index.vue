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
      <div class="suggest-item" v-loading:[loadingText]="pullUpLoading"></div>
    </ul>
  </div>
</template>

<script>
  import { search } from '@/service/search'
  import { processSongs } from '@/service/song'
  import { watch, ref, computed, nextTick } from 'vue'
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
      const hasMore = ref(true)
      const singer = ref(null)
      const loadingText = ref(' ')
      const manuaLoading = ref(false)

      // computed
      const loading = computed(() => !singer.value && !suggestList.value.length)
      const noResult = computed(() => loading.value && !hasMore.value)
      const noResultText = computed(() => '抱歉,暂无搜素结果')
      const pullUpLoading = computed(() => isPullUpLoad.value && hasMore.value)

      const preventPullUpLoad = computed(() => loading.value || manuaLoading.value)

      // hooks
      const { rootRef, isPullUpLoad, scroll } = usePullUpLoad(pullingUpHandler, preventPullUpLoad)

      watch(() => props.query, newVal => {
        if (!newVal) {
          return
        }

        searchFirst()
      })

      async function searchFirst() {
        suggestList.value = []
        hasMore.value = true
        page.value = 1
        singer.value = null

        const { query, showSinger } = props
        const data = await search(query, page.value, showSinger)
        suggestList.value = await processSongs(data.songs)
        hasMore.value = data.hasMore
        singer.value = data.singer
        await nextTick()
        await makeItScrollable()
      }
      async function searchMore() {
        page.value++
        const { query, showSinger } = props
        const data = await search(query, page.value, showSinger)
        suggestList.value = suggestList.value.concat(await processSongs(data.songs))
        hasMore.value = data.hasMore
        singer.value = data.singer
        await makeItScrollable()
      }
      async function pullingUpHandler() {
        if (!hasMore.value) {
          return
        }

        await searchMore()
      }
      async function makeItScrollable() {
        // 如果首次搜索数据的不足占满一屏,则再次请求接口,直到数据能占满一屏
        while (scroll.value.maxScrollY >= -1 && props.query) {
          manuaLoading.value = true
          await searchMore()
          manuaLoading.value = false
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
        // pullUpLoad
        rootRef,
        pullUpLoading,
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
