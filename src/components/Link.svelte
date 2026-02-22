<script lang="ts">
  import { navigate } from '@/lib/router';

  export let href = '';
  export let className = '';
  export let target: string | undefined = undefined;
  export let rel: string | undefined = undefined;

  const hasModifier = (event: MouseEvent) =>
    event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

  const isInternal = (value: string) => value.startsWith('/') || value.startsWith('#');

  function handleClick(event: MouseEvent) {
    if (!isInternal(href)) return;
    if (target && target !== '_self') return;
    if (event.defaultPrevented || event.button !== 0 || hasModifier(event)) return;

    event.preventDefault();
    navigate(href);
  }
</script>

<a {href} class={className} {target} {rel} on:click={handleClick}>
  <slot />
</a>
