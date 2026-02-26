import { writable } from 'svelte/store';

export interface LocationState {
  pathname: string;
  search: string;
  hash: string;
}

const getLocationState = (): LocationState => {
  if (typeof window === 'undefined') {
    return { pathname: '/', search: '', hash: '' };
  }

  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
};

export const location = writable<LocationState>(getLocationState());

const notify = () => {
  location.set(getLocationState());
};

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', notify);
  window.addEventListener('hashchange', notify);
}

export function navigate(to: string, replace = false) {
  if (typeof window === 'undefined') return;

  const url = new URL(to, window.location.href);
  const target = `${url.pathname}${url.search}${url.hash}`;

  if (replace) {
    window.history.replaceState({}, '', target);
  } else {
    window.history.pushState({}, '', target);
  }

  notify();
}
