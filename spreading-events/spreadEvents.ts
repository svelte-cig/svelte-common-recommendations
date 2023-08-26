/**
 * A map of custom events.
 */
export type CustomEventMap<MapOfEvents = Record<string, any>> = {
  [Name in Extract<keyof MapOfEvents, string>]?: (
    event: MapOfEvents[Name],
  ) => void
}

/**
 * A map of all platform events.
 */
export type PlatformEventMap = CustomEventMap<HTMLElementEventMap>

/**
 * A mix of platform events and custom ones.
 */
export type MixedEventMap<ExtendedMap extends Record<string, any>> =
  CustomEventMap<HTMLElementEventMap & ExtendedMap>

export function spreadEvents<Events extends CustomEventMap<{}>>(
  node: HTMLElement,
  events: Events,
) {
  for (const key in events) {
    const action = events[key]
    if (action) {
      // @ts-ignore
      node.addEventListener(key, action)
    }
  }

  return {
    destroy() {
      for (const key in events) {
        const action = events[key]
        if (action) {
          // @ts-ignore
          node.removeEventListener(key, action)
        }
      }
    },
  }
}
