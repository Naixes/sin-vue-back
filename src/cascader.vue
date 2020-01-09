<template>
    <div class="s-cascader" v-click-outside="close">
        <!-- 触发器 -->
        <div class="s-cascader-trigger" @click="toggle">
            <span>{{result}}</span>
        </div>
        <div v-if="popVisible" class="s-cascader-wrapper">
            <!-- 继续向下传递selected -->
            <s-cascader-item
                :sourceItem="source"
                :height="height"
                :selected="selected" 
				:loadSource="loadSource"
                :loadingName="loadingItemName"
                @update:selected="updateSelected"
            ></s-cascader-item>
        </div>
    </div>
</template>
<script>
import SCascaderItem from './cascaderItem'
import clickOutside from './click-outside.js'
export default {
    components: {
        // 动态引入的组件，样式会不生效
        // SCascaderItem: () => import('./cascaderItem')
        's-cascader-item': SCascaderItem
    },
    directives: {
        clickOutside
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
        height: {
            type: String
        },
        loadSource: {
            type: Function
        }
    },
    data() {
        return {
            popVisible: false,
            loadingItemName: null
        }
    },
    computed: {
        result() {
            // 拼接已选择项
            return this.selected.map(ele => ele.name).join('/')
        }
    },
    methods: {
        // onclickDocument(e) {
        //     console.log('onclickDocument')
        //     let {cascader} = this.$refs
        //     let {target} = e
        //     if(cascader === target || cascader.contains(target)) {
        //         return
        //     }
        //     this.close()
        // },
        // open() {
        //     this.popVisible = true
        //     document.addEventListener('click', this.onclickDocument)
        //     // 不知道有啥用
        //     // this.$nextTick(() => {
        //     //     document.addEventListener('click', this.onclickDocument)
        //     // })
        // },
        // close() {
        //     this.popVisible = false
        //     document.removeEventListener('click', this.onclickDocument)
        // },
        // toggle() {
        //     if(this.popVisible) {
        //         this.close()
        //     }else {
        //         this.open()
        //     }
        // },
        close() {
            this.popVisible = false
        },
        toggle() {
            this.popVisible = !this.popVisible
        },
        updateSelected(newSelected) {
            // 判断是否动态数据
            if(this.loadSource) {
                // 通知父组件更新source
                // 当前点击的元素
                let lastSelected = newSelected[newSelected.length - 1]
                // 设置要loading的元素name
                this.loadingItemName = lastSelected.isLeaf ? '' : lastSelected.name
                // 查找到要添加的元素
                // 叶子节点不用查询
                if(!lastSelected.isLeaf) {
                    // 查询children内容，拼接新的source，通知父组件更新source
                    this.loadSource(lastSelected.id, (result) => {
                        // 数据获取完成之后删除loading元素
                        this.loadingItemName = null
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
            }

            // 通知上级更新selected
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
                        }
                        return undefined
                    }
                }
            }
            let findChildren = (item, id) => {
                return item.filter(ele => {
                    return ele.id === id
                })[0]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "var";

.s-cascader {
    // 点击外部关闭需要
    display: inline-block;
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