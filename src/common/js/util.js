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

function debounce(func, wait, immediate = true) {
  // 定义一个timeout计时器
  let timeout
  return function() {
    // 如果每次进入函数的时候timeout有值，说明等待时间还没有过，不执行函数，清空timeout
    // 如果没有timeout，则说明过了等待期，可以执行函数
    if (timeout) clearTimeout(timeout)
    // 默认立即执行方法，延后执行的话，会让人感觉有卡顿
    if (immediate) {
      // 定义现在是否能执行
      const now = !timeout
      if (now) func.apply(this, arguments)
      // 不论timeout有没有值，都重新给timeout新添加一个定时器
      // 等待wait时间后，将timeout设为null，代表可以继续执行次function
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
    } else {
      // 如果不是立即执行此函数，则在等待wait时间后执行方法
      timeout = setTimeout(() => {
        func.apply(this, arguments)
      }, wait)
    }
  }
}

function throttle(func, maxWait) {
  let lastTime
  return function(...rest) {
    if (!lastTime || (new Date().getTime() - lastTime > maxWait)) {
      lastTime = +new Date()
      func.apply(this, rest)
    }
  }
}

export {
  getRandom,
  shuffle,
  formatTime,
  findIndex,
  debounce,
  throttle,
  storage
}
