<template>
    <!-- 禁止冒泡 -->
    <div class="s-popover" @click.stop="toggle">
        <div class="content-wrapper" v-if="visible" @click.stop>
            <slot name="content"></slot>
        </div>
        <slot></slot>
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
        toggle() {
            this.visible = !this.visible
            // 点击外部关闭，避免点开后立刻关闭使用nexttick
            if(this.visible) {
                this.$nextTick(() => {
                    let clickHandle = () => {
                        this.visible = false
                        // 解除绑定
                        document.removeEventListener('click', clickHandle)
                    }
                    document.addEventListener('click', clickHandle)
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.s-popover {
    display: inline-block;
    position: relative;
    .content-wrapper {
        position: absolute; bottom: 100%; left: 0;
        border: 1px solid red;
        box-shadow: 0 0 3px rgba(0, 0, 0, .5)
    }
}
</style>