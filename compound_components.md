# Compound Components

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

Following a *compound components* strategy will allow you (_the author_) to give meaningful hints to the developer regarding any sub components and sections of the component.

The previous `Card` component can be solved using compound components like so

```svelte
<!-- card.svelte -->
<script>
    import CardHeader from './card_header.svelte'
    import CardFooter from './card_footer.svelte'
    import CardBody from './card_body.svelte'
</script>

<div class="card">
    <slot using={{CardHeader,CardBody,CardFooter}}/>
</div>
```

```svelte
<!-- card_header.svelte -->
<div class="card_header">
    <slot />
</div>
```

```svelte
<!-- card_body.svelte -->
<div class="card_body">
    <slot />
</div>
```

```svelte
<!-- card_header.svelte -->
<div class="card_footer">
    <slot />
</div>
```

Using the component would then become more straightforward

```svelte
<script>
    import Card from './card.svelte'
</script>

<Card using={{CardHeader,CardBody,CardFooter}}>
    <CardHeader>
        <span>this is header</span>
    </CardHeader>
    <CardBody>
        <span>this is header</span>
    </CardBody>
    <CardFooter>
        <span>this is header</span>
    </CardFooter>
</Card>
```

### This type of api is called a [discoverable api](https://developers.redhat.com/articles/2022/10/06/how-make-your-apis-more-discoverable).

It invites the developer to explore and discover features within your api, enouraging adoption and hopefuly curiosity.

If you don't care about any of that, it also allows developers to be more independent and not require the help of more experienced team mates or seniors.