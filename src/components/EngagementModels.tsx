import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Package } from "lucide-react";

export const EngagementModels = () => {
  const { t } = useTranslation();

  const models = [
    {
      icon: CheckCircle2,
      title: t("engagement.fulltime.title"),
      description: t("engagement.fulltime.description"),
      features: [
        t("engagement.fulltime.use1"),
        t("engagement.fulltime.use2"),
        t("engagement.fulltime.use3"),
      ],
    },
    {
      icon: Clock,
      title: t("engagement.parttime.title"),
      description: t("engagement.parttime.description"),
      features: [
        t("engagement.parttime.use1"),
        t("engagement.parttime.use2"),
        t("engagement.parttime.use3"),
      ],
    },
    {
      icon: Package,
      title: t("engagement.fixed.title"),
      description: t("engagement.fixed.description"),
      features: [
        t("engagement.fixed.use1"),
        t("engagement.fixed.use2"),
        t("engagement.fixed.use3"),
      ],
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("engagement.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("engagement.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {models.map((model, index) => {
            const Icon = model.icon;
            return (
              <Card 
                key={index}
                className="hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{model.title}</CardTitle>
                  <CardDescription className="text-base">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-muted-foreground mb-3">{t("engagement.fulltime.ideal")}</p>
                  <ul className="space-y-3">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
