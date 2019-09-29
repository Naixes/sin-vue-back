<template>
    <div class="s-cascader-item">
        <!-- 左右布局 -->
        <div class="s-cascader-left">
            <div
                v-for="(item, index) in sourceItem"
                :key="index"
                @click="select(item)"
            >
                {{item.name}}
            </div>
        </div>
        <div v-if="rightItem" class="s-cascader-right">
            <!-- 递归组件 -->
            <cascader-item :sourceItem="rightItem">
            </cascader-item>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CascaderItem',
    props: {
        sourceItem: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        rightItem() {
            return this.leftSelected.children
        }
    },
    data() {
        return {
            leftSelected: ''
        }
    },
    methods: {
        select(item) {
            this.leftSelected = item
        }
    }
}
</script>

<style lang="scss" scoped>
.s-cascader-item {
    display: flex;
}
</style> 