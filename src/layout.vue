<template>
    <div class="layout">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.layout {
    background-color: #eee;
    display: flex;
    flex-direction: column;
}
</style>