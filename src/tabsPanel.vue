<template>
    <div v-if="this.isActive" class="s-tabs-panel" :class="classes">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        classes(){
            return {
                active: this.isActive
            }
        }
    },
    inject: ['eventBus'],
    created() {
        this.eventBus.$on('update:selected', (name) => {
            if(this.name === name) {
                this.isActive = true
            }else {
                this.isActive = false
            }
        })
    },
}
</script>

<style lang="scss" scoped>
.s-tabs-panel {
}
</style> 