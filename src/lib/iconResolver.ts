import dynamicIconImports from 'lucide-react/dynamicIconImports';

// Map legacy/renamed Lucide icon names to current keys in dynamicIconImports
const ICON_ALIASES: Record<string, string> = {
  // Renames introduced in recent lucide versions
  'alert-triangle': 'triangle-alert',
  'unlock': 'lock-open',
  // Common fallbacks
  'check-circle-2': 'check-circle',
};

export function toDynamicIconKey(rawName: string): keyof typeof dynamicIconImports {
  if (!rawName) return 'circle' as keyof typeof dynamicIconImports;

  const kebab = String(rawName)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();

  const primary = (ICON_ALIASES[kebab] || kebab) as keyof typeof dynamicIconImports;
  if (dynamicIconImports[primary]) return primary;

  // Secondary graceful fallbacks
  const candidates = [
    kebab.replace(/-2$/, ''),
    'circle-check',
    'check-circle',
    'triangle-alert',
    'circle-alert',
    'lock-open',
    'info',
    'circle',
  ];

  for (const c of candidates) {
    if (c in dynamicIconImports) return c as keyof typeof dynamicIconImports;
  }

  return 'circle' as keyof typeof dynamicIconImports;
}
