<template>
    <div class="s-cascader">
        <!-- 触发器 -->
        <div class="s-cascader-trigger" @click="open = !open">
            <!-- <slot :value="result"></slot> -->
            {{result}}
        </div>
        <div v-if="open" class="s-cascader-list">
            <!-- 继续向下传递selected -->
            <s-cascader-item
                :sourceItem="source"
                :selected="selected" 
                :height="popWidth"
                @update:selected="updateSelected"
            ></s-cascader-item>
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
        },
        popWidth: {
            type: String
        }
    },
    data() {
        return {
            open: false
        }
    },
    computed: {
        result() {
            // 拼接已选择项
            return this.selected.map(ele => ele.name).join('/')
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
@import "var";

.s-cascader-trigger {
    height: $input-height;
    min-width: 10em;
    padding: 0 1em;
    display: inline-flex;
    align-items: center;
    border: 1px solid $border-color;
	border-radius: $button-radius;
}
</style> 