import { useTranslation } from "react-i18next";
import { Wrench, Rocket, Unlock, DollarSign, Users, Eye } from "lucide-react";

export const Values = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Wrench,
      title: t("values.fullstack.title"),
      description: t("values.fullstack.description"),
    },
    {
      icon: Rocket,
      title: t("values.innovation.title"),
      description: t("values.innovation.description"),
    },
    {
      icon: Unlock,
      title: t("values.openness.title"),
      description: t("values.openness.description"),
    },
    {
      icon: DollarSign,
      title: t("values.roi.title"),
      description: t("values.roi.description"),
    },
    {
      icon: Users,
      title: t("values.flexibility.title"),
      description: t("values.flexibility.description"),
    },
    {
      icon: Eye,
      title: t("values.pragmatic.title"),
      description: t("values.pragmatic.description"),
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("values.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("values.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
