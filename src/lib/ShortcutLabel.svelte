<script lang="ts">
export let value: string;
export let show: boolean;
</script>

{ #if show }
<span> ({ value })</span>
{/if}