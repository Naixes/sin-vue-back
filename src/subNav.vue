<template>
  <div class="s-sub-nav" :class="{'active': opened || active, vertical}" v-click-outside="close">
      <!-- tab的标题 -->
      <div class="s-sub-nav-label" @click="open">
        <slot name="title"></slot>
        <span class="s-sub-nav-icon" :class="{opened}">
          <s-icon name="right"></s-icon>
        </span>
      </div>
      <template v-if="vertical">
        <transition @enter="enter" @leave="leave" @after-enter="afterEnter" @after-leave="afterLeave">
          <div class="s-sub-nav-popover" :class="{vertical}" v-show="opened">
              <slot></slot>
          </div>
        </transition>
      </template>
      <template v-else>
          <div class="s-sub-nav-popover" :class="{vertical}" v-show="opened">
              <slot></slot>
          </div>
      </template>
  </div>
</template>

<script>
import SIcon from './icon'
import ClickOutside from './click-outside'
export default {
  components: {SIcon},
  directives: {ClickOutside},
  name: '',
  // nav组件  
  inject: ['root', 'vertical'],
  props: {
      name: {
          type: String,
          required:true
      }
  },
  created() {
      this.root.addItems(this)
  },
  computed: {
    active: {
      get() {
        return this.root.namePath.includes(this.name)
      },
      set(val) {
        return val
      }
    }
  },
  data() { 
    return {
        opened: false
    }
  },
  methods: {
    enter(el, done) {
      let {height} = el.getBoundingClientRect()
      el.style.height = 0
      el.getBoundingClientRect()
      el.style.height = `${height}px`
      el.addEventListener('transitionend', () => {
        done()
      })
    },
    leave(el, done) {
      let {height} = el.getBoundingClientRect()
      el.style.height = `${height}px`
      el.getBoundingClientRect()
      el.style.height = 0
      el.addEventListener('transitionend', () => {
        done()
      })
    },
    afterEnter(el) {
        el.style.height = 'auto'
    },
    afterLeave(el) {
        el.style.height = 'auto'
    },
    close() {
      this.opened = false
    },
    open() {
      this.opened = !this.opened
    },
    updateNamePath() {
      this.root.namePath.unshift(this.name)
      this.$parent.updateNamePath && this.$parent.updateNamePath()
    }
  }
 }
</script>

<style lang="scss" scoped>
@import 'var';

.s-sub-nav {
  position: relative;
  cursor: pointer;
    &:not(.vertical).active::after {
      content: '';
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -1px;
      border-bottom: 1px solid $blue;
    }
  &-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }
  &-icon {
    transition: transform .5s;
    &.opened {
      transform: rotate(90deg);
    }
    .s-icon {
      width: 0.8em;
      height: 0.8em;
      margin: -1px 0.2em;
    }
  }
  &-popover {
    // 动画
    transition: height 250ms;
    z-index: 1;
    margin-top: 2px;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    font-size: $font-size;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 100%;
    &.vertical {
      // 动画
      overflow: hidden;
      position: static;
      border: 0;
      border-radius: 0;
      filter: none;
    }
    .s-nav-item {
      white-space: nowrap;
      color: $color;
    }
  }
}

// popover中的样式
// popover里的nav-item
.s-sub-nav-popover .s-nav-item {
  width: 100%;
  // 取消nav-item下划线
  &.active::after {
    display: none;
  }
  &.active {
    background-color: $background-selected-color;
  }
}
// popover里的sub-nav
.s-sub-nav-popover:not(.vertical) .s-sub-nav {
  // 取消sub-nav下划线，这里的&代表.s-sub-nav
  &.active::after {
    display: none;
  }
  &-label {
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  &-popover {
    left: 100%;
    top: 0;
    margin-left: 4px;
  }
}
</style>