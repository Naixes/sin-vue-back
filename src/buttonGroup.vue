<template>
    <div class="s-button-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    mounted() {
        // console.log(this.$el.children)
        for(let node of this.$el.children) {
            const name = node.nodeName.toLowerCase()
            if(name !== 'button') {
                console.warn(`s-button-group 的子元素应该是 button 而不是 ${name} `)
            }
        }
    }
}
</script>

<style lang="scss">
.s-button-group {
    display: inline-flex;
    vertical-align: middle;
    .s-button {
        border-radius: 0;
        &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }
        &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        // 防止边框重叠
        &:not(:first-child) {
            margin-left: -1px;
        }
        &:hover {
            z-index: 1;
        }
    }
}
</style>
