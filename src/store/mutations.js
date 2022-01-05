const mutations = {
  setPlayList(state, list) {
    state.playList = list
  },
  setSequenceList(state, list) {
    state.sequenceList = list
  },
  setPlayMode(state, mode) {
    state.playMode = mode
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index
  },
  setPlaying(state, flag) {
    state.playing = flag
  },
  setFullScreen(state, flag) {
    state.fullScreen = flag
  },
  setFavoriteList(state, list) {
    state.favoriteList = list
  },
  setSearchHistory(state, list) {
    state.searchHistory = list
  },
  setPlayHistory(state, list) {
    state.playHistory = list
  },
  addSongLyric(state, { currentSong, lyric }) {
    state.sequenceList.forEach(song => {
      if (song.mid === currentSong.mid) {
        song.lyric = lyric
      }
    })
  }
}

export default mutations
