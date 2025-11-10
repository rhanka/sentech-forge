import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { StrategyDetails } from "@/components/StrategyDetails";
import { Sectors } from "@/components/Sectors";
import { Values } from "@/components/Values";
import { About } from "@/components/About";
import { EngagementModels } from "@/components/EngagementModels";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="services">
        <Services onStrategyClick={() => setIsStrategyOpen(!isStrategyOpen)} />
      </div>
      <StrategyDetails isOpen={isStrategyOpen} onClose={() => setIsStrategyOpen(false)} />
      <div id="sectors">
        <Sectors />
      </div>
      <div id="values">
        <Values />
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
