import { PLAY_MODE } from 'common/js/constant'
import { shuffle, findIndex } from 'common/js/util'

const actions = {
  selectPlay({ commit, state }, { list, index }) {
    commit('setPlayList', list)
    commit('setSequenceList', list)
    commit('setCurrentIndex', index)
    commit('setPlaying', true)
    commit('setFullScreen', true)
    commit('setPlayMode', PLAY_MODE.sequence)
  },
  randomPlay({ commit }, list) {
    const randomList = shuffle(list)
    commit('setCurrentIndex', 0)
    commit('setPlayList', randomList)
    commit('setSequenceList', list)
    commit('setPlaying', true)
    commit('setFullScreen', true)
    commit('setPlayMode', PLAY_MODE.random)
  },
  changeMode({ commit, state, getters }, mode) {
    if (mode !== PLAY_MODE.loop) {
      let list = state.sequenceList
      let index = findIndex(state.sequenceList, getters.currentSong)
      if (mode === PLAY_MODE.random) {
        list = shuffle(state.sequenceList)
        index = findIndex(list, getters.currentSong)
      }
      commit('setCurrentIndex', index)
      commit('setPlayList', list)
    }
    commit('setPlayMode', mode)
  },
  removeSong({ commit, state }, song) {
    let currentIndex = state.currentIndex
    const playList = state.playList.concat()
    const sequenceList = state.sequenceList.concat()

    const playIndex = findIndex(state.playList, song)
    if (playIndex > -1) {
      playList.splice(playIndex, 1)
      if (playIndex < currentIndex || currentIndex === playList.length) {
        currentIndex--
      }
    }

    const sequenceIndex = findIndex(state.sequenceList, song)
    if (sequenceIndex > -1) {
      sequenceList.splice(sequenceIndex, 1)
    }

    commit('setCurrentIndex', currentIndex)
    commit('setPlayList', playList)
    commit('setSequenceList', sequenceList)

    if (!playList.length) {
      commit('setPlaying', false)
    }
  },
  clearPlay({ commit }) {
    commit('setPlayList', [])
    commit('setSequenceList', [])
    commit('setCurrentIndex', -1)
    commit('setPlaying', false)
  },
  insertSong({ commit, state }, song) {
    let currentIndex = state.currentIndex
    const playList = state.playList.concat()
    const sequenceList = state.sequenceList.concat()

    currentIndex++
    const playIndex = findIndex(playList, song)
    const sequenceIndex = findIndex(sequenceList, song)
    playList.splice(currentIndex, 0, song)
    sequenceList.splice(currentIndex, 0, song)

    if (playIndex > -1) {
      // 要插入的歌曲在当前歌曲播放列表的前面
      if (playIndex < currentIndex) {
        playList.splice(playIndex, 1)
        currentIndex--
      } else { // 要插入的歌曲在当前歌曲播放列表的后面
        playList.splice(playIndex + 1, 1)
      }
    }
    if (sequenceIndex > -1) {
      if (sequenceIndex < currentIndex) {
        sequenceList.splice(sequenceIndex, 1)
      } else {
        sequenceList.splice(sequenceIndex + 1, 1)
      }
    }

    commit('setPlaying', true)
    commit('setFullScreen', true)
    commit('setPlayList', playList)
    commit('setSequenceList', sequenceList)
    commit('setCurrentIndex', currentIndex)
  }
}

export default actions
