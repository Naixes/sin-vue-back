<template>
  <div class="s-nav" :class="{vertical}">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  // 向子组件提供本组件实例，由于子组件有多种并且有嵌套关系所以选择使用provide  
  provide() {
      return {
        root: this,
        vertical: this.vertical
      }
  },
  props: {
      selected: {
          type: Array
      },
      vertical: {
          type: Boolean,
          default: false
      }
  },
  data() { 
    return {
        // 子组件数组
        items: [],
        // 当前选择的路径，在item组件中更改
        namePath: []
    }
  },
  mounted() {
      this.updateChilren()
      this.addListenerToChildren()
  },
  updated() {
      this.updateChilren()
  },
  methods: {
      // 给子组件注册事件
      addListenerToChildren() {
          this.items.forEach(vm => {
              vm.$on("add:selected", (name) => {
                  this.$emit("update:selected", [name])
              })
          })
      },
      // 更新子组件状态  
      updateChilren() {
          this.items.forEach(vm => {
            vm.active = this.selected.indexOf(vm.name) >= 0
          });
      },
      // 子组件调用  
      addItems(vm) {
          this.items.push(vm)
      }
  }
 }
</script>

<style lang="scss" scoped>
@import '../var';

.s-nav {
    display: flex;
    border-bottom: 1px solid $border-color;
    // 垂直模式
    &.vertical {
        background-color: $background-color-lighter;
        border: 1px solid $border-color;
        flex-direction: column;
    }
}
</style>