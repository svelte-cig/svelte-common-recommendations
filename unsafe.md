# Unsafe
```js
/**
 * @template T
 * @typedef {[T,false|Error]} Unsafe
 */
```

Use this type definition as a wrapper instead of `throw`ing `Error`s and let your errors fluently flow into your svelte templates.

Given the function `error`

```js
// error.js
/**
 * @param {string|Error|unknown} value
 * @returns {Unsafe<any>}
 */
export function error(value) {
  if (value instanceof Error) {
    return [false, value]
  }
  return [false, new Error(`${value}`)]
}
```
and the function `ok`
```js
// ok.js
/**
 * @template T
 * @param {T} value
 * @returns {Unsafe<T>}
 */
export function ok(value) {
  return [value, false]
}
```

Wrap your http client (**or any other critical piece of code**) to return `Unsafe<T>` instead of `throw`ing `Error`s
```js
/**
 * @template [T =  any]
 * @param {{pathname:string, headers?:Record<string, string>}} payload
 * @return {Promise<Unsafe<T>>}
 */
export const http = {
    async get({ pathname, headers = {} }) {
        if (!pathname.startsWith('/')) {
            return error("path must start with '/'.")
        }

        try {
            const response = await fetch(`/articles`, { headers })
            if (response.status >= 300) {
            return error(`Request failed with status ${response.status}.`)
            }

            const result = await response.json()

            return ok(result)
        } catch (e) {
            return error(e)
        }
    },
}
```

Then send your requests from your svelte template

```svelte
{#await http.get("/articles")}
    <span>Loading...</span>
{#then [result, error]}
    {#if error}
        <span>{error.message}</span>
    {:else}
        <slot using={{result}}/>
    {/if}
{/await}
```

This way you will always be aware which function calls can error out (by checking if the result type is `Unsafe`) and you're not required to wrap your plain JS code in `try/catch` and nest your code into oblivion.

> **Note**\
> The same http request example using plain JS
> ```js
> async function find_articles(){
>     const [result, error] = await http.get("/artcles")
>     if(error){
>         console.warn(error.message)
>         return []
>     }
> 
>     return result
> }
> ```