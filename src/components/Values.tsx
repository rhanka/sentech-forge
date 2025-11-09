import { Eye, Wrench, Rocket, AlertCircle, Unlock, Target, DollarSign, Users } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Vision Large",
    description: "Approche holistique tenant compte de l'ensemble de votre écosystème",
  },
  {
    icon: Wrench,
    title: "Full Stack",
    description: "De la stratégie papier jusqu'aux opérations - un interlocuteur unique",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Accompagnement de la disruption et adoption des technologies émergentes",
  },
  {
    icon: AlertCircle,
    title: "Gestion de Crise",
    description: "Expertise dans les situations complexes et les défis techniques majeurs",
  },
  {
    icon: Unlock,
    title: "Réversibilité",
    description: "No lock-in - Open source - Architectures ouvertes et pérennes",
  },
  {
    icon: Target,
    title: "Enjeux Forts",
    description: "Attiré par les challenges techniques et business à fort impact",
  },
  {
    icon: DollarSign,
    title: "ROI Driven",
    description: "Focus sur la valeur business et le retour sur investissement mesurable",
  },
  {
    icon: Users,
    title: "Flexibilité",
    description: "Positionnement complémentaire, adaptation à vos équipes et processus",
  },
];

export const Values = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Valeurs & Approche</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une philosophie pragmatique et orientée résultats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index}
                className="p-6 rounded-lg bg-card border border-border hover:border-accent transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
