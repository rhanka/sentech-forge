import { useTranslation } from "react-i18next";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import { useValueContent } from "@/hooks/useContent";

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

export const Values = () => {
  const { t } = useTranslation();
  const { values, loading } = useValueContent();

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("values.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("values.subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("common.loading", "Chargement...")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => {
              const iconName = value.icon.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '') as keyof typeof dynamicIconImports;
              
              return (
                <div 
                  key={value.id}
                  className="p-6 rounded-lg bg-card border border-border hover:border-accent transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon name={iconName} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
