<template>
	<button 
		class="s-button" 
		:class="{[`icon-${iconPosition}`]: true}" @click="$emit('click')"
	>
		<!-- 图标 -->
		<s-icon 
			class="icon" 
			v-if="icon && !loading" :name="icon"
		></s-icon>
		<!-- loading图标 -->
		<s-icon 
			class="loading icon" 
			v-if="loading" name="loading"
		></s-icon>
		<!-- 按钮内容：使用时标签里的内容会覆盖这里 -->
		<!-- class注意：scoped可以保证内部样式不会影响外部，但是还是会被外部影响 -->
		<div class="s-button-content">
			<slot></slot>
		</div>
	</button>
</template>

<script>
import Icon from './icon'

export default {
	components: {
		's-icon': Icon
	},
	props: {
		icon: {
			type: String,
			default: ''
		},
		iconPosition: {
			type: String,
			default: 'left',
			// 校验
			validator(val) {
				return val === 'left' || val === 'right'
			}
		},
		loading: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="scss" scoped>
// 测试会报错？？？
// @import 'var';

$font-size: 14px ;

$color: #333;
$border-color: #999;
$border-hover-color: #666;

$button-height: 32px;
$button-bgc: #fff;
$button-radius: 4px;
$button-active-bgc: #eee;
// 加载中动画
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.s-button {
	font-size: $font-size;
	height: $button-height;
	padding: 0 1em;

	background: $button-bgc;

	border-radius: $button-radius;
	border: 1px solid $border-color;

	&:hover {
		border-color: $border-hover-color;
	}
	&:active {
		background-color: $button-active-bgc;
	}
	&:focus {
		outline: none;
	}

	// 布局
	display: inline-flex;
	// justify-content: center;
	align-items: center;
	// 多个按钮对齐
	vertical-align: middle;
	>.s-button-content {
		order: 2;
	}
	>.icon {
		order: 1;
	}
	&.icon-right {
		>.s-button-content {
			order: 1;
		}
		>.icon {
			order: 2;
		}
	}

	// loading
	.loading {
		animation: spin 1s infinite linear;
	}
}
</style>
