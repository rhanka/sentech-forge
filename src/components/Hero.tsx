import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-tech.jpg";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import { useHeroContent } from "@/hooks/useMarkdownContent";

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const importer = dynamicIconImports[name];
  if (!importer || typeof importer !== 'function') {
    console.warn(`Icon "${name}" not found in lucide-react dynamicIconImports`);
    return <div className="w-5 h-5" aria-hidden />;
  }
  
  const LucideIcon = lazy(() => 
    importer().catch((error) => {
      console.error(`Failed to load icon "${name}":`, error);
      return { default: (() => <div className="w-5 h-5" aria-hidden />) as any };
    })
  );
  
  return (
    <Suspense fallback={<div className="w-5 h-5" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export const Hero = () => {
  const { main, quicklinks, loading } = useHeroContent();

  const scrollToSection = (targetId: string) => {
    const section = document.getElementById(targetId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {loading || !main ? (
          <div className="text-center text-primary-foreground">Loading...</div>
        ) : (
          <>
            <div className="max-w-4xl mx-auto text-center text-primary-foreground mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                {main.metadata.title}
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {main.metadata.subtitle}
              </p>
            </div>

            {/* Quick Navigation Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {quicklinks.map((link) => {
                const rawIcon = link.metadata?.icon as string | undefined;
                const iconName = (
                  rawIcon
                    ? rawIcon
                        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                        .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
                        .toLowerCase()
                    : 'circle'
                ) as keyof typeof dynamicIconImports;
                const items = link.content.split('\n').filter(line => line.startsWith('- ')).map(line => line.substring(2));
                
                return (
                  <Card
                    key={link.id}
                    className="cursor-pointer hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/95 backdrop-blur"
                    onClick={() => scrollToSection(link.metadata.targetId)}
                  >
                    <CardHeader className="pb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center mb-3">
                        <Icon name={iconName} className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <CardTitle className="text-lg">{link.content.split('\n')[0].replace('# ', '')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-xs text-muted-foreground flex items-start">
                            <span className="mr-1.5 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-foreground/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/40 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
