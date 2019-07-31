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
		<div class="content">
			<slot></slot>
		</div>
	</button>
</template>

<script>
export default {
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

<style lang="scss">
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
	font-size: var(--font-size);
	height: var(--button-height);
	padding: 0 1em;

	background: var(--border-bgc);

	border-radius: var(--button-radius);
	border: 1px solid var(--border-color);

	&:hover {
		border-color: var(--border-hover-color);
	}
	&:active {
		background-color: var(--button-active-bgc);
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
	>.content {
		order: 2;
	}
	>.icon {
		order: 1;
	}
	&.icon-right {
		>.content {
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
