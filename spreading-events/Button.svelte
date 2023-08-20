<script lang="ts">
  import { spreadEvents, type Events } from './spreadEvents'
  // export let events: Events = {}
  export let events: Events = {}
</script>

<button use:spreadEvents={events}>
  <slot />
</button>
