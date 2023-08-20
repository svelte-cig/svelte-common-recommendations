type SpreadHTMLElementEventMap<K extends keyof HTMLElementEventMap> = Record<
	K,
	(this: HTMLElement, ev: HTMLElementEventMap[K]) => any
>

export function spreadEvents<K extends keyof HTMLElementEventMap>(
	node: HTMLElement,
	events: SpreadHTMLElementEventMap<K>
) {
	for (const key in events) {
		const action = events[key as keyof SpreadHTMLElementEventMap<K>]
		node.addEventListener(key, action)
	}

	return {
		destroy() {
			for (const key in events) {
				const action = events[key as keyof SpreadHTMLElementEventMap<K>]
				node.removeEventListener(key, action)
			}
		},
	}
}
