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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

interface StrategyDetailsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const StrategyDetails = ({ isOpen = false, onClose }: StrategyDetailsProps) => {
  const { t } = useTranslation();
  const { strategies, loading } = useStrategyContent();

  const scrollToServices = () => {
    onClose?.();
    setTimeout(() => {
      const servicesSection = document.getElementById("services");
      servicesSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onClose}>
      <CollapsibleContent>
        <section id="strategy-details" className="py-20 bg-muted/30">
          <div className="container">
            <div className="flex justify-between items-start mb-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{t("strategy.title")}</h2>
                <p className="text-muted-foreground max-w-3xl">{t("strategy.subtitle")}</p>
              </div>
              <Button
                variant="outline"
                onClick={scrollToServices}
                className="gap-2 ml-4"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("strategy.backToServices")}
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("common.loading", "Chargement...")}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {strategies.map((strategy) => {
                  const iconName = toDynamicIconKey(strategy.icon);
                  
                  return (
                    <Card key={strategy.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                          <Icon name={iconName} className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{strategy.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{strategy.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80">{strategy.description}</p>
                    </Card>
                  );
                })}
              </div>
            )}

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">{t("strategy.mandateFormat.title")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("strategy.mandateFormat.description")}
                </p>
                <Button 
                  size="lg"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    contactSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {t("strategy.mandateFormat.cta")}
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </CollapsibleContent>
    </Collapsible>
  );
};
