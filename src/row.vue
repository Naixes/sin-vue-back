<template>
    <div class="s-row">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Row'
}
</script>

<style lang="scss" scoped>
.s-row {
    display: flex;
}
</style>
