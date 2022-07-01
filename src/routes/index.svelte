<script lang="ts">
import { onMount, } from "svelte";
import { Button, Container, Col, Input, Label, Row } from "sveltestrap";
import Header from '$lib/Header.svelte';
import Footer from '$lib/Footer.svelte';
import Loading from "$lib/Loading.svelte";
import ItemAnalyzer from "$lib/ItemAnalyzer.svelte";
import StatInput from "$lib/StatInput.svelte";
import type { Stat } from "../type/index";
import { StatWeight, round2decimal } from "$lib/stat";
import { _, isLoading, } from 'svelte-i18n';
import { initI18n } from '../i18n';

// add body classes
// $: document.body.classList.add('d-flex', 'flex-column', 'h-100');
initI18n();

const stat = <Stat>{
	atkPer: 0,
	hpPer: 0,
	defPer: 0,
	eff: 0,
	res: 0,
	atk: 0,
	hp: 0,
	def: 0,
	cri: 0,
	criDmg: 0,
	spd: 0,
}

let elAtkPer: HTMLInputElement | undefined = undefined;
let elHpPer: HTMLInputElement | undefined = undefined;
let elDefPer: HTMLInputElement | undefined = undefined;
let elAtk: HTMLInputElement | undefined = undefined;
let elHp: HTMLInputElement | undefined = undefined;
let elDef: HTMLInputElement | undefined = undefined;
let elSpd: HTMLInputElement | undefined = undefined;
let elCri: HTMLInputElement | undefined = undefined;
let elCriDmg: HTMLInputElement | undefined = undefined;
let elEff: HTMLInputElement | undefined = undefined;
let elRes: HTMLInputElement | undefined = undefined;

const reset = () => {
	console.log('reset called');
	Object.keys(stat).forEach((key) => {
		stat[key] = 0;
	})
}

let keyMap:Record<string, HTMLInputElement | undefined>;
onMount(() => {
	keyMap = {
		KeyQ: elAtkPer,
		KeyW: elHpPer,
		KeyE: elDefPer,
		KeyA: elAtk,
		KeyS: elHp,
		KeyD: elDef,
		KeyZ: elSpd,
		KeyX: elCri,
		KeyC: elCriDmg,
		KeyV: elEff,
		KeyB: elRes,
	}
});

let isCmdPressed = false;
const handleKeydown = (e: KeyboardEvent) => {
	if (e.code === 'MetaRight' || e.code === 'ControlLeft') isCmdPressed = true;
	if (isCmdPressed) return;
	
	console.log('keydown', e.code, e.keyCode, e.which, keyMap[e.code]);
	const element = keyMap[e.code];
	const currentElement = (document.activeElement as HTMLInputElement);

	if (e.code === 'KeyT') {
		console.log('reset?', e.code);
		reset();
	}

	if (element || e.keyCode === 229) {
		e.preventDefault();
		// for composition language(like korean) make blur and focus
		currentElement.blur();
		requestAnimationFrame(() => {
			// element.focus();
			(element || currentElement).focus();
		})
	}
}
const handleKeyup = (e: KeyboardEvent) => {
	if (e.code === 'MetaRight' || e.code === 'ControlLeft') isCmdPressed = false;
}

$: sum = Object.keys(stat)
.map((key) => stat[key] * StatWeight[key])
.reduce((cur, val) => cur + val);

let isShowShortcut = false;
const toggleShortcut = () => isShowShortcut = !isShowShortcut;

$: title = $isLoading ? 'Epic7 gear score calculator' : $_('title');
</script>

<svelte:window on:keydown= {handleKeydown} on:keyup= {handleKeyup}/>
<svelte:head>
	<title>{title}</title>
	<meta name="description" content={title}/>
</svelte:head>

{#if $isLoading}
<!-- <div class="d-flex h-100 flex-column"> -->
<div class="loading-wrapper">
	<Loading/>
</div>
{:else}
<div class="h-100 d-flex flex-column app">
	<Header/>
	<Container class="text-center mt-3">
		<Row>
			<Col>
				<StatInput id="atkPer"
						shortcut="Q"
						bind:isShowShortcut={isShowShortcut}
						bind:value={stat.atkPer}
						bind:inner={elAtkPer}/>
			</Col>
			<Col>
				<StatInput id="hpPer"
						shortcut="W"
						bind:isShowShortcut={isShowShortcut}
						bind:value={stat.hpPer}
						bind:inner={elHpPer}/>
			</Col>
			<Col>
				<StatInput id="defPer"
						shortcut="E"
						bind:isShowShortcut={ isShowShortcut }
						bind:value={stat.defPer}
						bind:inner={elDefPer}/>
			</Col>
		</Row>
		<Row>
			<Col>
				<StatInput id="atk"
						shortcut="A"
						bind:isShowShortcut={ isShowShortcut }
						bind:value={stat.atk}
						bind:inner={elAtk}/>
			</Col>
			<Col>
				<StatInput id="hp"
						shortcut="S"
						bind:isShowShortcut={ isShowShortcut }
						bind:value={stat.hp}
						bind:inner={elHp}/>
			</Col>
			<Col>
				<StatInput id="def"
						shortcut="D"
						bind:isShowShortcut={ isShowShortcut }
						bind:value={stat.def}
						bind:inner={elDef}/>
			</Col>
		</Row>
		<Row>
			<Col>
				<StatInput id="spd"
						shortcut="Z"
						bind:isShowShortcut={ isShowShortcut }
						bind:value={stat.spd}
						bind:inner={elSpd}/>
			</Col>
			<Col>
				<StatInput id="cri"
						shortcut="X"
						bind:isShowShortcut={ isShowShortcut }
						bind:value={stat.cri}
						bind:inner={elCri}/>
			</Col>
			<Col>
				<StatInput id="criDmg"
						shortcut="C"
						bind:isShowShortcut={ isShowShortcut }
						bind:value={stat.criDmg}
						bind:inner={elCriDmg}/>
			</Col>
		</Row>
		<Row>
			<Col>
				<StatInput id="eff"
						shortcut="V"
						bind:isShowShortcut={ isShowShortcut }
						bind:value={stat.eff}
						bind:inner={elEff}/>
			</Col>
			<Col>
				<StatInput id="res"
						shortcut="B"
						bind:isShowShortcut={ isShowShortcut }
						bind:value={stat.res}
						bind:inner={elRes}/>
			</Col>
			<Col>
				<Label>{$_('score')}</Label>
				<div> { round2decimal(sum) } </div>
			</Col>
		</Row>
		<Row class="mt-2">
			<Col><Button on:click={ reset }>{$_('reset')}</Button></Col>
			<Col><Button on:click={ toggleShortcut }>{$_('toggleShortcut')}</Button></Col>
		</Row>
		<Row>
			<ItemAnalyzer stat={stat}/>
		</Row>
	</Container>
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