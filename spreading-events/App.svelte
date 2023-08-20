<!-- TODO: showcase implementation -->
<script lang="ts">
	import Button from './Button.svelte'
	const events = {
		onclick: () => console.log('Clicked'),
		onmouseover: () => console.log('Hovered'),
		onmycustomevent: () => console.log('My custom event has been triggered'),
	}
</script>

<Button />
