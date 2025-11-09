import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Factory, Heart, Handshake } from "lucide-react";

export const QuickNav = () => {
  const { t } = useTranslation();

  const quickLinks = [
    {
      icon: Lightbulb,
      title: t("services.title"),
      subtitle: t("quicknav.servicesSubtitle"),
      targetId: "services",
    },
    {
      icon: Factory,
      title: t("sectors.title"),
      subtitle: t("quicknav.sectorsSubtitle"),
      targetId: "sectors",
    },
    {
      icon: Heart,
      title: t("values.title"),
      subtitle: t("quicknav.valuesSubtitle"),
      targetId: "values",
    },
    {
      icon: Handshake,
      title: t("engagement.title"),
      subtitle: t("quicknav.engagementSubtitle"),
      targetId: "engagement",
    },
  ];

  const scrollToSection = (targetId: string) => {
    const section = document.getElementById(targetId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border bg-card"
                onClick={() => scrollToSection(link.targetId)}
              >
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl">{link.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{link.subtitle}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
