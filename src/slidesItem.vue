<template>
  <transition name="slide">
    <div class="s-slides-item" v-if="visible" :class="{reverse: reverse}">
        <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SlidesItem',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    visible() {
      return this.selected === this.name
    }
  },
  data() { 
    return {
      // 由父组件修改
      selected: undefined,
      // 控制动画方向，由父组件修改
      reverse: false
    }
  }
 }
</script>

<style lang="scss" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-leave-active {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    height: 100%;
  }
  .slide-enter {
    transform: translateX(100%) ;
  }
  .slide-leave-to {
    transform: translateX(-100%) ;
  }
  .slide-enter.reserve {
    transform: translateX(-100%) ;
  }
  .slide-leave-to.reserve {
    transform: translateX(100%) ;
  }
</style>