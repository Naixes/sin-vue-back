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
    }
  },
  computed: {
    // 子组件数组
    items() {
      return this.$children.filter(vm => vm.$options.name === 'SlidesItem')
    },
    // 当前的选中的
    _selected(){
      return this.selected || this.items[0].name
    }
  },
  mounted() {
    // 初始化子组件参数
    this.items.forEach(vm => {
      vm.selected = this._selected
    });
  },
  data() {
    return {

    }
  },
  methods: {
    getSelected() {
    }
  }
 }
</script>

<style lang="scss" scoped>
  .g-slides {
    border: 1px solid black;
  }
</style>