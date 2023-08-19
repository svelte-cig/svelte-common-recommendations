# Problem (Compound Components)

When you're building reusable components it is very often the case that components use `<slot />`.

Depending on the style or actual javascript code, the component may expect the `<slot />` content to have a certain shape, behaviour, style.

Imagine something like a `Card` component which expects `CardSection`s as children.

```svelte
    <Card>
        <CardSection text="section-1"/>
        <CardSection text="section-2"/>
        <CardSection text="section-3"/>
        <CardSection text="section-4"/>
    </Card>
```

How would you hint to the developer that `Card` accepts `CardSection`s other than through naming?

# Solution

[Use slot parameters](App.svelte).


