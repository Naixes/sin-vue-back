<template>
    <div class="s-tabs-item" @click="toggle" :class="classes">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        name: {
            type: [String, Number],
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
    methods: {
        toggle() {
            this.eventBus.$emit('update:selected', this.name)
        }
    }
}
</script>

<style lang="scss" scoped>
.s-tabs-item {
    display: flex; align-items: center;
    padding: 0 1em; height: 100%;
    .s-icon {
        margin-right: 5px;
    }
    &.active {
    }
}
</style> 