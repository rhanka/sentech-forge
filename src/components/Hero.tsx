import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-tech.jpg";
import { Lightbulb, Factory, Heart, Handshake } from "lucide-react";

export const Hero = () => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            {t("hero.title")}
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/95 backdrop-blur"
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-foreground/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/40 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
