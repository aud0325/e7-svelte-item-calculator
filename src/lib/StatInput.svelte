<script lang="ts">
import { Input, InputGroup, InputGroupText, Label } from "sveltestrap";
import Shortcut from "$lib/ShortcutLabel.svelte";
import { getStatName, round1decimal, StatWeight } from "$lib/stat";

export let id: string;
export let value: number;
export let shortcut: string;
export let isShowShortcut: boolean;
export let inner: HTMLInputElement | undefined = undefined;

$:score = round1decimal(value * StatWeight[id]);

const selectOnFocus = (e: FocusEvent) => {
	(e.target as HTMLInputElement)?.select();
}
</script>

<Label for={id}>
    {getStatName(id)}
    <Shortcut value={shortcut} show={ isShowShortcut }/>
</Label>
<InputGroup>
    <Input type="number" name={id}
        on:focus={ selectOnFocus }
        bind:value={ value }
        bind:inner = { inner }/>
    {#if score}
    <InputGroupText>{ score }</InputGroupText>
    {/if}
</InputGroup>