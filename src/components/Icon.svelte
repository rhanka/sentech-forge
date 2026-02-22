<script lang="ts">
  import * as icons from 'lucide-svelte';
  import { toLucideIconName } from '@/lib/iconResolver';

  export let name = 'circle';
  export let className = '';
  export let strokeWidth: number | undefined = undefined;

  $: resolvedName = toLucideIconName(name);
  $: IconComponent = (icons as Record<string, unknown>)[resolvedName] as
    | typeof icons.Circle
    | undefined;
</script>

{#if IconComponent}
  <svelte:component this={IconComponent} class={className} {strokeWidth} aria-hidden="true" />
{:else}
  <icons.Circle class={className} {strokeWidth} aria-hidden="true" />
{/if}
