<script lang="ts">
  import Button from './Button.svelte'
  import type { Events } from './spreadEvents'
  const events: Events = {
    click: () => console.log('Clicked'),
    mouseover: () => console.log('Hovered'),
    mycustomevent: () => console.log('My custom event has been triggered'),
  }

  const props = {
    click: () => console.log('clicked'),
  }
</script>

<button {...props}>
  <span>Click me (dsl)</span>
</button>
<br />

<!-- <Button {events}>
<span>Click me</span>
</Button> -->
