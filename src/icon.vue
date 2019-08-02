<template>
    <svg v-if="name" class="s-icon">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
import './svg'

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
		margin-left: .2em;
    }
</style>
