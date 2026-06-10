import { useEffect, useMemo, useRef, useState, type HTMLAttributes } from 'react';
import { SgDsLibraryIcon } from './Icon';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryAudioPlayerSize = 'sm' | 'md';
export type SgDsLibraryAudioPlayerVariant = 'default' | 'inline' | 'compact';

export type SgDsLibraryAudioPlayerProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  autoFillBars?: boolean;
  bars?: number[];
  playedBars?: number | string;
  playLabel?: string;
  progress?: number | string;
  size?: SgDsLibraryAudioPlayerSize;
  time?: string;
  variant?: SgDsLibraryAudioPlayerVariant;
};

const DEFAULT_WAVEFORM = [
  32, 54, 72, 48, 64, 84, 46, 36, 68, 58, 76, 42,
  52, 88, 62, 34, 74, 56, 44, 82, 66, 38, 58, 78,
  48, 70, 52, 40, 86, 60, 36, 68,
];

export function SgDsLibraryAudioPlayer(rawProps: SgDsLibraryAudioPlayerProps) {
  const {
  autoFillBars = true,
  bars = DEFAULT_WAVEFORM,
  className = '',
  playedBars = 12,
  playLabel = 'Play audio',
  progress,
  size = 'md',
  time = '0:14 / 0:36',
  variant = 'default',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const waveformRef = useRef<HTMLDivElement>(null);
  const sourceBars = bars.length > 0 ? bars : DEFAULT_WAVEFORM;
  const [autoBarCount, setAutoBarCount] = useState(sourceBars.length);
  const renderedBars = useMemo(() => {
    const targetCount = autoFillBars ? Math.max(sourceBars.length, autoBarCount) : sourceBars.length;
    return Array.from({ length: targetCount }, (_item, index) => sourceBars[index % sourceBars.length] ?? 50);
  }, [autoBarCount, autoFillBars, sourceBars]);
  const safeProgress = clampProgress(progress);
  const safePlayedBars = safeProgress === null
    ? Math.max(0, Math.min(Math.round(toFiniteNumber(playedBars, 0)), renderedBars.length))
    : Math.max(0, Math.min(Math.round(renderedBars.length * (safeProgress / 100)), renderedBars.length));

  useEffect(() => {
    if (!autoFillBars) {
      setAutoBarCount(sourceBars.length);
      return undefined;
    }

    const waveform = waveformRef.current;
    if (!waveform) return undefined;

    function updateBarCount() {
      const computed = window.getComputedStyle(waveform);
      const gap = parseCssLength(computed.columnGap || computed.gap, 2);
      const barWidth = parseCssLength(computed.getPropertyValue('--c-audio-player-bar-width'), 2);
      const availableWidth = waveform.clientWidth;
      if (availableWidth <= 0) {
        setAutoBarCount(sourceBars.length);
        return;
      }
      const nextCount = Math.max(
        sourceBars.length,
        Math.min(160, Math.floor((availableWidth + gap) / Math.max(1, barWidth + gap))),
      );
      setAutoBarCount((current) => current === nextCount ? current : nextCount);
    }

    updateBarCount();
    const observer = new ResizeObserver(updateBarCount);
    observer.observe(waveform);
    return () => observer.disconnect();
  }, [autoFillBars, sourceBars.length]);

  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'audio-player', className].filter(Boolean).join(' ')}
      data-size={size === 'sm' ? 'sm' : undefined}
      data-variant={variant === 'default' ? undefined : variant}
    >
      <button className="audio-player-play" type="button" aria-label={playLabel}>
        <SgDsLibraryIcon name="play" size="42%" />
      </button>
      <div className="audio-player-waveform" aria-hidden="true" ref={waveformRef}>
        {renderedBars.map((height, index) => (
          <span
            className={index < safePlayedBars ? 'played' : undefined}
            key={`${height}-${index}`}
            style={{ height: `${clampBarHeight(height)}%` }}
          />
        ))}
      </div>
      {time ? <span className="audio-player-time">{time}</span> : null}
    </div>
  );
}

function parseCssLength(value: string, fallback: number): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clampBarHeight(value: number): number {
  if (!Number.isFinite(value)) return 50;
  return Math.max(16, Math.min(100, Math.round(value)));
}

function clampProgress(value: number | string | undefined): number | null {
  const numeric = toFiniteNumber(value, Number.NaN);
  if (!Number.isFinite(numeric)) return null;
  return Math.max(0, Math.min(100, numeric));
}

function toFiniteNumber(value: number | string | undefined, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

export default SgDsLibraryAudioPlayer;
