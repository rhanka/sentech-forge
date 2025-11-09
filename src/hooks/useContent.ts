import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { strategiesFr, strategiesEn, StrategyItem } from '@/content/strategies';
import { servicesFr, servicesEn, ServiceItem } from '@/content/services';
import { sectorsFr, sectorsEn, SectorItem } from '@/content/sectors';
import { valuesFr, valuesEn, ValueItem } from '@/content/values';
import { engagementFr, engagementEn, EngagementItem } from '@/content/engagement';

export function useStrategyContent() {
  const { i18n } = useTranslation();
  
  const strategies = useMemo(() => {
    const locale = i18n.language as 'fr' | 'en';
    return locale === 'fr' ? strategiesFr : strategiesEn;
  }, [i18n.language]);

  return { strategies, loading: false };
}

export function useServiceContent() {
  const { i18n } = useTranslation();
  
  const services = useMemo(() => {
    const locale = i18n.language as 'fr' | 'en';
    return locale === 'fr' ? servicesFr : servicesEn;
  }, [i18n.language]);

  return { services, loading: false };
}

export function useSectorContent() {
  const { i18n } = useTranslation();
  
  const sectors = useMemo(() => {
    const locale = i18n.language as 'fr' | 'en';
    return locale === 'fr' ? sectorsFr : sectorsEn;
  }, [i18n.language]);

  return { sectors, loading: false };
}

export function useValueContent() {
  const { i18n } = useTranslation();
  
  const values = useMemo(() => {
    const locale = i18n.language as 'fr' | 'en';
    return locale === 'fr' ? valuesFr : valuesEn;
  }, [i18n.language]);

  return { values, loading: false };
}

export function useEngagementContent() {
  const { i18n } = useTranslation();
  
  const engagements = useMemo(() => {
    const locale = i18n.language as 'fr' | 'en';
    return locale === 'fr' ? engagementFr : engagementEn;
  }, [i18n.language]);

  return { engagements, loading: false };
}

export type { StrategyItem, ServiceItem, SectorItem, ValueItem, EngagementItem };
