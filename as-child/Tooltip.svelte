<script>
  import Trigger from './Trigger.svelte'
  import Portal from './Portal.svelte'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  const state = setContext(
    'state',
    writable({
      visible: false,
    })
  )
</script>

<div class="relative">
  <slot {Portal} {Trigger} />
</div>
