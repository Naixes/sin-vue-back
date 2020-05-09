<template>
  <div class="s-slides">
    <div class="s-slides-window">
      <slot></slot>
      <div class="s-slides-arrow">
        <span class="s-slides-arrow-left">
          <s-icon name="left"></s-icon>
        </span>
        <span class="s-slides-arrow-right">
          <s-icon name="right"></s-icon>
        </span>
      </div>
    </div>
    <div class="s-slides-dots">
      <span :class="{active: selectedIndex === n-1}" v-for="n in itemsLength" :key="n">{{n}}</span>
    </div>
  </div>
</template>

<script>
import SIcon from './icon'
export default {
  components: {SIcon},
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
    },
    selectedIndex() {
      return this.names.indexOf(this._selected)
    }
  },
  mounted() {
    // 初始化子组件参数
    this.updateChildren()
    this.autoPlay && this.playAutomatically()
    this.itemsLength = this.items.length
  },
  data() {
    return {
      timerId: undefined,
      itemsLength: 0
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
  .s-slides {
    &-dots {
      display: flex;
      justify-content: center;
      >span {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: #333;
        width: 20px;
        height: 20px;
        background-color: #eee;
        border-radius: 50%;
        margin: 10px 10px;
        &:hover, &.active {
          cursor: pointer;
          color: #fff;
          background-color: #333;
        }
      }
    }
    &-window {
      background-color: #eee;
      position: relative;
      overflow: hidden;
      .s-slides-arrow {
        span {
          position: absolute;
          top: 50%;
          svg {
            fill: #aaa;
          }
          svg:hover {
            cursor: pointer;
            fill: #333;
          }
        }
        .s-slides-arrow-left { left: 0; }
        .s-slides-arrow-right { right: 0; }
      }
    }
  }
</style>