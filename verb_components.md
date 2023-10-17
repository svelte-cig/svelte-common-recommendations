# Verb Components

Use Svelte's DSL ([Domain Specific Language](https://en.wikipedia.org/wiki/Domain-specific_language)) to its full extent to create a fluent api.

The Svelte DSL is just an abstraction over plain JS and no matter how many components you create and wrap.

You should make use of that detail and delegate calculations and IO to your components as if they were functions or verbs.

Start by naming your component with a verb.

We'll be using a `login.svelte` component and an `invoke.svelte` component as examlpes since they're pretty useful.

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
Whenever this component mounts to the dom it invokes `callback` and optionally allows you to retrieve the result using `let:using={{result}}` from within `<slot/>`.

```svelte
<!-- login.svelte -->
<script>
    import Invoke from './invoke.svelte'
    import LoginForm from './login_form.svelte'
    let username = ''
    let password = ''
    /**
     * @type {false|User}
     */
    let user = false
</script>


{#if user}
    <slot using={{user}} />
{:else}
    {#if !login_promise}
        <LoginForm
            bind:username
            bind:password
            on:submit_request={function(){
                login_promise = login({username, password})
            }}
        />
    {:else}
        {#await login_promise}
            <span>Loading...</span>
        {#then [local_user, error]}
            {#if error}
                <span>{error.message}</span>
            {:else}
                <Invoke
                    callback={function(){
                        user = local_user
                    }}
                />
            {/if}
        {/await}
    {/if}
{/if}
```
Once again, when the user is found, you provide it to the `<slot />` so that the developer may retrieve it using `let:using={{user}}`.

But way before that happens you obviously have to render a login form and manage any state the component user shouldn't have to worry about, like errors, promisses, loading spinners/text and so on.

As a result the developer can use this _verb_ component to guard their pages behind a login form and also obtain the logged in user fluently instead of using global stores or binding some external variable.

```svelte
<Login let:using={{ user }}>
    <Page let:using={{Sidebar, Content}}>
        <Sidebar {user} />
        <Content>
            <HomePage {user} />
        </Content>
    </Page>
</Login>
```

This is how the Svelte DSL helps you manage state using verbs, manage errors through [unsafe](./unsafe.md) results, and provide a [discoverable component api](https://developers.redhat.com/articles/2022/10/06/how-make-your-apis-more-discoverable) through [compound_components](./compound_components.md).

> **Note**\
> If you're a fan of fancy words like [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control) this should be very familiar to you.