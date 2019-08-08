<template>
    <!-- :class="$style.input" -->
    <div class="input-wrapper" :class="{error}">
        <!-- readonly可以focus -->
				<!-- v-model相当于:value="message" @input="message = $event.target.value" -->
        <input 
            type="text"
            :value="value" 
            :disabled="disabled" 
            :readonly="readonly"
            :placeholder="placeholder"
            @input="$emit('input', $event.target.value, $event)"
            @change="$emit('change', $event.target.value, $event)"
            @focus="$emit('focus', $event.target.value, $event)"
            @blur="$emit('blur', $event.target.value, $event)"
        >
        <template v-if="error">
            <s-icon class="err-icon" name="error"></s-icon>
            <span class="err-msg">{{error}}</span>
        </template>
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

<style lang="scss" scoped>

// 样式
$red: #F1453D;

// 基础
$height: 32px;
$border-color: #999;
$border-radius: 4px;
$font-size: 12px;
$color: #333;

// 状态
$hover-border-color: #666;
// focus
$focus-box-shadow-color: rgba(153, 153, 153, 0.4);
$focus-err-box-shadow-color: rgba(241, 69, 61, 0.4);

.input-wrapper { 
    font-size: $font-size;
    display: inline-flex;
    align-items: center;
    > :not(:last-child) {
        margin-right: .5em;
    }
    > input { 
        color: $color;
        height: 32px;
        border: 1px solid $border-color;
        border-radius: 4px;
        padding: 0 8px;
        font-size: inherit;
        &:hover {
            border-color: $hover-border-color;
        }
        &:focus {
            // h-shadow v-shadow blur spread color inset;
            box-shadow: 2px 2px 1px $focus-box-shadow-color;
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
            &:focus {
                box-shadow: 2px 2px 1px $focus-err-box-shadow-color;
            }
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
