<template>
  <div class="g-slides">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    selected: {
      type: String
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    autoPlayDelay: {
      type: Number,
      default: 1000
    }
  },
  computed: {
    // 子组件数组
    items() {
      return this.$children.filter(vm => vm.$options.name === 'SlidesItem')
    },
    // name数组
    names() {
      return this.items.map(vm => vm.name)
    },
    // 当前的选中的name
    _selected(){
      return this.selected || this.items[0].name
    }
  },
  mounted() {
    // 初始化子组件参数
    this.updateChildren()
    this.autoPlay && this.playAutomatically()
  },
  data() {
    return {
      timerId: undefined
    }
  },
  updated() {
    // 更新子组件
    this.updateChildren()
  },
  beforeDestroy() {
    this.pause()
  },
  methods: {
    playAutomatically() {
      // 使用setTimeout模拟setInterval
      if(this.timerId) { return }
      let run = () => {
        console.log('run')
        let index = this.names.indexOf(this._selected)
        let newIndex = index + 1
        // 更新当前项
        this.select(newIndex)
        this.timerId = setTimeout(run, this.autoPlayDelay)
      }
      this.timerId = setTimeout(run(), this.autoPlayDelay)
    },
    select(newIndex) {
      // 触发updated
      this.$emit("update:selected", this.names[newIndex])
    },
    updateChildren() {
      this.items.forEach(vm => {
        vm.selected = this._selected
      });
    },
    pause() {
      window.clearTimeout(this.timerId)
      this.timerId = undefined
    }
  }
 }
</script>

<style lang="scss" scoped>
  .g-slides {
    border: 1px solid black;
    position: relative;
    overflow: hidden;
  }
</style>