<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import Navigation from '@/components/Navigation.svelte';
  import Hero from '@/components/Hero.svelte';
  import Services from '@/components/Services.svelte';
  import ServiceDetails from '@/components/ServiceDetails.svelte';
  import Sectors from '@/components/Sectors.svelte';
  import Values from '@/components/Values.svelte';
  import About from '@/components/About.svelte';
  import EngagementModels from '@/components/EngagementModels.svelte';
  import Contact from '@/components/Contact.svelte';
  import Footer from '@/components/Footer.svelte';
  import Blog from '@/components/Blog.svelte';
  import { location } from '@/lib/router';

  let isStrategyOpen = false;
  let isGovernanceOpen = false;
  let isDevelopmentOpen = false;
  let isOptimizationOpen = false;
  type ServiceKey = 'strategy' | 'governance' | 'development' | 'optimization';

  let rafId: number | undefined;
  let servicesReady = false;
  let pendingHashTarget: string | null = null;
  let pendingHashNeedsServices = false;
  let suppressedInitialHash: string | null = null;
  const hashScrollOffset = 80;

  const serviceDetailHashes: Record<string, { service: ServiceKey; targetId: string }> = {
    'strategy-details': { service: 'strategy', targetId: 'strategy-details' },
    'governance-details': { service: 'governance', targetId: 'governance-details' },
    'development-details': { service: 'development', targetId: 'development-details' },
    'optimization-details': { service: 'optimization', targetId: 'optimization-details' },
    development: { service: 'development', targetId: 'development-details' },
    optimization: { service: 'optimization', targetId: 'optimization-details' },
  };

  const initialHashId =
    typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
  let isInitialHashSettled = !serviceDetailHashes[initialHashId];

  $: hash = $location.hash;

  $: if (hash) {
    const id = hash.replace('#', '');
    
    const serviceTarget = serviceDetailHashes[id];
    if (serviceTarget) {
      suppressInitialNativeHashScroll();
      openService(serviceTarget.service);
    } else {
      openService(null);
    }

    requestHashScroll(serviceTarget?.targetId ?? id, Boolean(serviceTarget));
  }

  $: if (pendingHashTarget && (!pendingHashNeedsServices || servicesReady)) {
    flushPendingHashScroll();
  }

  function openService(service: ServiceKey | null) {
    isStrategyOpen = service === 'strategy';
    isGovernanceOpen = service === 'governance';
    isDevelopmentOpen = service === 'development';
    isOptimizationOpen = service === 'optimization';
  }

  function requestHashScroll(targetId: string, needsServices: boolean) {
    pendingHashTarget = targetId;
    pendingHashNeedsServices = needsServices;

    if (!pendingHashNeedsServices || servicesReady) {
      flushPendingHashScroll();
    }
  }

  function flushPendingHashScroll() {
    const targetId = pendingHashTarget;
    if (!targetId || (pendingHashNeedsServices && !servicesReady)) return;

    pendingHashTarget = null;
    pendingHashNeedsServices = false;
    void scheduleHashScroll(targetId, isInitialHashSettled ? 'smooth' : 'auto');
  }

  async function scheduleHashScroll(targetId: string, behavior: ScrollBehavior) {
    await tick();

    if (rafId !== undefined) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - hashScrollOffset;
        window.scrollTo({ top: Math.max(top, 0), behavior });
      }
      restoreInitialHash();
      isInitialHashSettled = true;
    });
  }

  function suppressInitialNativeHashScroll() {
    if (isInitialHashSettled || suppressedInitialHash || typeof window === 'undefined') return;
    if (!window.location.hash) return;

    suppressedInitialHash = window.location.hash;
    window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}`);
  }

  function restoreInitialHash() {
    if (!suppressedInitialHash || typeof window === 'undefined') return;

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${window.location.search}${suppressedInitialHash}`
    );
    suppressedInitialHash = null;
  }

  onDestroy(() => {
    if (rafId !== undefined) {
      cancelAnimationFrame(rafId);
    }
  });

  function handleServiceClick(service: ServiceKey) {
    isStrategyOpen = service === 'strategy' ? !isStrategyOpen : false;
    isGovernanceOpen = service === 'governance' ? !isGovernanceOpen : false;
    isDevelopmentOpen = service === 'development' ? !isDevelopmentOpen : false;
    isOptimizationOpen = service === 'optimization' ? !isOptimizationOpen : false;
  }

  function handleServicesReady() {
    servicesReady = true;
  }
</script>

<div class="min-h-screen" class:invisible={!isInitialHashSettled}>
  <Navigation />
  <Hero />

  <div id="services">
    <Services
      onReady={handleServicesReady}
      onStrategyClick={() => handleServiceClick('strategy')}
      onGovernanceClick={() => handleServiceClick('governance')}
      onDevelopmentClick={() => handleServiceClick('development')}
      onOptimizationClick={() => handleServiceClick('optimization')}
    />
  </div>

  <ServiceDetails
    isOpen={isStrategyOpen}
    onClose={() => (isStrategyOpen = false)}
    serviceType="strategy"
    category="Strategy"
  />
  <ServiceDetails
    isOpen={isGovernanceOpen}
    onClose={() => (isGovernanceOpen = false)}
    serviceType="governance"
    category="Architecture"
  />
  <ServiceDetails
    isOpen={isDevelopmentOpen}
    onClose={() => (isDevelopmentOpen = false)}
    serviceType="development"
    category="Innovation"
  />
  <ServiceDetails
    isOpen={isOptimizationOpen}
    onClose={() => (isOptimizationOpen = false)}
    serviceType="optimization"
    category="Operations"
  />

  <div id="sectors">
    <Sectors />
  </div>
  <div id="values">
    <Values />
  </div>
  <div id="blog">
    <Blog />
  </div>
  <div id="engagement">
    <EngagementModels />
  </div>
  <div id="about">
    <About />
  </div>
  <div id="contact">
    <Contact />
  </div>
  <Footer />
</div>
