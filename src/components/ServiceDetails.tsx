import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense, useEffect } from 'react';
import { LucideProps } from 'lucide-react';
import { toDynamicIconKey } from "@/lib/iconResolver";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useBusinessCases } from "@/hooks/useBusinessCases";

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

interface ServiceDetailsProps {
  isOpen?: boolean;
  onClose?: () => void;
  serviceType: 'strategy' | 'governance' | 'development' | 'optimization';
  category: 'Strategy' | 'Architecture' | 'Innovation' | 'Operations';
}

export const ServiceDetails = ({ isOpen = false, onClose, serviceType, category }: ServiceDetailsProps) => {
  const { t } = useTranslation();
  const { items, loading } = useBusinessCases(category);

  const scrollToServices = () => {
    onClose?.();
    setTimeout(() => {
      const servicesSection = document.getElementById("services");
      servicesSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Scroll to the section when opened
  useEffect(() => {
    if (isOpen && !loading) {
      // Wait for CollapsibleContent animation
      setTimeout(() => {
        const section = document.getElementById(`${serviceType}-details`);
        if (section) {
          const offset = 80;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [isOpen, serviceType, loading]);

  return (
    <Collapsible open={isOpen} onOpenChange={onClose}>
      <CollapsibleContent>
        <section id={`${serviceType}-details`} className="py-20 bg-muted/30">
          <div className="container">
            <div className="flex justify-between items-start mb-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{t(`${serviceType}.title`)}</h2>
                <p className="text-muted-foreground max-w-3xl">{t(`${serviceType}.subtitle`)}</p>
              </div>
              <Button
                variant="outline"
                onClick={scrollToServices}
                className="gap-2 ml-4"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("common.backToServices")}
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("common.loading")}</p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucune expérience disponible</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {items.map((item) => {
                  const iconName = toDynamicIconKey(item.icon);
                  
                  return (
                    <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                          <Icon name={iconName} className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{item.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80">{item.description}</p>
                    </Card>
                  );
                })}
              </div>
            )}

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">{t(`${serviceType}.mandateFormat.title`)}</h3>
                <p className="text-muted-foreground mb-6">
                  {t(`${serviceType}.mandateFormat.description`)}
                </p>
                <Button 
                  size="lg"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    contactSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {t(`${serviceType}.mandateFormat.cta`)}
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </CollapsibleContent>
    </Collapsible>
  );
};
