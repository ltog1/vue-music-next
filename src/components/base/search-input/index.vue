<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input class="input-inner" type="text" :placeholder="placeholder" v-model="query">
    <i class="icon-dismiss" @click="clear" v-show="query"></i>
  </div>
</template>

<script>
  import { debounce } from 'common/js/util'
  export default {
    name: 'index',
    props: {
      modelValue: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: this.modelValue
      }
    },
    created() {
      this.$watch('query', debounce(val => {
        this.$emit('update:modelValue', val.trim())
      }, 300, false))

      this.$watch('modelValue', val => {
        this.query = val
      })
    },
    methods: {
      clear() {
        this.query = ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .search-input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 32px;
    background: $color-highlight-background;
    border-radius: 6px;
    .icon-search {
      font-size: 24px;
      color: $color-text-d;
    }
    .input-inner {
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: $color-highlight-background;
      color: $color-text;
      font-size: $font-size-medium;
      outline: 0;
      &::placeholder {
        color: $color-text-d;
      }
    }
    .icon-dismiss {
      font-size: 16px;
      color: $color-text-d;
    }
  }
</style>
