import { mount } from 'svelte';
import App from './App.svelte';
import './index.css';
import './i18n/config';

const target = document.getElementById('root');

if (!target) {
  throw new Error('Root element not found');
}

mount(App, {
  target,
});
