const storage = {
  set(name, value, expires = 0) {
    const currentTime = new Date().getTime()
    localStorage.setItem(
      name,
      JSON.stringify({ data: value, time: currentTime, expires })
    )
  },
  get(name) {
    const item = localStorage.getItem(name)
    if (item) {
      let result
      try {
        result = JSON.parse(item)
      } catch (error) {
        result = item
      }
      if (result.time) {
        const date = new Date().getTime()
        if (date - result.time > result.expires && result.expires > 0) {
          localStorage.removeItem(name)
          return false
        } else {
          return result.data
        }
      } else {
        return result
      }
    }
    return false
  },
  remove(name) {
    localStorage.removeItem(name)
  }
}

function getRandom(min, max) {
  const ran = Math.floor(Math.random() * (max - min + 1) + min)
  return ran
}

function shuffle(arr) {
  const _arr = arr.concat()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandom(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function formatTime(interval) {
  const minute = (Math.floor(interval / 60 % 60) + '').padStart(2, '0')
  const seconds = (Math.floor(interval % 60) + '').padStart(2, '0')
  return `${minute}:${seconds}`
}

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export {
  getRandom,
  shuffle,
  formatTime,
  findIndex,
  storage
}
