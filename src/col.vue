<template>
    <div 
        class="s-col" 
        :class="[`col-${span}`, `offset-${offset}`]"
        :style="{paddingLeft: gutter / 2 + 'px', paddingRight: gutter / 2 + 'px'}"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Col',
    props: {
        // 跨度
        span: {
            type: [Number, String]
        },
        // 偏移
        offset: {
            type: [Number, String]
        }
    },
    data() {
        return {
            gutter: 0
        }
    }
}
</script>

<style lang="scss" scoped>
.s-col {
    width: 100%;

    $class-perfix: col-;
    // scss循环
    @for $n from 1 through 24 {
        &.#{$class-perfix}#{$n} {
            width: ($n / 24) * 100%;
        }
    }

    $class-perfix: offset-;
    @for $n from 1 through 24 {
        &.#{$class-perfix}#{$n} {
            margin-left: ($n / 24) * 100%;
        }
    }
}
</style>
