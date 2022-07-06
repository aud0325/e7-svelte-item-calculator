<script lang="ts">
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import Loading from "$lib/Loading.svelte";
import GearCalculator from "$lib/GearCalculator.svelte";
import { _, isLoading, } from 'svelte-i18n';
import { initI18n } from '../i18n';

initI18n();
$: title = $isLoading ? 'Epic7 gear score calculator' : $_('title');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={title}/>
</svelte:head>

{#if $isLoading}
<div class="loading-wrapper">
	<Loading/>
</div>
{:else}
<div class="h-100 d-flex flex-column app">
	<Header/>
	<GearCalculator/>
	<Footer/>
</div>
{/if}

<style>
	.app {
		min-height: 100vh;
	}
	.loading-wrapper {
		margin: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
	}
</style>