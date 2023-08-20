/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { writable } from 'svelte/store'

/**
 * Serialize data.
 * @template T
 * @callback StorableSerializer
 * @param {T} data data to serialize.
 * @returns {string} serialized data.
 */

/**
 * Unserialize data.
 * @template T
 * @callback StorableDeserializer
 * @param {string} data data to deserialize.
 * @returns {T} deserialized data.
 */

/**
 * Options for the store.
 * @template T
 * @typedef StorableOptions
 * @property {StorableSerializer<T>} serialize a callback that manages conversion from {T} to {string}.
 * @property {StorableDeserializer<T>} deserialize a callback that manages conversion from {string} to {T}.
 */

/**
 * @template T
 * @param {string} storeName
 * @param {T} store
 * @param {StorableOptions<T>} options
 * @returns {import('svelte/store').Writable<T>}
 */
export function storable(
  storeName,
  store,
  options = {
    serialize: x => JSON.stringify(x),
    deserialize: x => JSON.parse(x),
  }
) {
  if (localStorage[storeName]) {
    try {
      store = options.deserialize(localStorage[storeName])
    } catch (e) {
      console.warn(e)
    }
  }

  const result = writable(store)
  result.subscribe($result => {
    localStorage.setItem(storeName, options.serialize($result))
  })
  return result
}
