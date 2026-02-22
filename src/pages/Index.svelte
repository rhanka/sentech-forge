<script lang="ts">
  import { onDestroy } from 'svelte';
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
  let rafId: number | undefined;

  $: hash = $location.hash;

  $: if (hash) {
    const id = hash.replace('#', '');
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  onDestroy(() => {
    cancelAnimationFrame(rafId);
  });

  function handleServiceClick(service: 'strategy' | 'governance' | 'development' | 'optimization') {
    isStrategyOpen = service === 'strategy' ? !isStrategyOpen : false;
    isGovernanceOpen = service === 'governance' ? !isGovernanceOpen : false;
    isDevelopmentOpen = service === 'development' ? !isDevelopmentOpen : false;
    isOptimizationOpen = service === 'optimization' ? !isOptimizationOpen : false;
  }
</script>

<div class="min-h-screen">
  <Navigation />
  <Hero />

  <div id="services">
    <Services
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
