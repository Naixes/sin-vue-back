<template>
		<button class="s-button">hi</button>
</template>

<script>
export default {

}
</script>

<style lang="scss">
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
}
</style>
