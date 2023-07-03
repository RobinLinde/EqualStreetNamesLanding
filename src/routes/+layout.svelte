<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<div>
	<header>
		<Header />
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<Footer />
	</footer>
</div>

<style lang="postcss">
	div {
		@apply flex flex-col min-h-screen;
	}

	main {
		@apply p-16 text-lg lg:px-32 xl:px-64 flex-grow;
		@apply bg-gray-100 dark:bg-slate-900 dark:text-white;
	}

	footer {
		@apply bottom-0 w-full;
	}
</style>
