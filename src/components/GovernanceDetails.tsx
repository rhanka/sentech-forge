import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
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
  isOpen?: boolean;
  onClose?: () => void;
}

const GovernanceDetails = ({ isOpen = false }: GovernanceDetailsProps) => {
  const { t } = useTranslation();
  const { governances, loading } = useGovernanceContent();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <section id="governance-details" className="py-20">
        <div className="container">
          <div className="text-center">{t('common.loading')}</div>
        </div>
      </section>
    );
  }

  return (
    <Collapsible open={isOpen}>
      <CollapsibleContent>
        <section id="governance-details" className="py-20 bg-muted/30">
          <div className="container">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">{t('governance.title')}</h2>
              <Button
                variant="outline"
                onClick={() => scrollToSection('services')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('governance.backToServices')}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {governances.map((governance) => {
                const iconName = toDynamicIconKey(governance.icon);
                
                return (
                  <Card key={governance.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <Icon name={iconName} className="w-6 h-6" />
                      </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{governance.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{governance.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80">{governance.description}</p>
                </Card>
                );
              })}
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">{t('governance.mandateFormat.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('governance.mandateFormat.description')}
                </p>
                <Button 
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                >
                  {t('governance.mandateFormat.cta')}
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default GovernanceDetails;
