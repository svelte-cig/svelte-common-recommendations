export type Events<CustomEvents extends Record<string, Event> = {}> = HTMLElementEventMap | CustomEvents

export function spreadEvents<CustomEvents extends Record<string, Event> = {}>(
  node: HTMLElement,
  events: Events<CustomEvents>
) {
  for (const key in events) {
    const action = events[key as keyof Events]
    node.addEventListener(key, action)
  }

  return {
    destroy() {
      for (const key in events) {
        const action = events[key as keyof Events]
        node.removeEventListener(key, action)
      }
    },
  }
}
