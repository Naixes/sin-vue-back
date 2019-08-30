<template>
    <div class="s-tabs" :class="classes">
        <slot></slot>
    </div>
</template>
<script>
import Vue from 'vue'

export default {
    props: {
        direction: {
            type: String,
            default: 'horizontal',
            validator(value) {
                return ['horizontal', 'vertical'].indexOf(value) > -1
            }
        },
        selected: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            // provide中的eventBus不能直接访问
            eventBus: new Vue(),
            classes: {
                vertical: this.direction === "vertical"
            }
        }
    },
    provide() {
        return {
            eventBus: this.eventBus
        }
    },
    mounted() {
        this.$children.forEach(childVm => {
            // 选中指定选项
            if(childVm.$options.name === 'tabsHeader') {
                childVm.$children.forEach(childVm => {
                    if(childVm.$options.name === 'tabsItem' && childVm.name === this.selected) {
                        // 将选中的子组件传递出去，方便修改样式
                        this.eventBus.$emit('update:selected', this.selected, childVm)
                    }
                })
            }
        })
    }
}
</script>
<style lang="scss" scoped>
.s-tabs {
    &.vertical {
        
    }
}
</style>