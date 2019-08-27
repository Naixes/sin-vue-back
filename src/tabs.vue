<template>
    <div class="s-tabs">
        <slot></slot>
    </div>
</template>
<script>
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
    }
}
</script>
<style lang="scss" scoped>
.s-tabs {

}
</style>