import { useTranslation } from "react-i18next";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import { useSectorContent } from "@/hooks/useContent";

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

export const Sectors = () => {
  const { t } = useTranslation();
  const { sectors, loading } = useSectorContent();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("sectors.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("sectors.subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("common.loading", "Chargement...")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {sectors.map((sector) => {
              const iconName = sector.icon.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([a-zA-Z])([0-9])/g, '$1-$2').toLowerCase() as keyof typeof dynamicIconImports;
              
              return (
                <div 
                  key={sector.id}
                  className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-medium transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon name={iconName} className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{sector.title}</h3>
                  <p className="text-muted-foreground">{sector.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
