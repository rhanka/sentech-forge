import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export const LanguageSwitcher = ({ isScrolled = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={`gap-2 text-sm font-medium transition-colors hover:text-accent ${
        isScrolled ? "text-foreground" : "text-primary-foreground"
      }`}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
    </Button>
  );
};
