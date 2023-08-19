<script>
	import Tooltip from './Tooltip.svelte'
</script>

<div class="grid gap-2 p-2">
	<Tooltip let:Portal let:Trigger>
		<Trigger>
			<span>Click me</span>
		</Trigger>
		<Portal>
			<span>thi is a tooltip content</span>
		</Portal>
	</Tooltip>

	<Tooltip let:Portal let:Trigger>
		<Trigger>
			<div slot="asChild" let:activate let:deactivate let:toggle>
				<button type="button" class="btn-icon variant-filled" on:click={toggle}>
					<span>+</span>
				</button>
			</div>
		</Trigger>
		<Portal>
			<span>thi is a tooltip content</span>
		</Portal>
	</Tooltip>
</div>
