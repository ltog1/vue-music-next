import Loading from './index'
import { createApp } from 'vue'

const relativeCls = 'g-relative'

function createLoadingLikeDirective(comp) {
  const app = createApp(comp)
  const instance = app.mount(document.createElement('div'))

  return {
    mounted(el, binding) {
      el.instance = instance
      if (binding.arg) instance.setTitle(binding.arg)
      if (binding.value) append(el)
    },
    updated(el, binding) {
      if (binding.arg) instance.setTitle(binding.arg)
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }
}

function append(el) {
  const position = window.getComputedStyle(el).position
  // 如果指令作用的元素没有使用定位，则添加一个类名使其定位  (因 此指令要求作用的元素必须使用非static定位)
  if (['fixed', 'relative', 'absolute'].indexOf(position) === -1) {
    el.classList.add(relativeCls)
  }
  el.appendChild(el.instance.$el)
}

function remove(el) {
  el.classList.remove(relativeCls)
  el.removeChild(el.instance.$el)
}

const loadingDirective = createLoadingLikeDirective(Loading)

export default loadingDirective
