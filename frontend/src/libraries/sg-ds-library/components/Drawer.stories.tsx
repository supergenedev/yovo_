import { SgDsLibraryDrawer } from './Drawer';
import { SgDsLibraryStack } from './Stack';
import { SgDsLibraryText } from './Text';

type Args = Record<string, boolean | string>;

const BACKGROUNDS = ['none', 'surface', 'soft', 'subtle', 'muted', 'inverse', 'accent', 'glass'] as const;
const POSITIONS = ['bottom', 'top', 'left', 'right'] as const;

const meta = {
  title: 'SgDsLibrary/Drawer',
  component: SgDsLibraryDrawer,
};
export default meta;

export const Default = {
  name: 'Drawer',
  args: {
    open: true,
    position: 'bottom',
    size: '48%',
    minSize: '',
    background: 'surface',
    overlay: true,
    soft: false,
  },
  argTypes: {
    open: { control: 'boolean' },
    position: { control: 'select', options: POSITIONS },
    size: { control: 'text' },
    minSize: { control: 'text' },
    background: { control: 'select', options: BACKGROUNDS },
    overlay: { control: 'boolean' },
    soft: { control: 'boolean' },
  },
  sourceInsert: {
    props: {
      open: true,
      position: 'bottom',
      size: '48%',
      minSize: '',
      background: 'surface',
      overlay: true,
      soft: false,
    },
  },
  render: (args: Args) => (
    <SgDsLibraryStack gap="md" style={{ width: 520 }}>
      <SgDsLibraryDrawer
        background={asOption(args.background, BACKGROUNDS, 'surface')}
        minSize={asText(args.minSize) || undefined}
        open={asBoolean(args.open, true)}
        overlay={asBoolean(args.overlay, true)}
        position={asOption(args.position, POSITIONS, 'bottom')}
        size={asText(args.size, '48%')}
        soft={asBoolean(args.soft, false)}
      >
        <SgDsLibraryStack gap="sm">
          <SgDsLibraryText transform="uppercase" variant="eyebrow">Drawer</SgDsLibraryText>
          <SgDsLibraryText as="h3" variant="heading-3">동적 프리뷰</SgDsLibraryText>
          <SgDsLibraryText tone="secondary">버튼과 스크림, 닫기 아이콘으로 상태를 바꿀 수 있습니다.</SgDsLibraryText>
        </SgDsLibraryStack>
      </SgDsLibraryDrawer>
    </SgDsLibraryStack>
  ),
};

export const Soft = {
  name: 'Soft Drawer',
  args: {
    open: true,
    position: 'right',
    size: '42%',
    minSize: '18rem',
    background: 'glass',
    overlay: true,
    soft: true,
  },
  sourceInsert: {
    props: {
      open: true,
      position: 'right',
      size: '42%',
      minSize: '18rem',
      background: 'glass',
      overlay: true,
      soft: true,
    },
  },
  render: Default.render,
};

export const TransparentSoft = {
  name: 'Transparent Soft',
  args: {
    open: true,
    position: 'bottom',
    size: '52%',
    minSize: '16rem',
    background: 'none',
    overlay: false,
    soft: true,
  },
  sourceInsert: {
    props: {
      open: true,
      position: 'bottom',
      size: '52%',
      minSize: '16rem',
      background: 'none',
      overlay: false,
      soft: true,
    },
  },
  render: Default.render,
};

function asBoolean(value: unknown, fallback: boolean): boolean {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return fallback;
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
