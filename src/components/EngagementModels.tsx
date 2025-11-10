import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import { useEngagementContent } from "@/hooks/useContent";
import { toDynamicIconKey } from "@/lib/iconResolver";

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const importer = dynamicIconImports[name];
  if (!importer || typeof importer !== 'function') {
    console.warn(`Icon "${name}" not found in lucide-react dynamicIconImports`);
    return <div className="w-8 h-8" aria-hidden />;
  }
  
  const LucideIcon = lazy(() => 
    importer().catch((error) => {
      console.error(`Failed to load icon "${name}":`, error);
      return { default: (() => <div className="w-8 h-8" aria-hidden />) as any };
    })
  );
  
  return (
    <Suspense fallback={<div className="w-8 h-8" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export const EngagementModels = () => {
  const { t } = useTranslation();
  const { engagements, loading } = useEngagementContent();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("engagement.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("engagement.subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("common.loading", "Chargement...")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {engagements.map((engagement) => {
              const iconName = toDynamicIconKey(engagement.icon);
              
              return (
                <Card 
                  key={engagement.id}
                  className="hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border"
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                      <Icon name={iconName} className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl">{engagement.title}</CardTitle>
                    <CardDescription className="text-base">
                      {engagement.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold text-muted-foreground mb-3">{t("engagement.fulltime.ideal")}</p>
                    <ul className="space-y-3">
                      {(engagement.features || []).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
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
