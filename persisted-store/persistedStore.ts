import IndexedDBWrapper from './indexeddb-wrapper'

// Single Indexeddb Client... It gets initialized only if any of the stores need it
let indexedbInitialized = false
let indexedDbWrapper: IndexedDBWrapper

export type StoreOptions<T> = {
  storeName: string
  initialValue: T
  storage?: 'indexedDB' | 'localStorage'
}

export function createStore<T>({
  storeName,
  initialValue,
  storage,
}: StoreOptions<T>) {
  // If any store requests indexedDB, and the client is not initialized yet, it will be initialized here.
  // It also checks if the browser supports indexedDB, if not, it reverts to localStorage
  if (
    storage === 'indexedDB' &&
    !indexedDbWrapper &&
    typeof window !== 'undefined'
  ) {
    if (!window?.indexedDB) storage = 'localStorage'
    else {
      indexedDbWrapper = new IndexedDBWrapper(
        'persistance-database',
        'main-store',
      )
      indexedDbWrapper.init().then(() => (indexedbInitialized = true))
    }
  }

  // Initial store value
  let storeValue: T = initialValue

  // Create subscribers Set to call them for any updates
  const subscribers = new Set<(value: T) => void>()

  // This is to get the value of the store directly from the storage.
  // It is useful for stores that need to be accessed immediately before initialization finishes... for example in onMount.

  async function getValue(): Promise<T | null> {
    try {
      // should only work in the browser
      if (typeof window === 'undefined') return null

      let value: T | null

      if (!storage) {
        value = storeValue
      } else if (storage === 'indexedDB') {
        // If the wrapper is not yet initialized, wait for it to be fully initialized before trying to read the data.
        if (!indexedbInitialized) await indexedDbWrapper.init()
        const persistedValue = await getIndexedDBStore<T>(storeName)
        value = persistedValue
      } else {
        const persistedValue = getLocalStorageStore<T>(storeName)
        value = persistedValue
      }

      return value ?? null
    } catch (error) {
      // console.error(`Error at getValue function, store: ${storeName}.`, { error });
      return null
    }
  }

  const set = (value: T): void => {
    if (typeof window === 'undefined') return

    storeValue = value

    // send the updated value to all the subscribers
    broadcastValue(value)

    // persist the data
    if (storage) persistStore(storeName, value, storage)
  }

  // This function initializes the store and populates it with the persisted values
  async function init() {
    if (typeof window === 'undefined' || !storage) return
    // If indexedDB is requested, not yet initialized, and browser supports it, await for its initialization to finish to populate the store with value.
    if (storage === 'indexedDB' && !indexedbInitialized) {
      await indexedDbWrapper.init()
      indexedbInitialized = true
    }

    const storedValue = await getValue()

    // If no persisted data, then revert to initialValue
    const initialSetValue = storedValue ?? initialValue
    storeValue = initialSetValue

    broadcastValue(initialSetValue)
  }

  // initialize the store once its created
  init()

  // subscribe function with an unsubscribe function as a return
  const subscribe = (callback: (value: T) => void) => {
    subscribers.add(callback)
    callback(storeValue)

    return () => {
      subscribers.delete(callback)
    }
  }

  // update function... used `structuredClone` to avoid mutations being made to the value argument of the callback from affecting the `storeValue`

  const update = (callback: (value: T) => T): void => {
    const newValue = callback(structuredClone(storeValue))
    set(newValue)
  }

  // Function to broadcast any change to all subscribers
  function broadcastValue(value: T) {
    subscribers.forEach(callback => {
      callback(value)
    })
  }

  // optional but useful... this synchronous store.get() method can replace and outperform the built-in
  // svelte stores get(store) function... as it eliminates the need to subscribe and unsubscribe
  // svelte get() can still work the same.
  function get() {
    return storeValue
  }

  return {
    getValue,
    subscribe,
    update,
    init,
    get,
    set,
  }
}

// Functions responsible for persisting the new values

async function persistStore<T>(
  key: string,
  value: T,
  storage: 'localStorage' | 'indexedDB',
) {
  if (storage === 'indexedDB') await setIndexedDBStore<T>({ key, value })
  else setLocalStorageStore<T>({ key, value })
}

async function getIndexedDBStore<T>(key: string): Promise<T | null> {
  const document = await indexedDbWrapper.get<T>(key)
  if (!document) return null
  const { value } = document
  return value
}

async function setIndexedDBStore<T>({ key, value }: { key: string; value: T }) {
  const insertDocument = { id: key, value }
  return indexedDbWrapper.set<T>(insertDocument)
}

function getLocalStorageStore<T>(key: string): T | null {
  try {
    if (typeof window === 'undefined') return null
    const stringValue = localStorage.getItem(key)
    if (!stringValue) return null

    const value = JSON.parse(stringValue) as T

    return value
  } catch (error) {
    // console.error(`Error at getLocalStorageStore function, key: ${key}.`, { error });
    return null
  }
}

function setLocalStorageStore<T>({ key, value }: { key: string; value: T }) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    // console.error(`Error at setLocalStorageStore function, key: ${key}.`, { error });
  }
}
