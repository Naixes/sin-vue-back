<template>
    <!-- 抵消掉row两边的gutter -->
    <div class="s-row" :style="rowStyle">
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
    data() {
        return {
        }
    },
    // 写在data中时只会读取一次，要通过计算属性
    computed: {
        rowStyle() {
            return {
                marginLeft: -this.gutter / 2 + 'px',
                marginRight: -this.gutter / 2 + 'px'
            }
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
