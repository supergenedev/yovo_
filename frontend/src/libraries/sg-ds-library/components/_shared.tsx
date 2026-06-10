/**
 * Shared utilities for the SG-DS-LIBRARY preset.
 *
 * The preset intentionally has NO icon-package dependency. Icon name → SVG
 * URL resolution goes through the workbench's project-asset picker:
 *
 *   1. The project installs an icon library (Lucide, Heroicons, custom set, …)
 *      via the workbench Assets panel — that populates the global
 *      `__WORKBENCH_DEFAULT_ICON_SOURCES__` map at runtime.
 *   2. Preset components accept an icon name string (driven by the inspector
 *      `control: 'icon'` picker) and pass it to `<SgDsLibraryIcon>`.
 *   3. `<SgDsLibraryIcon>` resolves the name to a URL and renders it as an
 *      inline SVG span so the icon picks up `currentColor`.
 */

import type { CSSProperties } from 'react';

export type SgDsLibraryRepeaterItemPropKeys = string | string[];
export type SgDsLibraryRepeaterItemProps = Array<Record<string, boolean | string>>;

export interface SgDsLibraryIconProps {
  name?: string;
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Default stroke-width for icons. Slightly bolder than Lucide's default
 *  of 2 to keep icons readable at small UI sizes. */
export const SG_DS_LIBRARY_ICON_STROKE_WIDTH = 2.25;

export function normalizeIconName(value: string | undefined): string {
  if (!value) return '';
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

type WorkbenchIconRuntimeGlobal = typeof globalThis & {
  __WORKBENCH_DEFAULT_ICON_SOURCES__?: Record<string, string>;
};

export function resolveWorkbenchIconSource(name: string | undefined): string | null {
  if (!name) return null;
  const sourceMap = (globalThis as WorkbenchIconRuntimeGlobal).__WORKBENCH_DEFAULT_ICON_SOURCES__;
  if (!sourceMap) return null;
  const normalized = normalizeIconName(name);
  return sourceMap[normalized] ?? sourceMap[name] ?? null;
}

export function normalizeIconLengthProp(value: number | string | undefined, fallback: number): number | string {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : trimmed;
  }
  return fallback;
}

type WorkbenchModeRuntimeGlobal = typeof globalThis & {
  __WORKBENCH_SOURCE_PREVIEW_MODE__?: {
    breakpoint?: string | null;
    stateMode?: string | null;
  };
};

type WorkbenchModeOverride = {
  props?: Record<string, unknown>;
};

type WorkbenchModeProps = Record<string, unknown> & {
  'data-wb-responsive'?: string;
  'data-wb-state'?: string;
};

export function resolveWorkbenchModeProps<Props extends object>(props: Props): Props {
  const runtimeMode = (globalThis as WorkbenchModeRuntimeGlobal).__WORKBENCH_SOURCE_PREVIEW_MODE__;
  if (!runtimeMode?.breakpoint && !runtimeMode?.stateMode) return props;

  const modeProps = props as WorkbenchModeProps;
  const responsiveOverride = getWorkbenchModeOverride(modeProps['data-wb-responsive'], runtimeMode.breakpoint ?? null);
  const stateOverride = getWorkbenchModeOverride(modeProps['data-wb-state'], runtimeMode.stateMode ?? null);
  const mergedProps = {
    ...props,
    ...(responsiveOverride?.props ?? null),
    ...(stateOverride?.props ?? null),
  };
  return mergedProps as Props;
}

export function resolveRepeaterItemProps(
  itemProps: Record<string, boolean | string> | undefined,
  itemPropKeys: SgDsLibraryRepeaterItemPropKeys | undefined,
): Record<string, boolean | string> {
  if (!itemProps) return {};
  const allowedKeys = normalizeRepeaterItemPropKeys(itemPropKeys);
  if (allowedKeys === null) return itemProps;
  return Object.fromEntries(Object.entries(itemProps).filter(([key]) => allowedKeys.has(key)));
}

function normalizeRepeaterItemPropKeys(itemPropKeys: SgDsLibraryRepeaterItemPropKeys | undefined): Set<string> | null {
  if (Array.isArray(itemPropKeys)) {
    return new Set(itemPropKeys.map((key) => key.trim()).filter(Boolean));
  }
  if (typeof itemPropKeys === 'string') {
    return new Set(itemPropKeys.split(/[\s,]+/).map((key) => key.trim()).filter(Boolean));
  }
  return null;
}

function getWorkbenchModeOverride(rawValue: string | undefined, modeId: string | null): WorkbenchModeOverride | null {
  if (!rawValue || !modeId) return null;
  try {
    const parsed = JSON.parse(rawValue) as unknown;
    if (!isRecord(parsed)) return null;
    const override = parsed[modeId];
    if (!isRecord(override)) return null;
    return {
      ...(isRecord(override.props) ? { props: override.props } : null),
    };
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
