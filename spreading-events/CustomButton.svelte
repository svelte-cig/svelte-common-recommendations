<script lang="ts" context="module">
  export type CustomButtonEvents = CustomEventMap<{
    'my-custom-event': Event
  }>
</script>

<script lang="ts">
  import { spreadEvents, type CustomEventMap } from './spreadEvents'

  // TODO: should this give an error pointing out
  // that 'my-custom-event' is not implemented in `{}`?
  export let events: CustomButtonEvents = {}
</script>

<button use:spreadEvents={events}>
  <slot />
</button>
