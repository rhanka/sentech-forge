import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  loadAllStrategies,
  loadAllServices,
  loadAllSectors,
  loadAllValues,
  loadAllEngagements,
  StrategyContent,
  ServiceContent,
  BaseContent,
  EngagementContent,
} from '@/lib/contentLoader';

export function useStrategyContent() {
  const { i18n } = useTranslation();
  const [strategies, setStrategies] = useState<StrategyContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const locale = i18n.language as 'fr' | 'en';
        const content = await loadAllStrategies(locale);
        setStrategies(content);
      } catch (error) {
        console.error('Error loading strategy content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language]);

  return { strategies, loading };
}

export function useServiceContent() {
  const { i18n } = useTranslation();
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const locale = i18n.language as 'fr' | 'en';
        const content = await loadAllServices(locale);
        setServices(content);
      } catch (error) {
        console.error('Error loading service content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language]);

  return { services, loading };
}

export function useSectorContent() {
  const { i18n } = useTranslation();
  const [sectors, setSectors] = useState<BaseContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const locale = i18n.language as 'fr' | 'en';
        const content = await loadAllSectors(locale);
        setSectors(content);
      } catch (error) {
        console.error('Error loading sector content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language]);

  return { sectors, loading };
}

export function useValueContent() {
  const { i18n } = useTranslation();
  const [values, setValues] = useState<BaseContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const locale = i18n.language as 'fr' | 'en';
        const content = await loadAllValues(locale);
        setValues(content);
      } catch (error) {
        console.error('Error loading value content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language]);

  return { values, loading };
}

export function useEngagementContent() {
  const { i18n } = useTranslation();
  const [engagements, setEngagements] = useState<EngagementContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const locale = i18n.language as 'fr' | 'en';
        const content = await loadAllEngagements(locale);
        setEngagements(content);
      } catch (error) {
        console.error('Error loading engagement content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language]);

  return { engagements, loading };
}
