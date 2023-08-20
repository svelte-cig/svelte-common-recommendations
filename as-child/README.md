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

## Most basic example
The `Button` component will be a `<button />` element by default. Using the `asChild` slot, we can replace the `<button />` element with any html element. This is useful for customization and flexibility, like switching a `<button />` element for a link (`<a />`) element.

```html
<!-- Button.svelte -->
<slot name="asChild">
  <button>
    <slot />
  </button>
</slot>
```
```html
<!-- Example.svelte -->
<script>
  import Button from './Button.svelte';
</script>

<Button>
  <a slot="asChild" href="/">link</a>
<Button>
```

## Passing a property to the `asChild` element
You can use the slot properties to forward a property to the `asChild` element:

```html
<!-- Button.svelte -->
<script>
  const classes = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
</script>

<slot name="asChild" {classes}>
  <button class={classes}>
    <slot />
  </button>
</slot>
```
```html
<!-- Example.svelte -->
<script>
  import Button from './Button.svelte';
</script>

<!-- They will both have the same style (assuming you have Tailwind installed) -->
<Button>Click me</Button>
<Button>
  <a slot="asChild" let:classes href="/" class={classes}>Link</a>
</Button>
```

## Passing all properties to the `asChild` element
```html
<!-- Button.svelte -->
<script lang="ts">
  export let id = 'Button';
  export let classes = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  export let type: 'button' | 'submit' | 'reset' = 'button';

  const properties = { id, class: classes, type };
</script>

<slot name="asChild" props={properties}>
  <button {...properties}>
    <slot />
  </button>
</slot>
```
```html
<!-- Example.svelte -->
<Button>
  <a slot="asChild" let:props {...props} href="/">Link</a>
</Button>

<!-- Overriding a property via Button props -->
<Button id="MyCustomId">
  <a slot="asChild" let:props {...props} href="/">Link</a>
</Button>

<!-- Overriding a property via "asChild" props (passing the id after {...props} will override the "id" property defined inside the component -->
<Button>
  <a slot="asChild" let:props {...props} href="/" id="MyCustomId">Link</a>
</Button>

<!-- Ignoring a property -->
<Button id="MyCustomId">
  <a slot="asChild" let:props {...props} href="/" id={undefined}>Link</a>
</Button>
```

## Passing events to the `asChild` element
Sadly, Svelte currently does not allow spread operations for events. We need to manually pass them to the element. That being said, you could create a [`Svelte Action`](https://svelte.dev/docs/svelte-action) that binds the needed event to the element.

```html
<!-- Button.svelte -->
<script lang="ts">
  const events = { onclick: handleClick };

  function handleClick(event: MouseEvent) {
    console.log(event);
  }
</script>

<slot name="asChild" {events}>
  <button on:click={events.onclick}>
    <slot />
  </button>
</slot>
```
```html
<!-- Example.svelte -->
<Button>
  <a
    slot="asChild"
    let:events={{ onclick }}
    href="/"
    on:click={onclick}
  >
    Link
  </a>
</Button>
```

### Using a svelte action to spread multiple events on an element
```html
<!-- Button.svelte -->
<script lang="ts">
  const events = {
    click: () => console.log('Clicked'),
    mouseover: () => console.log('Hovered'),
  };

  const bindEvents = (node: HTMLElement) => {
    Object.entries(events).forEach(([event, action]) => {
      node.addEventListener(event, action as any);
    });

    return {
      destroy() {
        Object.entries(events).forEach(([event, action]) => {
          node.removeEventListener(event, action as any);
        });
      },
    };
  };
</script>

<slot name="asChild" {bindEvents}>
  <button use:bindEvents>
    <slot />
  </button>
</slot>
```
```html
<Button>
  <a slot="asChild" let:bindEvents use:bindEvents href="/">Link</a>
</Button>
```

---

Original proposal can be found [here](https://github.com/svelte-cig/svelte-common-recommendations/issues/1).
