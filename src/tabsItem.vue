<template>
    <!-- data-name测试需要 -->
    <div class="s-tabs-item" @click="toggle" :class="classes" :data-name="name">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:"tabsItem",
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        name: {
            type: [String, Number],
            required: true,
        }
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        classes(){
            return {
                active: this.isActive,
                disabled: this.disabled
            }
        }
    },
    inject: ['eventBus'],
    created() {
        this.eventBus && this.eventBus.$on('update:selected', (name) => {
            if(this.name === name) {
                this.isActive = true
            }else {
                this.isActive = false
            }
        })
    },
    methods: {
        toggle() {
            // 不可用时不能点击
            if(this.disabled) return
            // 将自己传递出去用于获取自身位置
            this.eventBus.$emit('update:selected', this.name, this)
        }
    }
}
</script>

<style lang="scss" scoped>
$blue: blue;
$disabled-text-color: #aaa;
.s-tabs-item {
    display: flex; align-items: center;
    padding: 0 1em; height: 100%;
    .s-icon {
        margin-right: 5px;
    }
    // 选中样式
    &.active {
        .s-icon {
            fill: $blue;
        }
        font-weight: 600;
        color: $blue;
    }
    // 禁用样式
    &.disabled {
        color: $disabled-text-color;
        cursor: not-allowed;
    }
}
</style> 