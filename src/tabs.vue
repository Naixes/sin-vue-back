<template>
    <div class="s-tabs">
        <slot></slot>
    </div>
</template>
<script>
import Vue from 'vue'

export default {
    props: {
        direction: {
            type: String,
            default: 'horizontal',
            validator(value) {
                return ['horizontal', 'vertical'].indexOf(value) > -1
            }
        },
        selected: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            // provide中的eventBus不能直接访问
            eventBus: new Vue()
        }
    },
    provide() {
        return {
            eventBus: this.eventBus
        }
    },
    mounted() {
        // console.log(this)
        // console.log(this.eventBus)
        // 发布
        this.eventBus.$emit('update:selected', this.selected)
    }
}
</script>
<style lang="scss" scoped>
.s-tabs {

}
</style>