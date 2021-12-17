import { debounce } from './util'

function createDebounceLikeDirective() {
  return {
    // 绑定的值为el，和binding
    // binding的值为指令绑定的值,binding中有哪些值，可以去vue官网中查看自定义指令
    mounted(el, binding) {
      let execFunc
      // 在函数传参与不传参调用的时候，打印出来的binding.value是不同的
      // 打印binding.value可以帮助理解为什么有传参和不传参的区别
      // console.log(binding.value);
      if (binding.value instanceof Array) {
        // 函数传参
        const [func, time = 500] = binding.value
        execFunc = debounce(func, time)
      } else {
        // 函数不传参
        // console.log('函数不传参');
        execFunc = debounce(binding.value, 500)
      }
      el.addEventListener('click', execFunc)
    }
  }
}

const debounceDirective = createDebounceLikeDirective()

export default debounceDirective
