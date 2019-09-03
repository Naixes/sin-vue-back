<template>
    <div class="s-collapse">
        <slot></slot>
    </div>
</template>
<script>
export default {
}
</script>

<style lang="scss" scoped>
$border-color: #999;
$border-radius: 4px;
.s-collapse {
    border: 1px solid $border-color;
    border-radius: $border-radius;
}
</style> 