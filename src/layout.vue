<template>
    <div class="layout" :class="classList">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            classList: {
                // 子元素是否包含aside
                'has-aside': false
            }
        }
    },
    mounted() {
        // 检测子元素是否包含aside
        // console.log(this.$children)
        this.$children.forEach((vm) => {
            // console.log(vm.$options.name)
            if(vm.$options.name === 's-aside') {
                this.classList['has-aside'] = true
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.layout {
    display: flex;
    flex-direction: column;
    // 当为子元素时
    flex-grow: 1;
}
.has-aside {
    flex-direction: row;
}
</style>