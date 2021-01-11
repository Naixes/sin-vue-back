<template>
  <div class="s-affix" :class="{fixed}" ref="wrapper" :style="{top}">
      <slot></slot>
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
        top: undefined,
        fixed: false
    }
  },
  mounted() {
      window.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy () {
      window.removeEventListener('scroll', this.windowScrollHandler)
  },
  methods: {
      scrollHandler() {
          let {top} = this.$refs.wrapper.getBoundingClientRect()
          console.log('window.scrollY', window.scrollY)
          console.log('top', top)
          console.log(top - this.distance)
          if(window.scrollY > top - this.distance) {
            //   this.top = this.distance
            this.fixed = true
          }else {
            //   this.top = undefined
            this.fixed = false
          }
      }
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