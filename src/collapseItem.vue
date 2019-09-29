<template>
    <div class="s-collapse-item">
        <div class="s-collapse-title" @click="toggle">{{title}}</div>
        <div v-if="open" class="s-collapse-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            open: false
        }
    },
    inject: ['eventBus'],
    mounted() {
        // 根据数据初始化选项
        this.eventBus && this.eventBus.$on('update:initSelect', name => {
            if(name.indexOf(this.name) < 0) {
                this.close()
            }else {
                this.show()
            }
        })
    },
    methods: {
        toggle() {
            if(this.open) {
                // 删除点击的对象
                this.eventBus && this.eventBus.$emit('update:removeSelect', this.name)
            }else {
                // 增加点击的对象
                this.eventBus && this.eventBus.$emit('update:addSelect', this.name)
            }
        },
        close() {
            this.open = false
        },
        show() {
            this.open = true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "var";

.s-collapse-item {
    >.s-collapse-title {
        border-bottom: 1px solid $border-color;
        padding: .5em 1em;
    }
    >.s-collapse-content {
        padding: .5em 2em;
    }
    // 最后一个内容没有下边框
    &:not(:last-child) {
        >.s-collapse-content {
            border-bottom: 1px solid $border-color;
        }
    }
    &:last-child {
        // 最后一个元素并且它的最后一个子元素是标题
        >.s-collapse-title:last-child {
            // 取消下边框
            border-bottom: none;
        }
    }
}
</style> 