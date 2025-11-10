import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import { useContactContent } from "@/hooks/useMarkdownContent";
import { MapPin } from "lucide-react";

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

export const Contact = () => {
  const { sections, loading } = useContactContent();

  if (loading) {
    return (
      <section className="py-24 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  const mainSection = sections.find(s => s.id === 'contact');
  const cardSections = sections.filter(s => ['email', 'phone'].includes(s.id));
  const socialSections = sections.filter(s => ['send', 'linkedin', 'github'].includes(s.id));

  return (
    <section className="py-24 bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {mainSection?.metadata.title}
          </h2>
          <p className="text-xl mb-12 text-primary-foreground/90">
            {mainSection?.metadata.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {cardSections.sort((a, b) => a.metadata.order - b.metadata.order).map((card) => {
              const iconName = card.metadata.icon.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([a-zA-Z])([0-9])/g, '$1-$2').toLowerCase() as keyof typeof dynamicIconImports;
              
              return (
                <Card key={card.id} className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <Icon name={iconName} className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-primary-foreground/80 mb-1">{card.metadata.label}</p>
                        {card.id === 'email' ? (
                          <a 
                            href={card.metadata.link}
                            className="text-lg font-semibold text-primary-foreground hover:text-accent transition-colors"
                          >
                            {card.metadata.value}
                          </a>
                        ) : (
                          <div className="text-lg font-semibold text-primary-foreground">
                            <div>{card.metadata.value}</div>
                            {card.metadata.valueSecondary && (
                              <div className="text-base">{card.metadata.valueSecondary}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{mainSection?.metadata.location}</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            {socialSections.sort((a, b) => a.metadata.order - b.metadata.order).map((social) => {
              const iconName = social.metadata.icon.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([a-zA-Z])([0-9])/g, '$1-$2').toLowerCase() as keyof typeof dynamicIconImports;
              
              return (
                <Button 
                  key={social.id}
                  variant="outline"
                  size="lg"
                  className="bg-primary-foreground/10 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/60"
                  asChild
                >
                  <a href={social.metadata.link} target={social.id !== 'send' ? '_blank' : undefined} rel={social.id !== 'send' ? 'noopener noreferrer' : undefined}>
                    <Icon name={iconName} className="mr-2 w-5 h-5" />
                    {social.metadata.label}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
