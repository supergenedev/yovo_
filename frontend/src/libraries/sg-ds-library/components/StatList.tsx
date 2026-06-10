import { Children, type HTMLAttributes, type ReactNode } from 'react';
import { SgDsLibraryStat } from './Stat';
import { resolveWorkbenchModeProps } from './_shared';

export type SgDsLibraryStatListSize = 'sm' | 'md';
export type SgDsLibraryStatListItem = {
  label: string;
  value: string | number;
  tone?: 'default' | 'brand';
  icon?: string;
  spacerBefore?: boolean;
};

export type SgDsLibraryStatListProps = HTMLAttributes<HTMLUListElement> & {
  brandStat?: boolean;
  children?: ReactNode;
  items?: SgDsLibraryStatListItem[];
  size?: SgDsLibraryStatListSize;
};

const DEFAULT_ITEMS: SgDsLibraryStatListItem[] = [
  { value: '124K', label: 'plays' },
  { value: '18.4K', label: 'likes' },
  { value: '1,248', label: 'comments' },
];

function renderSeparator(key: string) {
  return (
    <li aria-hidden="true" className="stat-separator" key={key}>
      ·
    </li>
  );
}

function renderChildrenWithSeparators(children: ReactNode) {
  return Children.toArray(children).flatMap((child, index) => (
    index === 0 ? [child] : [renderSeparator(`child-separator-${index}`), child]
  ));
}

function renderItemsWithSeparators(items: SgDsLibraryStatListItem[]) {
  return items.flatMap((item, index) => {
    const nodes: ReactNode[] = [];

    if (index > 0) {
      if (item.spacerBefore) {
        nodes.push(<li className="spacer" key={`spacer-${index}`} />);
      }
      nodes.push(renderSeparator(`item-separator-${index}`));
    }

    nodes.push(
      <SgDsLibraryStat
        icon={item.icon}
        key={`stat-${index}`}
        label={item.label}
        tone={item.tone}
        value={item.value}
      />,
    );

    return nodes;
  });
}

export function SgDsLibraryStatList(rawProps: SgDsLibraryStatListProps) {
  const {
  brandStat = false,
  children,
  className = '',
  items,
  size = 'md',
  ...props
} = resolveWorkbenchModeProps(rawProps);
  const renderedItems = items ?? [
    ...DEFAULT_ITEMS,
    ...(brandStat ? [{ value: '1,840', label: 'supporters', tone: 'brand' as const, icon: 'gem', spacerBefore: true }] : []),
  ];

  return (
    <ul
      {...props}
      className={['sg-ds-library-scope', 'stat-list', className].filter(Boolean).join(' ')}
      data-size={size === 'sm' ? 'sm' : undefined}
      data-separators="explicit"
      role={props.role ?? 'list'}
    >
      {children ? renderChildrenWithSeparators(children) : renderItemsWithSeparators(renderedItems)}
    </ul>
  );
}

export default SgDsLibraryStatList;
