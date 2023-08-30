<script lang="ts">
  import CustomButton, { type CustomButtonEvents } from './CustomButton.svelte'
  import PlatformButton from './PlatformButton.svelte'
  import type { PlatformEventMap } from './spreadEvents'

  const platformEvents: PlatformEventMap = {
    click: () => console.log('Clicked'),
    mouseover: () => console.log('Hovered'),
  }

  let events: CustomButtonEvents

  document.addEventListener('click', e => {
    // Should intellisense warn that `my-custom-event` could be missing here?
    events['my-custom-event'](e)
  })
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

<CustomButton bind:events>
  <span>Click me</span>
</CustomButton>
