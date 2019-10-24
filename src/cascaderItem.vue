<template>
    <div class="s-cascader-list" :style="{height: height}">
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
                    v-if="arrowVisible(item)"
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
				:loadSource="loadSource"
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
        },
        loadSource: {
            type: Function
        }
    },
    computed: {
        // 计算出子组件显示的内容
        rightItem() {
            // 这样写右边不会更新，因为它依赖selected和level，选择地区时会触发两次更新，一次selected一次source，而第二次更新它的依赖没有变化所以没有更新
            // let current = this.selected[this.level]
            // if(current && current.children) {
            //     return current.children
            // }
            // return null

            // 改为依赖source
            if(this.selected[this.level]) {
                // 获取当前选择项
                let current = this.sourceItem.filter(ele => ele.name === this.selected[this.level].name)
                // console.log(current)
                // 返回当前选择项的children
                if(current[0] && current[0].children && current[0].children.length > 0) {
                    return current[0].children
                }
            }
        }
    },
    data() {
        return {
            // leftSelected: ''
        }
    },
    methods: {
        arrowVisible(item) {
            return this.loadSource ? !item.isLeaf : item.children
        },
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

.s-cascader-list {
    display: flex;
    .s-cascader-left {
        padding: .3em 0;
        overflow: auto;
    }
    .s-cascader-right {
        border-left: 1px solid $border-color-lighter;
    }
    .s-cascader-item {
        padding: .3em 1em;
        display: flex;
        align-items: center;
        user-select: none;
        &:hover {
            cursor: pointer;
            background-color: $background-hover-color;
        }
        .s-cascader-arrow {
            // 将箭头对齐
            margin-left: auto;
            transform: scale(.5)
        }
    }
}
</style> 