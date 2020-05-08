<template>
  <div class="g-slides-item" v-if="visible">
      <slot></slot>
  </div>
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
      selected: undefined
    }
  }
 }
</script>

<style lang="scss" scoped>
  .g-slides-item {
  }
</style>