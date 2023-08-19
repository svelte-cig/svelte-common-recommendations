<style lang="scss">
	:root {
		@apply z-0;
	}
</style>

<script>
	import { getContext } from 'svelte'

	/**
	 * @type {import('svelte/store').Writable<{
	 * 	visible: boolean
	 * }>}
	 */
	const state = getContext('state')

	function activate() {
		$state.visible = true
	}

	function deactivate() {
		$state.visible = false
	}

	function toggle() {
		if (!$state.visible) {
			activate()
			return
		}

		deactivate()
	}
</script>

<slot name="asChild" {activate} {deactivate} {toggle}>
	<button type="button" class="btn variant-filled" on:click={toggle}>
		<slot />
	</button>
</slot>
