<script lang="ts">
  import CustomButton from './CustomButton.svelte'
  import PlatformButton from './PlatformButton.svelte'
  import type { PlatformEventMap } from './spreadEvents'

  const platformEvents: PlatformEventMap = {
    click: () => console.log('Clicked'),
    mouseover: () => console.log('Hovered'),
  }
</script>

<PlatformButton events={platformEvents}>
  <span>Click me</span>
</PlatformButton>

<CustomButton
  events={{
    'my-custom-event': e => console.log(e),
  }}
>
  <span>Click me</span>
</CustomButton>

<!-- this SHOULD complain, saying types don't match. -->
<CustomButton events={platformEvents}>
  <span>Click me</span>
</CustomButton>
