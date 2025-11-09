import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import { useServiceContent } from "@/hooks/useContent";

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);
  return (
    <Suspense fallback={<div className="w-6 h-6" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export const Services = () => {
  const { t } = useTranslation();
  const { services, loading } = useServiceContent();

  const scrollToStrategyDetails = () => {
    const strategySection = document.getElementById("strategy-details");
    strategySection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("services.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("common.loading", "Chargement...")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => {
              const iconName = service.metadata.icon.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '') as keyof typeof dynamicIconImports;
              const isClickable = service.metadata.clickable;
              
              return (
                <Card 
                  key={service.metadata.id} 
                  className={`hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border bg-card ${
                    isClickable ? 'cursor-pointer' : ''
                  }`}
                  onClick={isClickable ? scrollToStrategyDetails : undefined}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                      <Icon name={iconName} className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
