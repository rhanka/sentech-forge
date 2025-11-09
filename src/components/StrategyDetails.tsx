import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Factory, Shield, Ship, Briefcase, Scale, TrendingUp, AlertTriangle } from "lucide-react";

export const StrategyDetails = () => {
  const { t } = useTranslation();

  const projects = [
    {
      icon: Scale,
      title: t("strategy.justice.title"),
      subtitle: t("strategy.justice.subtitle"),
      description: t("strategy.justice.description"),
    },
    {
      icon: Factory,
      title: t("strategy.airbus.title"),
      subtitle: t("strategy.airbus.subtitle"),
      description: t("strategy.airbus.description"),
    },
    {
      icon: Building2,
      title: t("strategy.separation.title"),
      subtitle: t("strategy.separation.subtitle"),
      description: t("strategy.separation.description"),
    },
    {
      icon: Shield,
      title: t("strategy.interior.title"),
      subtitle: t("strategy.interior.subtitle"),
      description: t("strategy.interior.description"),
    },
    {
      icon: TrendingUp,
      title: t("strategy.riotinto.title"),
      subtitle: t("strategy.riotinto.subtitle"),
      description: t("strategy.riotinto.description"),
    },
    {
      icon: Ship,
      title: t("strategy.maritime.title"),
      subtitle: t("strategy.maritime.subtitle"),
      description: t("strategy.maritime.description"),
    },
    {
      icon: Briefcase,
      title: t("strategy.nethris.title"),
      subtitle: t("strategy.nethris.subtitle"),
      description: t("strategy.nethris.description"),
    },
    {
      icon: AlertTriangle,
      title: t("strategy.curateur.title"),
      subtitle: t("strategy.curateur.subtitle"),
      description: t("strategy.curateur.description"),
    },
  ];

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    servicesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="strategy-details" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={scrollToServices}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("strategy.backToServices")}
          </Button>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t("strategy.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t("strategy.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border bg-card"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-foreground/80">
                    {project.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
