import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import { useStrategyContent } from "@/hooks/useContent";
import { toDynamicIconKey } from "@/lib/iconResolver";

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const importer = dynamicIconImports[name];
  if (!importer || typeof importer !== 'function') {
    console.warn(`Icon "${name}" not found in lucide-react dynamicIconImports`);
    return <div className="w-6 h-6" aria-hidden />;
  }
  
  const LucideIcon = lazy(() => 
    importer().catch((error) => {
      console.error(`Failed to load icon "${name}":`, error);
      return { default: (() => <div className="w-6 h-6" aria-hidden />) as any };
    })
  );
  
  return (
    <Suspense fallback={<div className="w-6 h-6" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export const StrategyDetails = () => {
  const { t } = useTranslation();
  const { strategies, loading } = useStrategyContent();

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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("common.loading", "Chargement...")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy) => {
              const iconName = toDynamicIconKey(strategy.icon);
              
              return (
                <Card
                  key={strategy.id}
                  className="hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border bg-card"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                      <Icon name={iconName} className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-xl">{strategy.title}</CardTitle>
                    <CardDescription className="text-sm font-semibold text-foreground/80">
                      {strategy.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {strategy.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <Card className="mt-12 bg-gradient-subtle border-border/50">
          <CardContent className="p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {t("strategy.mandateFormat.title")}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-4xl mx-auto">
              {t("strategy.mandateFormat.description")}
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  contactSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {t("strategy.mandateFormat.cta")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
