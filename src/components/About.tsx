import { Button } from "@/components/ui/button";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import { useAboutContent } from "@/hooks/useMarkdownContent";
import { Mail } from "lucide-react";

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const importer = dynamicIconImports[name];
  if (!importer || typeof importer !== 'function') {
    console.warn(`Icon "${name}" not found in lucide-react dynamicIconImports`);
    return <div className="w-7 h-7" aria-hidden />;
  }
  
  const LucideIcon = lazy(() => 
    importer().catch((error) => {
      console.error(`Failed to load icon "${name}":`, error);
      return { default: (() => <div className="w-7 h-7" aria-hidden />) as any };
    })
  );
  
  return (
    <Suspense fallback={<div className="w-7 h-7" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export const About = () => {
  const { sections, loading } = useAboutContent();

  if (loading) {
    return (
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  const mainSection = sections.find(s => s.id === 'about');
  const bioSection = sections.find(s => s.content.startsWith('# Bio'));
  const statSections = sections.filter(s => ['experience', 'role', 'education'].includes(s.id));
  const backgroundSection = sections.find(s => s.content.startsWith('# Background'));

  const bioParagraphs = bioSection?.content
    .replace('# Bio\n\n', '')
    .split('\n\n')
    .filter(p => p.trim());

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">{mainSection?.metadata.title}</h2>
            <p className="text-xl text-muted-foreground">
              {mainSection?.metadata.name}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-medium mb-8">
            <div className="prose prose-lg max-w-none text-foreground">
              {bioParagraphs?.map((paragraph, idx) => (
                <p key={idx} className="text-lg leading-relaxed mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statSections.sort((a, b) => a.metadata.order - b.metadata.order).map((stat) => {
              const iconName = stat.metadata.icon.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([a-zA-Z])([0-9])/g, '$1-$2').toLowerCase() as keyof typeof dynamicIconImports;
              
              return (
                <div key={stat.id} className="text-center p-6 bg-card border border-border rounded-lg">
                  <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                    <Icon name={iconName} className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.metadata.value}</h3>
                  <p className="text-muted-foreground">{stat.metadata.label}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              {backgroundSection?.content.replace('# Background\n\n', '')}
            </p>
            <Button variant="hero" size="lg" onClick={() => {
              const contactSection = document.getElementById("contact");
              contactSection?.scrollIntoView({ behavior: "smooth" });
            }}>
              <Mail className="mr-2" />
              Contactez-moi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
