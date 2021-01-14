<template>
    <!-- 可以在组件上绑定click事件 -->
    <svg v-if="name" class="s-icon" @click="$emit('click', $event)">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
import '../svg'

export default {
	props: {
		name: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="scss">
    .s-icon {
        width: 1.2em;
        height: 1.2em;
		margin: 0 .2em;
    }
</style>
