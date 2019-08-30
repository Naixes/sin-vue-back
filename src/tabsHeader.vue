<template>
    <div class="s-tabs-header">
        <slot></slot>
        <!-- 下方滑动横线 -->
        <div class="s-tabs-line" ref="line"></div>
    </div>
</template>
<script>
export default {
    name: 'tabsHeader',
    inject: ['eventBus'],
    mounted() {
        this.eventBus.$on('update:selected', (name, vm) => {
            // 设置下方滑块位置
            let left = vm.$el.offsetLeft
            let width = vm.$el.clientWidth
            // let {width, left} = vm.$el.getBoundingClientRect()
            this.$refs.line.style.width = width + 'px'
            this.$refs.line.style.left = left + 'px'
        })
    }
}
</script>

<style lang="scss" scoped>
$blue: blue;
$tabs-height: 40px;
$tabs-border-color: #ccc;
.s-tabs-header {
    display: flex; align-items: center;
    height: $tabs-height;
    position: relative;
    border-bottom: 1px solid $tabs-border-color;
    .s-tabs-line {
        position: absolute; bottom: -1px;
        width: 80px;
        border-bottom: 1px solid $blue;
    }
}
</style> 