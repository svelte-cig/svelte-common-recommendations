<script lang="ts">
  import {
    spreadEvents,
    type MixedEventMap,
    type CustomEventMap,
    type PlatformEventMap,
  } from './spreadEvents'
  export let events: PlatformEventMap = {}
</script>

<button use:spreadEvents={events}>
  <slot />
</button>
