import { storage } from './util'

function insertArray(list, value, compare, maxLength) {
  const index = list.findIndex(compare)
  if (index === 0) {
    return
  }

  if (index > -1) {
    list.splice(index, 1)
  }

  list.unshift(value)
  if (maxLength && list.length > maxLength) {
    list.pop()
  }
}

function deleteFromArray(list, compare) {
  const index = list.findIndex(compare)
  if (index > -1) {
    list.splice(index, 1)
  }
}

function save(key, value, compare, maxLength) {
  const items = load(key)
  insertArray(items, value, compare, maxLength)
  storage.set(key, items)
  return items
}

function remove(key, compare) {
  const items = load(key)
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

function load(key) {
  return storage.get(key) || []
}

export {
  save,
  remove,
  load
}
