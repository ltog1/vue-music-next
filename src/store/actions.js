import { PLAY_MODE } from 'common/js/constant'
import { shuffle, findIndex } from 'common/js/util'

const actions = {
  selectPlay({ commit, state }, { list, index }) {
    if (state.playMode === PLAY_MODE.random) {
      const randomList = shuffle(list)
      commit('setPlayList', randomList)
      index = findIndex(randomList, list[index])
    } else {
      commit('setPlayList', list)
    }
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
  }
}

export default actions
