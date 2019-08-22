<template>
    <div class="s-toast">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="scss" scoped>
    $toast-font-size: 14px;
    $toast-background-color: #ccc;
    $toast-color: #fff;
    .s-toast {
        font-size: $toast-font-size;
        position: fixed;
        display: flex;
        align-items: center;
        padding: 20px;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        color: $toast-color;
        background-color: $toast-background-color;
    }
</style>