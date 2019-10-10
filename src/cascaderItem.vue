<template>
    <div class="s-cascader-wrapper" :style="{height: height}">
        <!-- 左右布局 -->
        <ul class="s-cascader-left">
            <li
                class="s-cascader-item"
                v-for="(item, index) in sourceItem"
                :key="index"
                @click="select(item)"
            >
                {{item.name}}
                <s-icon
                    v-if="item.children"
                    class="s-cascader-arrow"
                    name="right"
                ></s-icon>
            </li>
        </ul>
        <div v-if="rightItem" class="s-cascader-right">
            <!-- 递归组件 -->
            <cascader-item
                :sourceItem="rightItem"
                :selected="selected" 
                :level="level+1"
                @update:selected="updateSelected"
            >
            </cascader-item>
        </div>
    </div>
</template>
<script>
import Icon from './icon'

export default {
    name: 'CascaderItem',
	components: {
		's-icon': Icon
	},
    props: {
        height: {
            type: String,
            default: "200px"
        },
        sourceItem: {
            type: Array,
            default: () => []
        },
        selected: {
            type: Array,
            default: () => []
        },
        level: {
            type: Number,
            default: 0
        }
    },
    computed: {
        // 计算出子组件显示的内容
        rightItem() {
            // if(this.leftSelected && this.leftSelected.children) {
            //     return this.leftSelected.children
            // }
            let current = this.selected[this.level]
            if(current && current.children) {
                return current.children
            }
            return null
        }
    },
    data() {
        return {
            // leftSelected: ''
        }
    },
    methods: {
        // 触发更新
        select(item) {
            // 拷贝已选择项
            let copy = JSON.parse(JSON.stringify(this.selected))
            // 将当前项添加到对应索引下
            copy[this.level] = item
            // 重新选择时删除多余的选项
            copy.splice(this.level + 1)
            // 更新当前选中项
            // this.leftSelected = item
            this.$emit('update:selected', copy)
        },
        // 如果有子组件继续往下派发事件
        updateSelected(newSelected) {
            this.$emit('update:selected', newSelected)
        }
    }
}
</script>

<style lang="scss">
@import "var";

.s-cascader-wrapper {
    display: flex;
    .s-cascader-left {
        padding: .3em 0;
        border: 1px solid $border-color;
        border-radius: $button-radius;
    }
    .s-cascader-item {
        padding: .3em 1em;
        display: flex;
        align-items: center;
        .s-cascader-arrow {
            transform: scale(.5)
        }
    }
}
</style> 