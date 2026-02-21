import { useDynamicContent } from './useMarkdownContent';

export interface ServiceItem {
  id: string;
  icon: string;
  order: number;
  clickable?: boolean;
  scrollTo?: string;
  title: string;
  description: string;
}

export interface SectorItem {
  id: string;
  icon: string;
  order: number;
  title: string;
  description: string;
}

export interface ValueItem {
  id: string;
  icon: string;
  order: number;
  title: string;
  description: string;
}

export interface EngagementItem {
  id: string;
  icon: string;
  order: number;
  features?: string[];
  title: string;
  description: string;
}

export interface BlogPostItem {
  id: string;
  icon?: string;
  order: number;
  date?: string;
  readTime?: string;
  tags?: string[];
  draft?: boolean;
  url?: string;
  title: string;
  description: string;
}

export function useServiceContent() {
  const { items: services, loading } = useDynamicContent<ServiceItem>('services');
  return { services, loading };
}

export function useSectorContent() {
  const { items: sectors, loading } = useDynamicContent<SectorItem>('sectors');
  return { sectors, loading };
}

export function useValueContent() {
  const { items: values, loading } = useDynamicContent<ValueItem>('values');
  return { values, loading };
}

export function useEngagementContent() {
  const { items: engagements, loading } = useDynamicContent<EngagementItem>('engagement');
  return { engagements, loading };
}

export function useBlogContent() {
  const { items: posts, loading } = useDynamicContent<BlogPostItem>('blog');
  return { posts, loading };
}
