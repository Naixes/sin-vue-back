<template>
    <div class="s-toast-wrapper" :class="toastClasses">
        <div class="s-toast">
            <div class="s-toast-text">
                <slot v-if="!html"></slot>
                <div v-else v-html="html"></div>
            </div>
            <div class="s-toast-close" v-if="buttonText" @click="clickClose">
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
            // 表示默认延迟时间为两秒
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
        },
        afterClose: {
            type: Function,
            default: () => {}
        },
        html: {
            type: String,
            default: ''
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
            this.$emit('close')
            this.$destroy()
        },
        clickClose() {
            this.close()
            this.afterClose()
        }
    }
}
</script>

<style lang="scss" scoped>
@import "var";

// 动画
@keyframes slide-down {
    0% {opacity: 0; transform: translateY(-100%)}
    100% {opacity: 1; transform: translateY(0%)}
}
@keyframes slide-up {
    0% {opacity: 0; transform: translateY(100%)}
    100% {opacity: 1; transform: translateY(0%)}
}
@keyframes fade {
    0% {opacity: 0;}
    100% {opacity: 1;}
}
$animation-duration: 1.5s;

.s-toast-wrapper {
    font-size: $toast-font-size;
    position: fixed; left: 50%;

    .s-toast {
        display: flex; align-items: center;
        background-color: $toast-background-color;
        color: $toast-color; border-radius: $toast-border-radius;
    }

    &.position-top {
        top: 0; transform: translateX(-50%);
        // 给同一个元素添加两次transform会有问题：这里分别给两个元素添加transform
        .s-toast {
            border-top-left-radius: 0; border-top-right-radius: 0;
            animation: slide-down $animation-duration;
        }
    }

    &.position-middle {
        top: 50%; transform: translateX(-50%) translateY(-50%);
        .s-toast {
            animation: fade $animation-duration;
        }
    }

    &.position-bottom {
        bottom: 0; transform: translateX(-50%);
        .s-toast {
            border-bottom-left-radius: 0; border-bottom-right-radius: 0;
            animation: slide-up $animation-duration;
        }
    }

    .s-toast-text {
        // max-width: 360px; min-width: 150px;
        padding: 5px 15px;
        border-right: 1px solid #fff;
    }

    .s-toast-close {
        // 防止换行
        // flex-shrink: 0; // 会使边框出现问题
        white-space: nowrap;
        padding: 5px 8px;
        cursor: pointer; 
    }
}
</style>