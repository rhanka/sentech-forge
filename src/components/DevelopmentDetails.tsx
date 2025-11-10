import { useTranslation } from 'react-i18next';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useDevelopmentContent } from '@/hooks/useContent';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  const toDynamicIconKey = (name: string): keyof typeof dynamicIconImports => {
    const iconKey = name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    return iconKey as keyof typeof dynamicIconImports;
  };

  const iconKey = toDynamicIconKey(name);
  
  if (!dynamicIconImports[iconKey]) {
    console.warn(`Icon "${name}" not found in dynamicIconImports`);
    return null;
  }

  const LucideIcon = lazy(dynamicIconImports[iconKey]);

  return (
    <Suspense fallback={<div className="w-12 h-12" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

interface DevelopmentDetailsProps {
  onBack: () => void;
}

export default function DevelopmentDetails({ onBack }: DevelopmentDetailsProps) {
  const { t } = useTranslation();
  const { developments, loading } = useDevelopmentContent();

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
    <section id="development" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              {t('development.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('development.subtitle')}
            </p>
          </div>
          <Button onClick={onBack} variant="outline">
            {t('common.backToServices')}
          </Button>
        </div>

        <Card className="mb-12 bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              {t('development.format.title')}
            </h3>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                {t('development.format.intro')}
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {t('development.format.approach.title')}
                  </h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>{t('development.format.approach.item1')}</li>
                    <li>{t('development.format.approach.item2')}</li>
                    <li>{t('development.format.approach.item3')}</li>
                    <li>{t('development.format.approach.item4')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {t('development.format.deliverables.title')}
                  </h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>{t('development.format.deliverables.item1')}</li>
                    <li>{t('development.format.deliverables.item2')}</li>
                    <li>{t('development.format.deliverables.item3')}</li>
                    <li>{t('development.format.deliverables.item4')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developments.map((dev) => (
            <Card
              key={dev.id}
              className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur border-border/50"
            >
              <CardContent className="p-6">
                <div className="mb-4 text-primary">
                  <Icon name={dev.icon} size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {dev.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{dev.subtitle}</p>
                <p className="text-muted-foreground">{dev.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
