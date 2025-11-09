import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-tech.jpg";
import { ArrowRight, Mail } from "lucide-react";

export const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            {t("hero.title")}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-primary-foreground/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="lg" className="group">
              {t("hero.cta1")}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline-hero" size="lg">
              <Mail className="mr-2" />
              {t("hero.cta2")}
            </Button>
          </div>
        </div>
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
