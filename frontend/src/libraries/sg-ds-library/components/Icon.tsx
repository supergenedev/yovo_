import { useEffect, useState, type CSSProperties } from 'react';
import { resolveWorkbenchIconSource, SG_DS_LIBRARY_ICON_STROKE_WIDTH, type SgDsLibraryIconProps, resolveWorkbenchModeProps } from './_shared';

/**
 * Project-asset-driven icon renderer.
 *
 * Fetches the SVG markup from the project's icon asset and injects it
 * inline, so the icon's own `stroke="currentColor"` and `stroke-width`
 * attributes drive the rendering. This preserves the design-system look
 * (sharp strokes at the authored width) — a CSS-mask render of the same
 * file would lose the stroke weight to anti-aliasing.
 *
 * Default size is `1em` so the icon scales with surrounding text, matching
 * the source design system's inline `<svg>` convention.
 *
 * The fetched SVG strings are cached per URL so repeated mounts on the same
 * page only fetch once.
 */

const svgCache = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

function loadSvg(url: string): Promise<string> {
  const cached = svgCache.get(url);
  if (cached != null) return Promise.resolve(cached);
  const pending = inflight.get(url);
  if (pending) return pending;
  const promise = fetch(url)
    .then((response) => (response.ok ? response.text() : ''))
    .then((text) => {
      svgCache.set(url, text);
      inflight.delete(url);
      return text;
    })
    .catch(() => {
      svgCache.set(url, '');
      inflight.delete(url);
      return '';
    });
  inflight.set(url, promise);
  return promise;
}

function toCssSize(value: number | string | undefined): string {
  if (typeof value === 'number' && Number.isFinite(value)) return `${value}px`;
  if (typeof value === 'string' && value.trim()) {
    const trimmed = value.trim();
    return /^\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}px` : trimmed;
  }
  return '1em';
}

export function SgDsLibraryIcon(rawProps: SgDsLibraryIconProps) {
  const {
    className = '',
    color = '',
    name = '',
    size = '1em',
    strokeWidth = SG_DS_LIBRARY_ICON_STROKE_WIDTH,
    style,
  } = resolveWorkbenchModeProps(rawProps);
  const source = resolveWorkbenchIconSource(name);
  const [markup, setMarkup] = useState<string>(() => (source ? svgCache.get(source) ?? '' : ''));

  useEffect(() => {
    if (!source) {
      setMarkup('');
      return;
    }
    const cached = svgCache.get(source);
    if (cached != null) {
      setMarkup(cached);
      return;
    }
    let cancelled = false;
    loadSvg(source).then((text) => {
      if (!cancelled) setMarkup(text);
    });
    return () => {
      cancelled = true;
    };
  }, [source]);

  if (!source || !markup) return null;

  const cssSize = toCssSize(size);
  const cssColor = toCssColor(color);
  const mergedStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: cssSize,
    height: cssSize,
    flexShrink: 0,
    ...style,
    color: cssColor ?? style?.color ?? 'inherit',
  };

  // Lucide-style SVGs embed their own width/height/viewBox; we override
  // the container's size and let the SVG fill it (CSS in the stylesheet
  // already targets `.alert-icon > svg { width: 1em; height: 1em }` —
  // the inline SVG rule still applies because the SVG is a direct child).
  return (
    <span
      aria-hidden="true"
      className={['sg-ds-library-icon', className].filter(Boolean).join(' ')}
      style={mergedStyle}
      dangerouslySetInnerHTML={{ __html: prepareSvg(markup, strokeWidth) }}
    />
  );
}

function toCssColor(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Adjust the fetched SVG so it fits the container and renders with the
 * preset's stroke-width default. CRITICALLY, we only touch attributes on
 * the ROOT `<svg>` tag — global replacements break icons that embed inner
 * shapes carrying their own `width`/`height` (e.g. a `<rect width="20">`
 * inside the album icon).
 *
 *   - root width/height        → 100% (size comes from the wrapper span)
 *   - root stroke-width        → overridden so icons stay readable at 1em
 *   - root style="display:block" added so the SVG drops baseline gap
 */
function prepareSvg(svg: string, strokeWidth: number | string): string {
  const sw = typeof strokeWidth === 'number' ? String(strokeWidth) : strokeWidth.trim() || '2';
  return svg.replace(/<svg\b([^>]*)>/i, (_match, attrs) => {
    // Inside the captured `attrs` string only — never touch descendants.
    let nextAttrs = attrs as string;
    nextAttrs = nextAttrs.replace(/\s(width|height)="[^"]*"/g, '');
    nextAttrs = nextAttrs.replace(/\sstroke-width="[^"]*"/g, '');
    nextAttrs = nextAttrs.replace(/\sstyle="[^"]*"/g, '');
    return `<svg${nextAttrs} width="100%" height="100%" stroke-width="${sw}" style="display:block">`;
  });
}

export default SgDsLibraryIcon;
