<template>
    <div class="s-cascader">
        <!-- 触发器 -->
        <div class="s-cascader-trigger" @click="open = !open">
            <slot></slot>
        </div>
        <div v-if="open" class="s-cascader-list">
            <!-- 继续向下传递selected -->
            <s-cascader-item :sourceItem="source" :selected="selected" @update:selected="updateSelected"></s-cascader-item>
        </div>
    </div>
</template>
<script>
import SCascaderItem from './cascaderItem'
export default {
    components: {
        // 动态引入的组件，样式会不生效
        // SCascaderItem: () => import('./cascaderItem')
        's-cascader-item': SCascaderItem
    },
    props: {
        source: {
            type: Array,
            default: () => []
        },
        selected: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            open: false
        }
    },
    methods: {
        // 向下派发事件，子组件调用并传值
        updateSelected(newSelected) {
            console.log(this.$listeners)
            console.log('update newSelected', newSelected)
            this.$emit('update:selected', newSelected)
        }
    }
}
</script>

<style lang="scss" scoped>
</style> 