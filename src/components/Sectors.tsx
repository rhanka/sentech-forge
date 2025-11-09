import { Badge } from "@/components/ui/badge";
import { Factory, Building2, Landmark, Sparkles } from "lucide-react";

const sectors = [
  {
    icon: Factory,
    name: "Manufacturier",
    subtitle: "Industrie 4.0 & IoT",
  },
  {
    icon: Landmark,
    name: "Secteur Public",
    subtitle: "Transformation digitale",
  },
  {
    icon: Building2,
    name: "Services Financiers",
    subtitle: "FinTech & Innovation",
  },
  {
    icon: Sparkles,
    name: "Startups",
    subtitle: "Disruption & Scale-up",
  },
];

const expertise = [
  "Grande Entreprise",
  "PME",
  "Startups",
  "Aéronautique",
  "Défense",
  "Renseignement",
  "Justice",
  "Immigration",
  "Sécurité",
];

export const Sectors = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Secteurs d'Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            23 ans d'expérience dans des environnements exigeants et complexes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-medium transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{sector.name}</h3>
                <p className="text-muted-foreground">{sector.subtitle}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-lg mb-4 text-muted-foreground">Expérience approfondie dans :</p>
          <div className="flex flex-wrap justify-center gap-3">
            {expertise.map((item, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-base px-4 py-2"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
