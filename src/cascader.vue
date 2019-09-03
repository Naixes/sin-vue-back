<template>
    <div class="s-cascader">
        <div class="s-cascader-trigger" @click="open = !open">
            <slot></slot>
        </div>
        <div v-if="open" class="s-cascader-list">
            <div v-for="(item, index) in source" :key="index">
                <s-cascader-item :sourceItem="item"></s-cascader-item>
            </div>
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
}
</style> 