<script lang="ts">
import { onMount, SvelteComponentTyped, tick } from "svelte";
import { Button, Container, Col, Input, Label, Row } from "sveltestrap";
import Shortcut from "../lib/ShortcutLabel.svelte";

interface Stat {
	[index:string]: number
	atkPer: number
	hpPer: number
	defPer: number
	atk: number
	hp: number
	def: number
	spd: number
	cri: number
	criDmg: number
	eff: number
	res: number
}

const stat = <Stat>{
	atkPer: 0,
	hpPer: 0,
	defPer: 0,
	atk: 0,
	hp: 0,
	def: 0,
	spd: 0,
	cri: 0,
	criDmg: 0,
	eff: 0,
	res: 0,
}
const statWeight = <Stat>{
	atkPer: 1,
	hpPer: 1,
	defPer: 1,
	atk: (3.46 / 39),
	hp: (3.09 / 174),
	def: (4.99 / 31),
	spd: 2,
	cri: 1.6,
	criDmg: (8/7),
	eff: 1,
	res: 1,
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
	if (e.code === 'MetaRight') isCmdPressed = true;
	if (isCmdPressed) return;

	console.log(e);
	console.log('keydown', e.code, e.keyCode, e.which, keyMap[e.code]);
	const element = keyMap[e.code];
	const currentElement = (document.activeElement as HTMLInputElement);
	if (element || e.keyCode === 229) {
		e.preventDefault();
		// for composition language(like korean) make blur and focus
		currentElement.blur();
		requestAnimationFrame(() => {
			// element.focus();
			(element || currentElement).select();
		})
	}
	else if (e.code === 'KeyT') {
		reset();
	}
}
const handleKeyup = (e: KeyboardEvent) => {
	if (e.code === 'MetaRight') isCmdPressed = false;
}

$: sum = Object.keys(stat)
.map((key) => stat[key] * statWeight[key])
.reduce((cur, val) => cur + val);

let isShowShortcut = false;
const toggleShortcut = () => isShowShortcut = !isShowShortcut;

</script>

<svelte:window on:keydown= {handleKeydown} on:keyup= {handleKeyup}/>

<Container class="text-center">
	<Row>
		<Col>
			<Label for="atkPer">공격력%<Shortcut value="Q" show={ isShowShortcut }/></Label>
			<Input type="number" name="atkPer" bind:value={stat.atkPer} bind:inner = { elAtkPer }/>
		</Col>
		<Col>
			<Label for="hpPer">체력%<Shortcut value="W" show={ isShowShortcut }/></Label>
			<Input type="number" name="hpPer" bind:value={stat.hpPer} bind:inner = {elHpPer}/>
		</Col>
		<Col>
			<Label for="defPer">방어력%<Shortcut value="E" show={ isShowShortcut }/></Label>
			<Input type="number" name="defPer" bind:value={stat.defPer} bind:inner = {elDefPer}/>
		</Col>
	</Row>
	<Row>
		<Col>
			<Label for="atk">공격력<Shortcut value="A" show={ isShowShortcut }/></Label>
			<Input type="number" name="atk" bind:value={stat.atk} bind:inner = {elAtk}/>
		</Col>
		<Col>
			<Label for="hp">체력<Shortcut value="S" show={ isShowShortcut }/></Label>
			<Input type="number" name="hp" bind:value={stat.hp} bind:inner = {elHp}/>
		</Col>
		<Col>
			<Label for="def">방어력<Shortcut value="D" show={ isShowShortcut }/></Label>
			<Input type="number" name="def" bind:value={stat.def} bind:inner = {elDef}/>
		</Col>
	</Row>
	<Row>
		<Col>
			<Label for="spd">속도<Shortcut value="Z" show={ isShowShortcut }/></Label>
			<Input type="number" name="spd" bind:value={stat.spd} bind:inner = {elSpd}/>
		</Col>
		<Col>
			<Label for="cri">치확<Shortcut value="X" show={ isShowShortcut }/></Label>
			<Input type="number" name="cri" bind:value={stat.cri} bind:inner = {elCri}/>
		</Col>
		<Col>
			<Label for="criDmg">치피<Shortcut value="C" show={ isShowShortcut }/></Label>
			<Input type="number" name="criDmg" bind:value={stat.criDmg} bind:inner = {elCriDmg}/>
		</Col>
	</Row>
	<Row>
		<Col>
			<Label for="eff">효적<Shortcut value="V" show={ isShowShortcut }/></Label>
			<Input type="number" name="eff" bind:value={stat.eff} bind:inner = {elEff}/>
		</Col>
		<Col>
			<Label for="res">효저<Shortcut value="B" show={ isShowShortcut }/></Label>
			<Input type="number" name="res" bind:value={stat.res} bind:inner = {elRes}/>
		</Col>
		<Col>
			<Label>점수</Label>
			<div> { sum } </div>
		</Col>
	</Row>
	<Row>
		<Col><Button on:click={ reset }>리셋</Button></Col>
		<Col><Button on:click={ toggleShortcut }>단축키 보기</Button></Col>
	</Row>
</Container>
