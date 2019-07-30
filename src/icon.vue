<template>
    <svg v-if="icon" class="s-icon">
        <use :link:herf="`#icon-${name}`"></use>
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
    }
</style>
