<template>
    <div class="s-popover" @click="toggle">
        <div class="content-wrapper" v-if="visible">
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