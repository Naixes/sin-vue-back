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
// 参数校验
const validator = (obj) => {
    let keys = Object.keys(obj)
    let valid = true
    keys.forEach(key => {
        if(!['span', 'offset'].includes(key)) {
            valid = false
        }
    })
    return valid
}
// 添加类名
const createClass = (obj, type='') => {
    if(!obj) return []

    let {span, offset} = obj
    let classes = []
    let typeStr = type

    if(type) {
        typeStr = type + '-'
    }
    if(span) {
        classes.push(`${typeStr}col-${span}`)
    }
    if(offset) {
        classes.push(`${typeStr}offset-${offset}`)
    }
    return classes
} 
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
        },
        // 响应式
        // phone: {type: Object, validator},
        ipad: {type: Object, validator},
        narrowPc: {type: Object, validator},
        pc: {type: Object, validator},
        widePc: {type: Object, validator},
        extra: {type: Object, validator}
    },
    data() {
        return {
            gutter: 0,
        }
    },
    // 写在data中时只会读取一次，要通过计算属性
    computed: {
        colClass() {
            let {span, offset, ipad, narrowPc, pc, widePc, extra} = this
            return [
                ...createClass({span, offset}),
                // ...(phone ? [`phone-col-${phone.span}`] : []),
                ...createClass(ipad, 'ipad'),
                ...createClass(narrowPc, 'narrow-pc'),
                ...createClass(pc, 'pc'),
                ...createClass(widePc, 'wide-pc'),
                ...createClass(extra, 'extra')
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

    // 响应式
    // 默认为phone的样式：移动端优先
    // phone
    // @media (max-width: 576px) {
	//     $class-perfix: phone-col-;
    //     @for $n from 1 through 24 {
    //         &.#{$class-perfix}#{$n} {
    //             width: ($n / 24) * 100%;
    //         }
    //     }
	//     $class-perfix: phone-offset-;
    //     @for $n from 1 through 24 {
    //         &.#{$class-perfix}#{$n} {
    //             margin-left: ($n / 24) * 100%;
    //         }
    //     }
    // }
    // ipad
    @media (min-width: 577px) {
	    $class-perfix: ipad-col-;
        @for $n from 1 through 24 {
            &.#{$class-perfix}#{$n} {
                width: ($n / 24) * 100%;
            }
        }
	    $class-perfix: ipad-offset-;
        @for $n from 1 through 24 {
            &.#{$class-perfix}#{$n} {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    // narrow-pc
    @media (min-width: 769px) {
	    $class-perfix: narrow-pc-col-;
        @for $n from 1 through 24 {
            &.#{$class-perfix}#{$n} {
                width: ($n / 24) * 100%;
            }
        }
	    $class-perfix: narrow-pc-offset-;
        @for $n from 1 through 24 {
            &.#{$class-perfix}#{$n} {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    // pc
    @media (min-width: 993px) {
	    $class-perfix: pc-col-;
        @for $n from 1 through 24 {
            &.#{$class-perfix}#{$n} {
                width: ($n / 24) * 100%;
            }
        }
	    $class-perfix: pc-offset-;
        @for $n from 1 through 24 {
            &.#{$class-perfix}#{$n} {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    // wide-pc
    @media (min-width: 1201px) {
	    $class-perfix: wide-pc-col-;
        @for $n from 1 through 24 {
            &.#{$class-perfix}#{$n} {
                width: ($n / 24) * 100%;
            }
        }
	    $class-perfix: wide-pc-offset-;
        @for $n from 1 through 24 {
            &.#{$class-perfix}#{$n} {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    // extra
    @media (min-width: 1601px) {
	    $class-perfix: extra-col-;
        @for $n from 1 through 24 {
            &.#{$class-perfix}#{$n} {
                width: ($n / 24) * 100%;
            }
        }
	    $class-perfix: extra-offset-;
        @for $n from 1 through 24 {
            &.#{$class-perfix}#{$n} {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
}
</style>
