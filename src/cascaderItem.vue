<template>
    <div class="s-cascader-item">
        {{sourceItem.name}}
        <template v-if="sourceItem.children">
            <cascader-item
                v-for="(item, index) in sourceItem.children"
                :key="index"
                :sourceItem="item"
            >
            </cascader-item>
        </template>
    </div>
</template>
<script>
export default {
    name: 'CascaderItem',
    props: {
        sourceItem: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="scss" scoped>
.s-cascader-item {
}
</style> 