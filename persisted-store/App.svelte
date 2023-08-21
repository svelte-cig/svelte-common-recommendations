<script lang="ts">
  import { createStore } from "./persistedStore";
  import { onMount } from "svelte";

  onMount(async () => {
    const indexedDBValue = await indexedDBStore.getValue();
    console.log({ indexedDBValue });
  });

  const indexedDBStore = createStore<string>({
    storeName: "indexedDBStoreName",
    initialValue: "hello",
    storage: "indexedDB",
  });

  const localStorageStore = createStore<string>({
    storeName: "localStorageStoreName",
    initialValue: "world",
    storage: "localStorage",
  });

  const noStorageStore = createStore<string>({
    storeName: "noStorageStoreName",
    initialValue: "nothing persists here",
  });
</script>

<label class="label">
  <span>indexedDBStore</span>
  <input
    class="input"
    type="text"
    placeholder="Input"
    bind:value={$indexedDBStore}
  />
</label>
<label class="label">
  <span>localStorageStore</span>
  <input
    class="input"
    type="text"
    placeholder="Input"
    bind:value={$localStorageStore}
  />
</label>

<label class="label">
  <span>noStorageStore</span>
  <input
    class="input"
    type="text"
    placeholder="Input"
    bind:value={$noStorageStore}
  />
</label>
