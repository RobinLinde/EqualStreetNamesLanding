<script lang="ts">
	export let city: {
		country: string;
		city: string;
		name: string;
		strippedName: string;
		url: string;
	};
	let popup: HTMLSpanElement;
</script>

<li class="city">
	<span>
		<a
			href={city.url}
			on:click={(e) => {
				if (e.altKey) {
					e.preventDefault();
					console.log(e);
					popup.classList.toggle('hidden');
					popup.style.top = `${e.clientY}px`;
					popup.style.left = `${e.clientX}px`;
				}
			}}>{city.strippedName}</a
		>
		<span class="popup hidden" bind:this={popup}>
			<ul>
				<li><a href={city.url}>Open</a></li>
				<li><a href={city.url} target="_blank">Open in new tab</a></li>
				<li>
					<a href={`https://statistics.equalstreetnames.eu/?city=${city.country}/${city.city}`}
						>Open statistics for city
					</a>
				</li>
				<li>
					<a
						href={`https://statistics.equalstreetnames.eu/?country=${city.country}/${city.city}`}
						target="_blank"
						>Open statistics for city in new tab
					</a>
				</li>
			</ul>
		</span>
	</span>
</li>

<style lang="postcss">
	li.city {
		@apply border-b border-orange-800;

		&:first-child {
			@apply border-t;
		}

		&:last-child {
			@apply border-b-0 rounded-b-lg;
		}

		span:not(.popup) {
			@apply flex flex-row;

			a {
				@apply text-black dark:text-white hover:text-white no-underline inline-block w-full px-2;

				&:hover {
					@apply bg-orange-800 text-white;
				}
			}
		}

		span.popup:not(.hidden) {
			@apply absolute bg-slate-700 border border-orange-800 rounded-lg z-10;

			li {
				@apply border-b border-orange-800;

				&:last-child {
					@apply border-b-0;
				}
			}
		}
	}
</style>
