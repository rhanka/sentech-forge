import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import { useStrategyContent } from "@/hooks/useContent";
import { toDynamicIconKey } from "@/lib/iconResolver";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          <Accordion type="single" collapsible className="space-y-4">
            {strategies.map((strategy) => {
              const iconName = toDynamicIconKey(strategy.icon);
              
              return (
                <AccordionItem key={strategy.id} value={strategy.id} className="border-none">
                  <Card className="overflow-hidden border-border bg-card">
                    <AccordionTrigger className="hover:no-underline px-6 py-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                          <Icon name={iconName} className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <div className="text-left flex-1">
                          <h3 className="text-xl font-semibold">{strategy.title}</h3>
                          <p className="text-sm font-semibold text-foreground/80 mt-1">
                            {strategy.subtitle}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {strategy.description}
                      </p>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>
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
