// Map legacy icon names to lucide-svelte component names
const ICON_ALIASES: Record<string, string> = {
  'alert-triangle': 'TriangleAlert',
  unlock: 'LockOpen',
  'check-circle-2': 'CircleCheck',
};

function kebabToPascalCase(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}

export function toLucideIconName(rawName: string): string {
  if (!rawName) return 'Circle';

  const kebab = String(rawName)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();

  const alias = ICON_ALIASES[kebab];
  if (alias) return alias;

  const pascal = kebabToPascalCase(kebab);
  return pascal || 'Circle';
}
