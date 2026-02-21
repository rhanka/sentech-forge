import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ServiceDetails } from "@/components/ServiceDetails";
import { Sectors } from "@/components/Sectors";
import { Values } from "@/components/Values";
import { About } from "@/components/About";
import { EngagementModels } from "@/components/EngagementModels";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Blog } from "@/components/Blog";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false);
  const [isDevelopmentOpen, setIsDevelopmentOpen] = useState(false);
  const [isOptimizationOpen, setIsOptimizationOpen] = useState(false);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");

    const tryScroll = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    const raf = window.requestAnimationFrame(tryScroll);
    return () => window.cancelAnimationFrame(raf);
  }, [location.hash]);


  const handleServiceClick = (service: 'strategy' | 'governance' | 'development' | 'optimization') => {
    setIsStrategyOpen(service === 'strategy' ? !isStrategyOpen : false);
    setIsGovernanceOpen(service === 'governance' ? !isGovernanceOpen : false);
    setIsDevelopmentOpen(service === 'development' ? !isDevelopmentOpen : false);
    setIsOptimizationOpen(service === 'optimization' ? !isOptimizationOpen : false);
  };

  return (
    <div className="min-h-screen">
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
        onClose={() => setIsStrategyOpen(false)}
        serviceType="strategy"
        category="Strategy"
      />
      <ServiceDetails 
        isOpen={isGovernanceOpen} 
        onClose={() => setIsGovernanceOpen(false)}
        serviceType="governance"
        category="Architecture"
      />
      <ServiceDetails 
        isOpen={isDevelopmentOpen} 
        onClose={() => setIsDevelopmentOpen(false)}
        serviceType="development"
        category="Innovation"
      />
      <ServiceDetails 
        isOpen={isOptimizationOpen} 
        onClose={() => setIsOptimizationOpen(false)}
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
  );
};

export default Index;
