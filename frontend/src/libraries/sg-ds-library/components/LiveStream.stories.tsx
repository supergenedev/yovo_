import { SgDsLibraryLiveStream, SgDsLibraryLiveStreamBadge, SgDsLibraryLiveStreamViewerCount } from './LiveStream';

type Args = Record<string, string>;

const meta = {
  title: 'SgDsLibrary/LiveStream',
  component: SgDsLibraryLiveStream,
};
export default meta;

export const Default = {
  name: 'LiveStream',
  args: { label: 'LIVE', viewerCount: '4,218 watching', viewerIcon: 'eye' },
  argTypes: {
    label: { control: 'text' },
    viewerCount: { control: 'text' },
    viewerIcon: { control: 'icon' },
  },
  sourceInsert: {
    props: { label: 'LIVE', viewerCount: '4,218 watching', viewerIcon: 'eye' },
  },
  render: (args: Args) => (
    <SgDsLibraryLiveStream
      label={asText(args.label, 'LIVE')}
      viewerCount={asText(args.viewerCount, '4,218 watching')}
      viewerIcon={asText(args.viewerIcon, 'eye')}
    />
  ),
};

export const LiveStreamBadge = {
  name: 'LiveStreamBadge',
  args: { label: 'ON AIR' },
  argTypes: { label: { control: 'text' } },
  sourceInsert: {
    props: { label: 'ON AIR' },
  },
  render: (args: Args) => <SgDsLibraryLiveStreamBadge label={asText(args.label, 'ON AIR')} />,
};

export const LiveStreamViewerCount = {
  name: 'LiveStreamViewerCount',
  args: { viewerCount: '1,128 listening', viewerIcon: 'headphones' },
  argTypes: {
    viewerCount: { control: 'text' },
    viewerIcon: { control: 'icon' },
  },
  sourceInsert: {
    props: { viewerCount: '1,128 listening', viewerIcon: 'headphones' },
  },
  render: (args: Args) => (
    <SgDsLibraryLiveStreamViewerCount
      viewerCount={asText(args.viewerCount, '1,128 listening')}
      viewerIcon={asText(args.viewerIcon, 'headphones')}
    />
  ),
};

export const BadgeOnly = LiveStreamBadge;
export const ViewerCountOnly = LiveStreamViewerCount;

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
