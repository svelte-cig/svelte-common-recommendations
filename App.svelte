<script>
	/**
	 * @type {Array<{
	 * 	description: string,
	 * 	links: Array<{
	 * 		label: string,
	 * 		path: string,
	 * 	}>,
	 * }>}
	 */
	const rows = [
		{
			description: 'Compound Components',
			links: [
				{
					label: 'Local',
					path: '/compound-components/index.html',
				},
			],
		},
		{
			description: 'Storable Store',
			links: [
				{
					label: 'Local',
					path: '/storable-store/index.html',
				},
			],
		},
		{
			description: 'Spreading Events',
			links: [
				{
					label: 'Local',
					path: '/spreading-events/index.html',
				},
			],
		},
	]
</script>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Description</th>
				<th>Links</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row, i}
				<tr>
					<td>{row.description}</td>
					<td>
						{#each row.links as link}
							<a href={link.path}>{link.label}</a>
						{/each}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
