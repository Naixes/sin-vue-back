<template>
    <div class="s-cascader">
        <!-- 触发器 -->
        <div class="s-cascader-trigger" @click="open = !open">
            <slot></slot>
        </div>
        <div v-if="open" class="s-cascader-list">
            <s-cascader-item :sourceItem="source"></s-cascader-item>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        SCascaderItem: () => import('./cascaderItem')
    },
    props: {
        source: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            open: false
        }
    }
}
</script>

<style lang="scss" scoped>
.s-cascader {
    background-color: red;
}
</style> 