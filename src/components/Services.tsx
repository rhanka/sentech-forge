import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Network, Code, Cog, TrendingUp, Shield } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Stratégie",
    description: "Vision stratégique IT, Data & IA - Make or Buy - Appui RFI/RFP - Roadmaps technologiques",
  },
  {
    icon: Shield,
    title: "Gouvernance",
    description: "Mise en place de frameworks de gouvernance IT et Data - Conformité et sécurité - Gestion des risques",
  },
  {
    icon: Network,
    title: "Architecture",
    description: "Architecture d'entreprise, solution et infrastructure - Cloud native - Architectures ouvertes et réversibles",
  },
  {
    icon: Code,
    title: "Développement Innovant",
    description: "Applications modernes - IA générative - Machine Learning - Proof of Concepts - Prototypage rapide",
  },
  {
    icon: Cog,
    title: "Optimisation Opérationnelle",
    description: "MLOps - DataOps - DevOps - Automatisation - Scalabilité - Performance",
  },
  {
    icon: TrendingUp,
    title: "Business Value",
    description: "Approche ROI-driven - Mesure de la valeur ajoutée - Optimisation continue - Gestion de crise",
  },
];

export const Services = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Services & Expertises</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une approche full-stack de la stratégie aux opérations, pour transformer vos ambitions en réalité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border bg-card"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
