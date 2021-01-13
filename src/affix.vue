<template>
  <!-- fixed 之后占位用 -->
  <div class="s-affix-wrapper" ref="wrapper" :style="{height, width}">
    <div class="s-affix" :style="{top, left}" :class="{fixed}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
    props: {
      distance: {
        type: Number,
        default: 0
      }
    },
  data() { 
    return {
        fixed: false,
        initialTop: undefined,
        top: undefined,
        height: undefined,
        width: undefined,
        left: undefined,
        timerId: null,
    }
  },
  mounted() {
    this.initialTop = this.getTop()
    // _windowScrollHandler 中的 this 是 window
    this.windowScrollHandler = this._windowScrollHandler.bind(this)
    window.addEventListener('scroll', this.windowScrollHandler)
  },
  // 不取消监听时，代码热更新（ webpack 会刷新页面更新的组件）控制台会看到报错，是因为旧的组件和新的组件都在监听window
  beforeDestroy () {
      window.removeEventListener('scroll', this.windowScrollHandler)
  },
  methods: {
    _windowScrollHandler() {
      let toDo = () => {
        if(window.scrollY > (this.initialTop - this.distance)) {
          // 获取固定之前的样式信息并设置给占位元素
          // 在最开始获取高度时，有图片获取不到真实高度，只是初始高度，所以在改变之前获取高度
          const {height, width, left} = this.$refs.wrapper.getBoundingClientRect()
          this.height = height + 'px'
          this.width = width + 'px'
          this.left = left + 'px'
          this.top = this.distance + 'px'

          this.fixed = true
        }else {
          this.height = undefined
          this.width = undefined
          this.left = undefined
          this.top = undefined

          this.fixed = false
        }
      }
      // 防抖，查看性能区别，区别不大可以不加
      if(this.timerId) {
        this.timerId = null
      }
      this.timerId = setTimeout(toDo, 10)
    },
    getTop() {
      // top 距离窗口的高度
      const {top} = this.$refs.wrapper.getBoundingClientRect()
      // 绝对高度
      return top + window.scrollY
    },
  }
 }
</script>

<style lang="scss" scoped>
.s-affix {
    &.fixed {
        position: fixed;
    }
}
</style>