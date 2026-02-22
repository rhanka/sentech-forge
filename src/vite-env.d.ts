/// <reference types="vite/client" />
/// <reference types="svelte" />

declare module '*.svelte';

declare module '*.md?raw' {
  const content: string;
  export default content;
}
