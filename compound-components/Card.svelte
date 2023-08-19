<script>
	import Header from './Header.svelte'
	import Section from './Section.svelte'
</script>

<slot {Header} {Section} LazySectionLoader={import('./LazySection.svelte')} />
