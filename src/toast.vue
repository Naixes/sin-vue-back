<template>
    <div class="s-toast-wrapper" :class="toastClasses">
        <div class="s-toast">
            <div class="s-toast-text">
                <slot></slot>
            </div>
            <div class="s-toast-close" v-if="!autoClose" @click="close">
                <span class="toast-close-text">{{buttonText}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        autoClose: {
            type: Boolean,
            default: true
        },
        delay: {
            type: Number,
            // 表示延迟时间为两秒
            default: 2
        },
        buttonText: {
            type: String,
            default: '关闭'
        },
        position: {
            type: String,
            default: 'top',
            validator(val) {
                return ['top', 'middle', 'bottom'].indexOf(val) > -1
            }
        }
    },
    computed:{
        toastClasses() {
            return {
                [`position-${this.position}`] : true
            }
        } 
    },
    data() {
        return {
        }
    },
    mounted() {
        // 自动关闭
        if(this.autoClose) {
            setTimeout(() => {
                this.close()
            }, this.delay*1000)
        }
    },
    methods: {
        close() {
            this.$el.remove()
            this.$destroy()
        }
    }
}
</script>

<style lang="scss" scoped>
    $toast-font-size: 14px;
    $toast-background-color: #aaa;
    $toast-color: #fff;
    $toast-border-radius: 4px;
    .s-toast-wrapper {
        font-size: $toast-font-size;

        position: fixed;
        left: 50%;

        color: $toast-color;
        background-color: $toast-background-color;
        border-radius: $toast-border-radius;

        .s-toast {
            display: flex;
            align-items: center;
        }

        &.position-top {
            top: 0;
            transform: translateX(-50%);
        }

        &.position-middle {
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
        }

        &.position-bottom {
            bottom: 0;
            transform: translateX(-50%);
        }

        .s-toast-text,
        .s-toast-close {
            padding: 5px 15px;
        }

        .s-toast-close {
            cursor: pointer;
        }

        .s-toast-close {
            border-left: 1px solid #fff;
        }
    }
</style>