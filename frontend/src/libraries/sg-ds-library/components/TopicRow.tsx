import type { HTMLAttributes, ReactNode } from 'react';
import { SgDsLibraryChip } from './Chip';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryTopicRowDeltaTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

export type SgDsLibraryTopicRowProps = HTMLAttributes<HTMLDivElement> & {
  rank?: number | string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  sub?: ReactNode;
  delta?: ReactNode;
  deltaTone?: SgDsLibraryTopicRowDeltaTone;
  divider?: boolean;
};

export function SgDsLibraryTopicRow(rawProps: SgDsLibraryTopicRowProps) {
  const {
  className = '',
  delta,
  deltaTone = 'neutral',
  divider = true,
  eyebrow,
  rank,
  sub,
  title = 'Topic title',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const isPrimitiveDelta = typeof delta === 'string' || typeof delta === 'number';
  const hasDelta = delta != null && delta !== '';
  const hasRank = rank != null && rank !== '';
  return (
    <div
      {...props}
      className={['sg-ds-library-scope', 'topic-row', className].filter(Boolean).join(' ')}
      data-divider={divider ? 'true' : 'false'}
      data-has-rank={hasRank ? 'true' : undefined}
    >
      {hasRank ? <span className="topic-row-rank">{rank}</span> : null}
      <div className="topic-row-body">
        {eyebrow ? <span className="topic-row-eyebrow">{eyebrow}</span> : null}
        <span className="topic-row-title">{title}</span>
        {sub ? <span className="topic-row-sub">{sub}</span> : null}
      </div>
      {hasDelta ? (
        <span className="topic-row-delta" data-tone={deltaTone}>
          {isPrimitiveDelta ? (
            <SgDsLibraryChip className="topic-row-delta-chip" size="sm" tone={deltaTone === 'brand' ? 'brand' : 'neutral'}>
              {delta}
            </SgDsLibraryChip>
          ) : (
            delta
          )}
        </span>
      ) : null}
    </div>
  );
}

export default SgDsLibraryTopicRow;
