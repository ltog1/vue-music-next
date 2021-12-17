import { get } from './base'

export function getRankList () {
  return get('/api/getTopList')
}

export function getRankDetail(top) {
  return get('/api/getTopDetail', {
    id: top.id,
    period: top.period
  })
}
