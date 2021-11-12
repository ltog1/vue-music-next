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
  }
}

export default mutations
