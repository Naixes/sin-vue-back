<template>
    <svg v-if="name" class="s-icon">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
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
        width: 1em;
        height: 1em;
				margin-left: .1em;
    }
</style>
