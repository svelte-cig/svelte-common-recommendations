<script>
  import Card from './Card.svelte'
</script>

<Card let:Header let:Section let:LazySectionLoader>
  <Header>test</Header>
  <Section title="section-1" />
  <Section title="section-2" />
  <Section title="section-3" />
  <Section title="section-4" />
  {#await LazySectionLoader then result}
    {@const LazySection = result.default}
    <LazySection title="section-5" />
  {/await}
</Card>

<p>Or you can wait till all components are loaded</p>

<Card let:Header let:Section let:LazySectionLoader>
  {#await LazySectionLoader then result}
    {@const LazySection = result.default}
    <Header>test</Header>
    <Section title="section-1" />
    <Section title="section-2" />
    <Section title="section-3" />
    <Section title="section-4" />
    <LazySection title="this one defeats the point a bit but you can do it (and there are some use cases)" />
  {/await}
</Card>
