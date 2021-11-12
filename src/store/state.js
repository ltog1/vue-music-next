import { PLAY_MODE, FAVORITE_KEY } from 'common/js/constant.js'
import { load } from 'common/js/store'

const state = {
  playList: [], // 播放列表
  sequenceList: [], // 顺序播放列表
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false, // 播放器是否全屏
  playing: false, // 是否播放
  favoriteList: load(FAVORITE_KEY)
}

export default state
