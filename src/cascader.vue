<template>
    <div class="s-cascader">
        <!-- 触发器 -->
        <div class="s-cascader-trigger" @click="open = !open">
            <span>{{result}}</span>
        </div>
        <div v-if="open" class="s-cascader-wrapper">
            <!-- 继续向下传递selected -->
            <s-cascader-item
                :sourceItem="source"
                :height="popWidth"
                :selected="selected" 
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
        },
        loadSource: {
            type: Function,
            default: () => {}
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
        updateSelected(newSelected) {
            // 通知父组件更新source
            // 查找到要添加的元素
            let lastSelected = newSelected[newSelected.length - 1]
            // 叶子节点不用查询
            if(!lastSelected.isLeaf) {
                // 查询children内容，拼接新的source，通知父组件更新source
                this.loadSource(lastSelected.id, (result) => {
                    let copy = JSON.parse(JSON.stringify(this.source))
                    // 获取当前选中项
                    let needUpdatedSource = getSource(copy, lastSelected.id)
                    // 拼接children
                    if(needUpdatedSource && result.length > 0) {
                        needUpdatedSource.children = result
                        // 通知更新
                        this.$emit('update:source', copy)
                    }
                })
            }

            // 向下派发事件，子组件调用并传值
            this.$emit('update:selected', newSelected)

            // 自定义方法
            // 递归寻找当前选中项：广度优先遍历
            let getSource = (source, id) => {
                // 将source分为两组
                let noChildren = []
                let hasChildren = []
                source.forEach(ele => {
                    if(ele.children) {
                        hasChildren.push(ele)
                    }else {
                        noChildren.push(ele)
                    }
                });
                // 先在noChildren中寻找
                let found = findChildren(noChildren, id)
                if(found) {
                    // 找到了就返回
                    return found
                }else {
                    // 在另一组中查找
                    let found = findChildren(hasChildren, id)
                    if(found) {
                        // 找到了就返回
                        return found
                    }else {
                        // 循环下一层
                        for(let i = 0; i < hasChildren.length; i++) {
                            found = getSource(hasChildren[i].children, id)
                            if(found) {
                                return found
                            }
                            return undefined
                        }
                    }
                }
            }
            let findChildren = (item, id) => {
                return item.filter(ele => ele.id === id)[0]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "var";

.s-cascader {
    position: relative;
    .s-cascader-trigger {
        height: $input-height;
        min-width: 10em;
        padding: 0 1em;
        display: inline-flex;
        align-items: center;
        border: 1px solid $border-color;
        border-radius: $button-radius;
    }
    .s-cascader-wrapper {
        display: flex;
        position: absolute;
        background-color: #fff;
        top: 100%;
        margin-top: 4px;
        @extend .box-shadow
    }
}
</style> 