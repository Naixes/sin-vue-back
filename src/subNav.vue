<template>
  <div class="s-sub-nav">
      <!-- tab的标题 -->
      <div class="s-sub-nav-title" :class="{active}" @click="open">
        <slot name="title"></slot>
      </div>
      <div class="s-sub-nav-popover" v-show="opened">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
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
        // 是否选中，父组件更改
        active: false,
        opened: false
    }
  },
  methods: {
      open() {
        this.opened = !this.opened
      }
  }
 }
</script>

<style lang="scss" scoped>
@import 'var';

.s-sub-nav {
  position: relative;
  display: inline-block;
  cursor: pointer;
  &-title {
    padding: 20px;
    &.active::after {
        content: '';
        width: 100%;
        position: absolute;
        left: 0;
        bottom: -1px;
        border-bottom: 1px solid $blue;
    }
  }
  &-popover {
    position: absolute;
    left: 0;
    top: 100%;
  }
}
</style>