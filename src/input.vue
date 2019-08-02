<template>
    <!-- :class="$style.input" -->
    <div class="input" :class="{error}">
        <input 
            type="text"
            :value="value" 
            :disabled="disabled" 
            :readonly="readonly"
            :placeholder="placeholder"
        >
        <s-icon class="err-icon" name="setting"></s-icon>
        <span class="err-msg">{{error}}</span>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    components: {
        's-icon': () => import('./icon')
    }
}
</script>

<style lang="scss" module>
$height: 32px;
$border-color: #999;
$border-color-hover: #666;
$border-radius: 4px;
$font-size: 12px;
$box-shadow-color: rgba(0, 0, 0, 0.2);
$red: #F1453D;

.input { 
    font-size: $font-size;
    display: inline-flex;
    align-items: center;
    > :not(:last-child) {
        margin-right: .5em;
    }
    > input { 
        height: 32px;
        border: 1px solid $border-color;
        border-radius: 4px;
        padding: 0 8px;
        font-size: inherit;
        &:hover {
            border-color: $border-color-hover;
        }
        &:focus {
            box-shadow: inset 0 1px 3px $box-shadow-color;
            outline: none;
        }
        &[disabled], &[readonly] {
            border-color: #bbb;
            color: #bbb;
            cursor: not-allowed;
        }
    }
    &.error {
        > input {
            border-color: $red;
        }
    }
    .err-icon {
        fill: $red;
    }
    .err-msg {
        color: $red;
    }
}
</style>
