# Data Components

Use Svelte's DSL to its full extend to create a fluent api.

The Svelte DSL is just an abstraction of plain JS, meaning no matter how many components you create and wrap, in the end they all compile to JS.

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

Use this verb component to guard your pages behind a login form and also obtain the logged in user fluently instead of using global stores.

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