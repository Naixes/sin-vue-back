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
        }
    },
    data() {
        return {
            open: false
        }
    },
    inject: ['eventBus'],
    mounted() {
        this.eventBus && this.eventBus.$on('update:selected', vm => {
            if(vm != this) {
                this.close()
            }
        })
    },
    methods: {
        toggle() {
            console.log(this.open)
            if(this.open) {
                this.close()
            }else {
                this.open = true
                this.eventBus && this.eventBus.$emit('update:selected', this)
            }
        },
        close() {
            this.open = false
        }
    }
}
</script>

<style lang="scss" scoped>
$border-color: #999;
$border-radius: 4px;
.s-collapse-item {
    >.s-collapse-title {
        border-bottom: 1px solid $border-color;
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