<style lang="scss">
	.portal {
		@apply absolute;
		@apply bg-black;
		@apply bg-opacity-70;
		@apply p-4;
		@apply rounded-xl;
		@apply z-10;
	}
</style>

<script>
	import { getContext } from 'svelte'
	import { fly } from 'svelte/transition'
	/**
	 * @type {import('svelte/store').Writable<{
	 * 	visible: boolean
	 * }>}
	 */
	const state = getContext('state')
</script>

{#if $state.visible}
	<div class="portal" in:fly>
		<slot />
	</div>
{/if}
