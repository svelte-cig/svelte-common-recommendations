# Invoke Component

The invoke component is a [verb component](./verb_components.md).

```svelte
<!-- invoke.svelte -->
<script>
  /**
   * @type {function():any}
   */
  export let callback
  const possible_promise = callback()
</script>

{#await possible_promise}
  <span>Loading...</span>
{:then result}
  <slot using={{ result }} />
{/await}
```