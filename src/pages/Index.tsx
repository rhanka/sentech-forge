import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { StrategyDetails } from "@/components/StrategyDetails";
import GovernanceDetails from "@/components/GovernanceDetails";
import DevelopmentDetails from "@/components/DevelopmentDetails";
import OptimizationDetails from "@/components/OptimizationDetails";
import { Sectors } from "@/components/Sectors";
import { Values } from "@/components/Values";
import { About } from "@/components/About";
import { EngagementModels } from "@/components/EngagementModels";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false);
  const [isDevelopmentOpen, setIsDevelopmentOpen] = useState(false);
  const [isOptimizationOpen, setIsOptimizationOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="services">
        <Services 
          onStrategyClick={() => setIsStrategyOpen(!isStrategyOpen)} 
          onGovernanceClick={() => setIsGovernanceOpen(!isGovernanceOpen)}
          onDevelopmentClick={() => setIsDevelopmentOpen(!isDevelopmentOpen)}
          onOptimizationClick={() => setIsOptimizationOpen(!isOptimizationOpen)}
        />
      </div>
      <StrategyDetails isOpen={isStrategyOpen} onClose={() => setIsStrategyOpen(false)} />
      {isGovernanceOpen && <GovernanceDetails onBack={() => setIsGovernanceOpen(false)} />}
      {isDevelopmentOpen && <DevelopmentDetails onBack={() => setIsDevelopmentOpen(false)} />}
      {isOptimizationOpen && <OptimizationDetails onBack={() => setIsOptimizationOpen(false)} />}
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
