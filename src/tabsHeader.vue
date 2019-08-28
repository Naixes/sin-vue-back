<template>
    <div class="s-tabs-header">
        <slot></slot>
        <div class="s-tabs-line"></div>
    </div>
</template>
<script>
export default {
    inject: ['eventBus'],
    created() {
        this.eventBus.$emit('update:selected', 'header')
    }
}
</script>

<style lang="scss" scoped>
$blue: blue;
$tabs-height: 40px;
.s-tabs-header {
    display: flex; align-items: center;
    height: $tabs-height;
    position: relative;
    border-bottom: 2px solid #ccc;
    .s-tabs-line {
        position: absolute; bottom: 0;
        width: 100px;
        border-bottom: 2px solid $blue;
    }
}
</style> 