import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Package } from "lucide-react";

const models = [
  {
    icon: CheckCircle2,
    title: "Mandat Full",
    description: "Implication complète sur votre projet",
    features: [
      "Engagement temps plein",
      "Intégration complète à vos équipes",
      "Responsabilité end-to-end",
      "Suivi continu et adaptatif",
    ],
  },
  {
    icon: Clock,
    title: "Part-Time",
    description: "Flexibilité et expertise ciblée",
    features: [
      "2-3 jours par semaine",
      "Conseil stratégique régulier",
      "Accompagnement ponctuel",
      "Mentoring et transfert de compétences",
    ],
  },
  {
    icon: Package,
    title: "Forfaits Fixes",
    description: "Livrables définis, budget maîtrisé",
    features: [
      "Périmètre et prix définis",
      "Roadmap technologique",
      "Architecture solution",
      "POC / Prototypes",
    ],
  },
];

export const EngagementModels = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Modèles d'Engagement</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des formules adaptées à vos besoins et votre budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {models.map((model, index) => {
            const Icon = model.icon;
            return (
              <Card 
                key={index}
                className="hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{model.title}</CardTitle>
                  <CardDescription className="text-base">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">
            💡 <strong>À venir :</strong> Configurateur de micro-forfaits pour générer des propositions sur mesure directement depuis ce site
          </p>
        </div>
      </div>
    </section>
  );
};
