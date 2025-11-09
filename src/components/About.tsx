import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, GraduationCap, Mail } from "lucide-react";

export const About = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("about.title")}</h2>
            <p className="text-xl text-muted-foreground">
              {t("about.name")}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-medium mb-8">
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-lg leading-relaxed mb-6">
                {t("about.bio1")}
              </p>
              <p className="text-lg leading-relaxed mb-6">
                {t("about.bio2")}
              </p>
              <p className="text-lg leading-relaxed">
                {t("about.bio3")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">{t("about.experience")}</h3>
              <p className="text-muted-foreground">{t("about.experienceLabel")}</p>
            </div>

            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">{t("about.role")}</h3>
              <p className="text-muted-foreground">{t("about.roleLabel")}</p>
            </div>

            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">{t("about.education")}</h3>
              <p className="text-muted-foreground">{t("about.educationLabel")}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              <strong>{t("about.background")}</strong> {t("about.backgroundText")}
            </p>
            <Button variant="hero" size="lg">
              <Mail className="mr-2" />
              {t("about.cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
