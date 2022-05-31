<script lang="ts">
import { Input, Label } from "sveltestrap";
import Shortcut from "$lib/ShortcutLabel.svelte";
import { getStatName } from "$lib/stat";

export let id: string;
export let value: string;
export let shortcut: string;
export let isShowShortcut: boolean;
export let inner: HTMLInputElement | undefined = undefined;

const selectOnFocus = (e: FocusEvent) => {
	(e.target as HTMLInputElement)?.select();
}
</script>

<Label for={id}>
    {getStatName(id)}
    <Shortcut value={shortcut} show={ isShowShortcut }/>
</Label>
<Input type="number" name={id}
    on:focus={ selectOnFocus }
    bind:value={ value }
    bind:inner = { inner }/>