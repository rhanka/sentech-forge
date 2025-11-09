import { useTranslation } from "react-i18next";
import { Factory, Building2, Landmark, Sparkles } from "lucide-react";

export const Sectors = () => {
  const { t } = useTranslation();

  const sectors = [
    {
      icon: Factory,
      name: t("sectors.manufacturing.title"),
      subtitle: t("sectors.manufacturing.description"),
    },
    {
      icon: Landmark,
      name: t("sectors.public.title"),
      subtitle: t("sectors.public.description"),
    },
    {
      icon: Building2,
      name: t("sectors.finance.title"),
      subtitle: t("sectors.finance.description"),
    },
    {
      icon: Sparkles,
      name: t("sectors.startups.title"),
      subtitle: t("sectors.startups.description"),
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("sectors.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("sectors.subtitle")}
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
      </div>
    </section>
  );
};
