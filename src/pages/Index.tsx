import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { QuickNav } from "@/components/QuickNav";
import { Services } from "@/components/Services";
import { StrategyDetails } from "@/components/StrategyDetails";
import { Sectors } from "@/components/Sectors";
import { Values } from "@/components/Values";
import { About } from "@/components/About";
import { EngagementModels } from "@/components/EngagementModels";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <QuickNav />
      <div id="services">
        <Services />
      </div>
      <StrategyDetails />
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
