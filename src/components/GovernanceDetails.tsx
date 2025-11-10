import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGovernanceContent } from '@/hooks/useContent';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import { toDynamicIconKey } from '@/lib/iconResolver';

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

interface GovernanceDetailsProps {
  onBack: () => void;
}

const GovernanceDetails = ({ onBack }: GovernanceDetailsProps) => {
  const { t } = useTranslation();
  const { governances, loading } = useGovernanceContent();

  if (loading) {
    return (
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center">{t('common.loading')}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="governance" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              {t('governance.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('governance.subtitle')}
            </p>
          </div>
          <Button onClick={onBack} variant="outline">
            {t('common.backToServices')}
          </Button>
        </div>

        <Card className="mb-12 bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              {t('governance.format.title')}
            </h3>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                {t('governance.format.intro')}
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {t('governance.format.approach.title')}
                  </h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>{t('governance.format.approach.item1')}</li>
                    <li>{t('governance.format.approach.item2')}</li>
                    <li>{t('governance.format.approach.item3')}</li>
                    <li>{t('governance.format.approach.item4')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {t('governance.format.deliverables.title')}
                  </h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>{t('governance.format.deliverables.item1')}</li>
                    <li>{t('governance.format.deliverables.item2')}</li>
                    <li>{t('governance.format.deliverables.item3')}</li>
                    <li>{t('governance.format.deliverables.item4')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {governances.map((gov) => {
            const iconName = toDynamicIconKey(gov.icon);
            
            return (
              <Card
                key={gov.id}
                className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur border-border/50"
              >
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">
                    <Icon name={iconName} size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {gov.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{gov.subtitle}</p>
                  <p className="text-muted-foreground">{gov.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GovernanceDetails;
