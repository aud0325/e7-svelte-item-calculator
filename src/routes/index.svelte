<script lang="ts">
import { onMount, } from "svelte";
import { Button, Container, Col, Input, Label, Row } from "sveltestrap";
import Shortcut from "$lib/ShortcutLabel.svelte";
import ItemAnalyzer from "$lib/ItemAnalyzer.svelte";
import StatInput from "$lib/StatInput.svelte";
import type { Stat } from "$type/index";
import { StatWeight, round2decimal, getStatName } from "$lib/stat";

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
	if (e.code === 'MetaRight' || e.code === 'ControlLeft ') isCmdPressed = true;
	if (isCmdPressed) return;
	
	console.log(e);
	console.log('keydown', e.code, e.keyCode, e.which, keyMap[e.code]);
	const element = keyMap[e.code];
	const currentElement = (document.activeElement as HTMLInputElement);

	if (e.code === 'KeyT') {
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
	if (e.code === 'MetaRight') isCmdPressed = false;
}

$: sum = Object.keys(stat)
.map((key) => stat[key] * StatWeight[key])
.reduce((cur, val) => cur + val);

let isShowShortcut = false;
const toggleShortcut = () => isShowShortcut = !isShowShortcut;

</script>

<svelte:window on:keydown= {handleKeydown} on:keyup= {handleKeyup}/>
<svelte:head>
	<title>Turam's e7 calculator</title>
	<meta name="description" content="에픽세븐 템 점수계산기"/>
</svelte:head>


<Container class="text-center">
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
			<Label>점수</Label>
			<div> { round2decimal(sum) } </div>
		</Col>
	</Row>
	<Row>
		<Col><Button on:click={ reset }>리셋</Button></Col>
		<Col><Button on:click={ toggleShortcut }>단축키 보기</Button></Col>
	</Row>
	<Row>
		<ItemAnalyzer stat={stat}/>
	</Row>
</Container>
