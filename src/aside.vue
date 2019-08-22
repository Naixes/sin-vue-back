<template>
    <!-- 添加动画 -->
    <transition name="slide">
        <!-- 问题：button也会消失，样式未确定 -->
        <div class="aside" v-if="visible">
            <slot></slot>
            <button @click="visible = false">close</button>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            visible: true
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all .5s;
}
.slide-enter,
.slide-leave-to {
    // transform: translateX(-150px)
    margin-left: -150px;
}
.aside {
    position: relative;
    >button {
        position: absolute;
        right: 0;
    }
}
</style>