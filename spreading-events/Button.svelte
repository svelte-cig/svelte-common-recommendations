<script lang="ts">
	import { spreadEvents } from './spreadEvents'
	export let events: typeof spreadEvents
</script>

<button use:spreadEvents={events}>
	<slot />
</button>
