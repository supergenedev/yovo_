import { useEffect, useState, type CSSProperties, type HTMLAttributes } from 'react';
import { SgDsLibraryAudioPlayer } from './AudioPlayer';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryAudioBlockProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  artAlt?: string;
  artBackground?: string;
  artImageUrl?: string;
  artName?: string;
  bars?: number[];
  endTime?: string;
  onProgressChange?: (progress: number) => void;
  playedBars?: number | string;
  playLabel?: string;
  progress?: number | string;
  progressLabel?: string;
  startTime?: string;
};

const DEFAULT_AUDIO_BLOCK_BAR_COUNT = 32;

export function SgDsLibraryAudioBlock(rawProps: SgDsLibraryAudioBlockProps) {
  const {
  artAlt = '',
  artBackground = 'linear-gradient(135deg, #111827 0%, #7c3aed 48%, #f43f5e 100%)',
  artImageUrl = '',
  artName = 'dusk.exe',
  bars,
  className = '',
  endTime = '3:25',
  onProgressChange,
  playedBars = 16,
  playLabel = 'Play track',
  progress: progressProp,
  progressLabel = 'Audio progress',
  startTime = '1:14',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const artStyle: CSSProperties = { background: artBackground };
  const sourceBarCount = bars && bars.length > 0 ? bars.length : DEFAULT_AUDIO_BLOCK_BAR_COUNT;
  const playedBarCount = toFiniteNumber(playedBars, 16);
  const derivedProgress = clampProgress(
    progressProp ?? (playedBarCount <= sourceBarCount
      ? (playedBarCount / sourceBarCount) * 100
      : playedBarCount),
  );
  const [localProgress, setLocalProgress] = useState(derivedProgress);
  const controlledProgress = progressProp !== undefined;
  const progress = controlledProgress ? derivedProgress : localProgress;
  const trackStyle = { '--audio-block-progress': `${progress}%` } as CSSProperties;

  useEffect(() => {
    setLocalProgress(derivedProgress);
  }, [derivedProgress]);

  function handleProgressChange(nextProgress: number) {
    const clamped = clampProgress(nextProgress);
    if (!controlledProgress) setLocalProgress(clamped);
    onProgressChange?.(clamped);
  }

  return (
    <div {...props} className={['sg-ds-library-scope', 'audio-block', className].filter(Boolean).join(' ')}>
      <div className="audio-block-art" style={artStyle}>
        {artImageUrl ? <img className="audio-block-art-image" src={artImageUrl} alt={artAlt} /> : null}
        <span className="audio-block-art-name">{artName}</span>
      </div>
      <div className="audio-block-content">
        <SgDsLibraryAudioPlayer
          bars={bars}
          playedBars={playedBars}
          playLabel={playLabel}
          progress={progress}
          time=""
          variant="inline"
        />
        <div className="audio-block-timecode">
          <span>{startTime}</span>
          <input
            aria-label={progressLabel}
            className="audio-block-timecode-track"
            max={100}
            min={0}
            step={1}
            style={trackStyle}
            type="range"
            value={Math.round(progress)}
            onChange={(event) => handleProgressChange(Number(event.currentTarget.value))}
          />
          <span>{endTime}</span>
        </div>
      </div>
    </div>
  );
}

function clampProgress(value: number | string): number {
  return Math.max(0, Math.min(100, toFiniteNumber(value, 0)));
}

function toFiniteNumber(value: number | string | undefined, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

export default SgDsLibraryAudioBlock;
