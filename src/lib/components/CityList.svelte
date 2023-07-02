<script lang="ts">
	import type { CitiesFile } from '$lib/@types/esn';
	import cities from '@equalstreetnames/global/cities.json';

	const citiesfile: CitiesFile = cities;
	const countries = Object.keys(citiesfile).map((country) => {
		return {
			country: country,
			cities: Object.keys(citiesfile[country]).map((city) => {
				return {
					city: city,
					name: citiesfile[country][city].name,
					strippedName: citiesfile[country][city].name.split(',')[0].substring(5),
					url: citiesfile[country][city].url
				};
			}),
			emoji: citiesfile[country][Object.keys(citiesfile[country])[0]].name.substring(0, 4)
		};
	});
</script>

<span class="list">
	{#each countries as country}
		<span class="country">
			<span class="country-name"><h2>{country.emoji}</h2></span>

			<ul>
				{#each country.cities as city}
					<li><a href={city.url}>{city.strippedName}</a></li>
				{/each}
			</ul>
		</span>
	{/each}
</span>

<style lang="scss">
	.list {
		@apply flex flex-row flex-wrap;
	}

	.country {
		@apply flex flex-col m-4 pt-2 border border-orange-800 rounded-lg h-min dark:bg-slate-600;
	}

	.country-name {
		@apply flex justify-center pb-2;
	}

	h2 {
		@apply text-xl w-max;
	}

	li {
		@apply px-2 border-b border-orange-800;

		&:first-child {
			@apply border-t;
		}

		&:last-child {
			@apply border-b-0 rounded-b-lg;
		}

		&:hover {
			@apply bg-orange-800 text-white;
		}
	}

	a {
		@apply text-black dark:text-white hover:text-white no-underline inline-block w-full;
	}
</style>
