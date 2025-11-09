import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t("contact.title")}
          </h2>
          <p className="text-xl mb-12 text-primary-foreground/90">
            {t("contact.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-primary-foreground/70 mb-1">{t("contact.email")}</p>
                    <a 
                      href="mailto:contact@sent-tech.ca" 
                      className="text-lg font-semibold hover:text-accent transition-colors"
                    >
                      contact@sent-tech.ca
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-primary-foreground/70 mb-1">{t("contact.name")}</p>
                    <div className="text-lg font-semibold">
                      <div>+1 438 334 96 24</div>
                      <div className="text-base">+33 6 60 73 43 15</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{t("contact.location")}</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <a href="mailto:contact@sent-tech.ca">
                <Mail className="mr-2" />
                {t("contact.send")}
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
