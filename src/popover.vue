<template>
    <!-- 禁止冒泡 -->
    <div class="s-popover" @click="toggle" ref="popover">
        <!-- 弹出内容 -->
        <div ref="contentWrapper" class="s-popover-content-wrapper" v-if="visible">
            <slot name="content"></slot>
        </div>
        <!-- 默认插槽 -->
        <div ref="triggerWrapper" class="trigger-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false
        }
    },
    methods: {
        toggle(e) {
            // 点击的是触发器
            if(this.$refs.triggerWrapper.contains(e.target)) {
                if(this.visible) {
                    this.close()
                }else {
                    this.open()
                }
            }
        },
        open() {
            this.visible = true
            this.$nextTick(() => {
                // 显示弹框内容
                this.appendPopover()
                // 监听外部点击事件
                document.addEventListener('click', this.clickHandle)
            })
        },
        appendPopover() {
            // 为了防止外部容器有overflow: hidden导致不能弹出内容，手动添加dom
            document.body.appendChild(this.$refs.contentWrapper)
            // 改变弹出位置
            let {left, top, width, height} = this.$refs.triggerWrapper.getBoundingClientRect()
            // 不受滚动的影响
            this.$refs.contentWrapper.style.left = left + screenX + 'px'
            this.$refs.contentWrapper.style.top = top + scrollY + 'px'
        },
        clickHandle(e) {
            // 点击自身，直接返回
            if(this.$refs.popover && this.$refs.popover.contains(e.target) || this.$refs.popover === e.target) {
                return
            }
            // 解除监听
            this.close()
        },
        close() {
            this.visible = false
            document.removeEventListener('click', this.clickHandle)
        }
        // toggle() {
        //     this.visible = !this.visible
        //     // 点击外部关闭，避免点开后立刻关闭使用nexttick
        //     if(this.visible) {
        //         this.$nextTick(() => {
        //             // 为了防止外部容器有overflow: hidden导致不能弹出内容，手动添加dom
        //             document.body.appendChild(this.$refs.contentWrapper)
        //             // 改变弹出位置
        //             let {left, top, width, height} = this.$refs.triggerWrapper.getBoundingClientRect()
        //             // 不受滚动的影响
        //             this.$refs.contentWrapper.style.left = left + screenX + 'px'
        //             this.$refs.contentWrapper.style.top = top + scrollY + 'px'
        //             let clickHandle = () => {
        //                 this.visible = false
        //                 // 解除绑定
        //                 document.removeEventListener('click', clickHandle)
        //             }
        //             document.addEventListener('click', clickHandle)
        //         })
        //     }
        // }
    }
}
</script>

<style lang="scss" scoped>
.s-popover {
    display: inline-block;
    position: relative;
}
.s-popover-content-wrapper {
    // height: fit-content; // 防止绝对定位后没有高度
    position: absolute; bottom: 100%; left: 0; height: fit-content;
    border: 1px solid red;
    box-shadow: 0 0 3px rgba(0, 0, 0, .5);
    transform: translateY(-100%);
}
</style>