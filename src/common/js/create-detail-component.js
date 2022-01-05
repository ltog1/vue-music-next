import MusicList from 'components/music-list'
import { processSongs } from '@/service/song'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

function createDetailComponent(name, localKey, requestFn) {
  return {
    name,
    components: {
      MusicList
    },
    props: {
      data: {
        type: Object,
        default: null
      }
    },
    setup(props) {
      const songs = ref([])
      const loading = ref(true)

      const router = useRouter()
      const route = useRoute()

      const computedData = computed(() => {
        let data
        if (props.data) {
          data = props.data
        } else {
          const localData = JSON.parse(window.sessionStorage.getItem(localKey)) || {}
          //  缓存的singer中的mid和路由参数中的mid做判断  判断是否在当前页刷新
          if (localData.mid === route.params.id || localData.id === +route.params.id) {
            data = localData
          }
        }
        return data
      })
      const pic = computed(() => {
        const data = computedData.value
        return data && data.pic
      })
      const title = computed(() => {
        const data = computedData.value
        return data && (data.name || data.title)
      })

      onMounted(() => {
        getSongList()
      })

      async function getSongList() {
        if (!computedData.value) {
          router.push({
            path: route.matched[0].path
          })
          return
        }
        const data = await requestFn(computedData.value)
        await processSongs(data.songs) // 批量获取歌曲url
        songs.value = data.songs
        loading.value = false
      }

      return {
        songs,
        loading,
        pic,
        title
      }
    }
  }
}

export default createDetailComponent
