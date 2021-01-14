<template>
  <div class="s-slides" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div class="s-slides-window">
      <slot></slot>
      <div class="s-slides-arrow">
        <span class="s-slides-arrow-left" @click="onClickPrev">
          <s-icon name="left"></s-icon>
        </span>
        <span class="s-slides-arrow-right" @click="onClickNext">
          <s-icon name="right"></s-icon>
        </span>
      </div>
    </div>
    <div class="s-slides-dots">
      <span :class="{active: selectedIndex === n-1}" v-for="n in itemsLength" :key="n" @click="select(n-1, selectedIndex > n-1)">{{n}}</span>
    </div>
  </div>
</template>

<script>
import SIcon from '../icon'
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
      default: 5000
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
      itemsLength: 0,
      startTouch: undefined,
      endTouch: undefined
    }
  },
  // updated() {
  //   console.log('updated')
  //   // 更新子组件
  //   this.updateChildren()
  // },
  beforeDestroy() {
    this.pause()
  },
  methods: {
    // 移动端
    onTouchStart(e) {
      console.log(e.changedTouches[0])
      this.pause()
      // 多个手指
      if(e.touches.length > 1) { return }
      this.startTouch = e.touches[0]
    },
    onTouchMove() {
    },
    onTouchEnd(e) {
      console.log(e.changedTouches[0])
      this.endTouch = e.changedTouches[0]
      let {clientX: startX, clientY: startY} = this.startTouch
      let {clientX: endX, clientY: endY} = this.endTouch
      let distance = Math.sqrt(Math.pow(endX-startX, 2) + Math.pow(endY-startY, 2))
      let distanceY = Math.abs(endY-startY)
      // rate越大越接近水平滑动
      let rate = distance / distanceY
      if(rate > 2) {
        let reverse = endX > startX
        if(reverse) {
          this.select(this.selectedIndex - 1 , reverse)
        }else {
          this.select(this.selectedIndex + 1 , reverse)
        }
      }
      this.$nextTick(() => {
        this.playAutomatically()
      })
    },
    // 左右箭头
    onClickPrev() {
      this.select(this.selectedIndex - 1, true)
    },
    onClickNext() {
      this.select(this.selectedIndex + 1, false)
    },
    onMouseEnter() {
      this.pause()
    },
    onMouseLeave() {
      this.playAutomatically()
    },
    playAutomatically() {
      // 使用setTimeout模拟setInterval
      if(this.timerId) { return }
      let run = () => {
        let index = this.names.indexOf(this._selected)
        let newIndex = index + 1
        // 更新当前项
        this.select(newIndex)
        this.timerId = setTimeout(run, this.autoPlayDelay)
      }
      this.timerId = setTimeout(run, this.autoPlayDelay)
    },
    select(newIndex, reverse) {
      let index = newIndex
      newIndex === this.names.length && (index = 0)
      newIndex === -1 && (index = this.names.length - 1)
      // 触发updated
      this.$emit("update:selected", this.names[index])
      // 更新子组件
      this.updateChildren(reverse)
    },
    updateChildren(reverse) {
      this.items.forEach(vm => {
        vm.reverse = reverse
        // !!!注意这里要使用nextTick
        this.$nextTick(() => {
          vm.selected = this._selected
        })
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