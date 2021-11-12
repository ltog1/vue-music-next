const getters = {
  // playList(state) {
  //   return state.playList
  // },
  // sequenceList(state) {
  //   return state.sequenceList
  // },
  // playMode(state) {
  //   return state.playMode
  // },
  // currentIndex(state) {
  //   return state.currentIndex
  // },
  // fullScreen(state) {
  //   return state.fullScreen
  // },
  // playing(state) {
  //   return state.playing
  // },
  currentSong(state) {
    return state.playList[state.currentIndex] || {}
  }
}

export default getters
