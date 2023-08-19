<script>
	import { storable } from './storable.js'
	const value = storable('storable-store', '')
</script>

<label class="label">
	<span>Input</span>
	<input class="input" type="text" placeholder="Input" bind:value={$value} />
</label>
