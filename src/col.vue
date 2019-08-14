<template>
    <div class="s-col-wrapper"
        :class="colClass"
        :style="colStyle"
    >
        <div class="s-col">
            <slot></slot>
        </div>
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
            gutter: 0,
        }
    },
    // 写在data中时只会读取一次，要通过计算属性
    computed: {
        colClass() {
            let {span, offset} = this
            return [
                span && `col-${span}`,
                offset && `offset-${offset}`
            ]
        },
        colStyle() {
            return {
                paddingLeft: this.gutter / 2 + 'px',
                paddingRight: this.gutter / 2 + 'px'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.s-col-wrapper {
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
