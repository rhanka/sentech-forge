import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold mb-2">
              <span>SENT</span>
              <span className="text-accent">-tech</span>
            </p>
            <p className="text-sm text-primary-foreground/70">
              {t("footer.tagline")}
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-primary-foreground/70">
              {t("footer.rights")}
            </p>
            <p className="text-sm text-primary-foreground/70 mt-1">
              {t("footer.location")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
