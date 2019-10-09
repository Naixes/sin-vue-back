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
</style> 