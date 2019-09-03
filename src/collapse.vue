<template>
    <div class="s-collapse">
        <slot></slot>
    </div>
</template>
<script>
import Vue from 'Vue'
export default {
    props: {
        single: {
            type: Boolean,
            default: false
        }
    },
    provide() {
        return {
            eventBus: this.single ? this.eventBus : ''
        }
    },
    data() {
        return {
            eventBus: new Vue()
        }
    }
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