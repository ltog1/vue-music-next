import { createApp } from 'vue'

const relativeCls = 'g-relative'
const positionList = ['fixed', 'relative', 'absolute']

function createLoadingLikeDirective(comp) {
  const name = comp.name
  return {
    mounted(el, binding) {
      const app = createApp(comp)
      const instance = app.mount(document.createElement('div'))
      if (!el[name]) el[name] = {}
      // 为每个应用指令的dom添加name唯一标识, 防止同一页面应用两次以上指令时报错
      el[name].instance = instance
      if (binding.arg) instance.setTitle(binding.arg)
      if (binding.value) append(el)
    },
    updated(el, binding) {
      if (binding.arg) el[name].instance.setTitle(binding.arg)
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }

  function append(el) {
    const position = window.getComputedStyle(el).position
    // 如果指令作用的元素没有使用定位，则添加一个类名使其定位  (此指令要求作用的元素必须使用非static定位)
    if (positionList.indexOf(position) === -1) {
      el.classList.add(relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }

  function remove(el) {
    el.classList.remove(relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}

export {
  createLoadingLikeDirective
}
