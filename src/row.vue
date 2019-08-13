<template>
    <!-- 抵消掉row两边的gutter -->
    <div class="s-row" :style="{marginLeft: -gutter / 2 + 'px', marginRight: -gutter / 2 + 'px'}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Row',
    props: {
        // 间距
        gutter: {
            type: [Number, String]
        }
    },
    // 向col传递gutter，需要用data接收
    mounted() {
        this.$children.forEach(vm => {
            vm.gutter = this.gutter
        })
    }
}
</script>

<style lang="scss" scoped>
.s-row {
    display: flex;
}
</style>
