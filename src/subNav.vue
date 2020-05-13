<template>
  <div class="s-sub-nav" :class="{active: opened}" v-click-outside="close">
      <!-- tab的标题 -->
      <span class="s-sub-nav-label" @click="open">
        <slot name="title"></slot>
        <span class="s-sub-nav-icon" :class="{opened}">
          <s-icon name="right"></s-icon>
        </span>
      </span>
      <div class="s-sub-nav-popover" v-show="opened">
          <slot></slot>
      </div>
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
  inject: ['root'],
  props: {
      name: {
          type: String
      }
  },
  created() {
      this.root.addItems(this)
  },
  data() { 
    return {
        opened: false
    }
  },
  methods: {
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
  padding: 10px 20px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  &.active::after {
      content: '';
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -1px;
      border-bottom: 1px solid $blue;
  }
  &-icon {
    position: absolute;
    top: 12px;
    transition: transform .5s;
    &.opened {
      transform: rotate(90deg);
    }
    .s-icon {
      width: 0.8em;
      height: 0.8em;
    }
  }
  &-popover {
    z-index: 1;
    margin-top: 2px;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 100%;
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
.s-sub-nav-popover .s-sub-nav {
  // 取消sub-nav下划线，这里的&代表.s-sub-nav
  &.active::after {
    display: none;
  }
  &-label {
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  &-icon {
    position: relative;
    top: 2px;
  }
  &-popover {
    left: 100%;
    top: 0;
    margin-left: 4px;
  }
}
</style>