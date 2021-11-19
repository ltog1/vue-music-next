import { getLyric } from '@/service/song'
import { useStore } from 'vuex'
import { watch, computed, ref } from 'vue'
import Lyric from 'lyric-parser'

function useLyric(currentTime) {
  const lyricListRef = ref(null)
  const lyricScrollRef = ref(null)
  const currentLyric = ref(null)
  const pureMusicLyric = ref('')
  const playingLyric = ref('') // 大播放cd歌词
  const currentLineNum = ref(0) // 当前歌词高亮的行数

  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)

  watch(currentSong, async newSong => {
    if (!newSong.id || !newSong.url) {
      return
    }

    // 切换歌曲时,把当前歌词信息置空
    if (currentLyric.value) {
      stopLyric()
      currentLineNum.value = 0
      playingLyric.value = ''
      pureMusicLyric.value = ''
      currentLyric.value = null
      lyricScrollRef.value.scroll.scrollTo(0, 0, 0)
    }

    const lyric = await getLyric(newSong)
    store.commit('addSongLyric', {
      currentSong: newSong,
      lyric
    })

    if (currentSong.value.lyric !== lyric) {
      return
    }

    currentLyric.value = new Lyric(lyric, handleLyric)
    const hasLyric = currentLyric.value.lines.length
    if (hasLyric) {
      playLyric()
    } else { // 歌曲为纯音乐时无歌词
      playingLyric.value = pureMusicLyric.value = lyric.replace(/[\w:[\]]/g, '')
    }
  })

  function handleLyric({ lineNum, txt }) {
    playingLyric.value = txt
    currentLineNum.value = lineNum

    const listElm = lyricListRef.value
    if (!listElm) {
      return
    }

    // 让歌词高亮始终显示在正中间, (滚动条向上滚动)
    let targetElm
    if (lineNum > 5) {
      targetElm = listElm.children[lineNum - 5]
    } else {
      targetElm = listElm.children[0]
    }
    lyricScrollRef.value.scroll.scrollToElement(targetElm, 1000)
  }
  function playLyric() {
    if (currentLyric.value) {
      currentLyric.value.seek(currentTime.value * 1000)
    }
  }
  function stopLyric() {
    if (currentLyric.value) {
      currentLyric.value.stop()
    }
  }

  return {
    currentLyric,
    playingLyric,
    pureMusicLyric,
    currentLineNum,
    lyricListRef,
    lyricScrollRef,
    playLyric,
    stopLyric
  }
}

export default useLyric
