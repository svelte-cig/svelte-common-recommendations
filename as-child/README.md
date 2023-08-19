# Problem (As Child)

When using components, we sometimes want an HTML element to be replaced with a custom element. This pattern allows components to have a "default" element that can be overwritten by a "asChild" slot. This pattern is seen in many React Component libraries like [Radix Primitives](https://www.radix-ui.com/primitives/docs/guides/composition).


# Solution

```svelte
<!-- TooltipTrigger.svelte -->
<!-- 
  When "asChild" slot is not used, it'll use the button element
  and will pass the default slot inside it. If we use the "asChild" slot,
  the button element will be replaced with our custom "child"
-->
<slot name="asChild">
  <button>
    <slot />
  </button>
</slot>
```
```svelte
<!-- Example.svelte -->
<script>
  import { TooltipRoot, TooltipTrigger, TooltipPortal } from './tooltip.ts';
</script>

<!-- Will result to: <button>Click me</button> -->
<TooltipRoot>
  <TooltipTrigger>
    Click me
  </TooltipTrigger>
  <TooltipPortal>...</TooltipPortal>
</TooltipRoot>

<!-- Will result to: <a href="...">Click me</a> instead of <button>Click me</button> -->
<TooltipRoot>
  <TooltipTrigger>
    <a slot="asChild" href="..">Click me</a>
  </TooltipTriggert>
  <TooltipPortal>...</TooltipPortal>
</TooltipRoot>
```

---

Original proposal can be found [here](https://github.com/svelte-cig/svelte-common-recommendations/issues/1).
