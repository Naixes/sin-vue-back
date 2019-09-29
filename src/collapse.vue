<template>
    <div class="s-collapse">
        <slot></slot>
    </div>
</template>
<script>
import Vue from 'Vue'
export default {
    props: {
        single: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Array,
            default: () => []
        }
    },
    provide() {
        return {
            eventBus: this.eventBus
        }
    },
    data() {
        return {
            eventBus: new Vue()
        }
    },
    mounted() {
        // 监听selected的增加和删除
        this.eventBus.$on('update:addSelect', select => {
            // 拷贝
            let selectedCopy = JSON.parse(JSON.stringify(this.selected))

            // 增加
            if(this.single) {
                selectedCopy = [select]
            }else {
                selectedCopy.push(select)
            }

            // 更新数据及视图
            this.updateAll(selectedCopy)
        })
        this.eventBus.$on('update:removeSelect', select => {
            // 拷贝
            let selectedCopy = JSON.parse(JSON.stringify(this.selected))
            
            // 删除
            let delIndex = selectedCopy.indexOf(select)
            selectedCopy.splice(delIndex, 1)

            // 更新数据及视图
            this.updateAll(selectedCopy)
        })
        // 初始化选中面板
        this.eventBus.$emit('update:initSelect', this.selected)
    },
    methods: {
        // 更新数据及视图
        updateAll(selected) {
            this.$emit('update:selected', selected)
            this.eventBus.$emit('update:initSelect', selected)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "var";

.s-collapse {
    border: 1px solid $border-color;
    border-radius: $border-radius;
}
</style> 