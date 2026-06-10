import type { ReactNode } from 'react';
import { SgDsLibraryAudioBlock } from './AudioBlock';
import { SgDsLibraryAudioFrame } from './AudioFrame';
import { SgDsLibraryAudioPlayer } from './AudioPlayer';
import { SgDsLibraryChip } from './Chip';
import { SgDsLibraryCollabCredits } from './CollabCredits';
import { SgDsLibraryImageGrid } from './ImageGrid';
import { SgDsLibraryMediaFrame } from './MediaFrame';
import { SgDsLibraryPostCard, type SgDsLibraryPostCardStat } from './PostCard';
import { SgDsLibraryToolbar } from './Toolbar';
import { SgDsLibraryTopComment } from './TopComment';

type Args = Record<string, boolean | string>;

const AVATAR_TONES = ['brand', 'teal', 'amber', 'purple', 'coral', 'blue', 'pink', 'green'] as const;
const BODY_VARIANTS = ['none', 'live-video', 'video-collab', 'music-release', 'voice-clip', 'image-update'] as const;
const CARD_PADDINGS = ['sm', 'md', 'lg'] as const;
const CARD_VARIANTS = ['solid', 'outline', 'raised', 'bare'] as const;
const IMAGE_ASPECTS = ['16/9', '4/5', '9/16', '3/4', '1/1'] as const;
const IMAGE_TILE_COUNTS = ['1', '2', '3', '4', '5', '6'] as const;
const PROSE_VARIANTS = ['default', 'lead'] as const;

type PostCardBodyVariant = typeof BODY_VARIANTS[number];

const DEFAULT_STATS: SgDsLibraryPostCardStat[] = [
  { label: 'Listens', value: '1.2k' },
  { label: 'Likes', value: 342 },
  { label: 'Comments', value: 18 },
  { label: 'Supporters', value: '1,840', tone: 'brand', icon: 'gem', spacerBefore: true },
];

const LIVE_STATS: SgDsLibraryPostCardStat[] = [
  { label: 'Viewers', value: '3.8k', icon: 'eye' },
  { label: 'Likes', value: '12.4k' },
  { label: 'Chat', value: 824 },
  { label: 'Supporters', value: '2,180', tone: 'brand', icon: 'gem', spacerBefore: true },
];

const MUSIC_STATS: SgDsLibraryPostCardStat[] = [
  { label: 'Plays', value: '28.2k' },
  { label: 'Saves', value: '4.1k' },
  { label: 'Remixes', value: 128 },
  { label: 'Credits', value: '8,920', tone: 'brand', icon: 'gem', spacerBefore: true },
];

const meta = {
  title: 'SgDsLibrary/PostCard',
  component: SgDsLibraryPostCard,
  args: {
    title: 'NeoVoice랑 즉흥 듀엣 — AI 영상 위에 보컬 얹기',
    userName: 'Hailey Luna',
    userMeta: '보컬리스트 · 콜라보 라이브 · 방송 중',
    userInitials: 'HL',
    userAvatarSrc: '',
    prose: '지금 NeoVoice 채널과 합방 중입니다. 라이브 코멘트로 곡 분위기 정해주세요.',
    proseVariant: 'default',
    bodyVariant: 'none',
    imageTileCount: '4',
    imageUrl: '',
    imageTile1Src: '',
    imageTile2Src: '',
    imageTile3Src: '',
    imageTile4Src: '',
    imageTile5Src: '',
    imageTile6Src: '',
    imageAspect: '16/9',
    audioArtImageUrl: '',
    audioArtAlt: 'Track cover art',
    verified: true,
    kind: 'text',
    avatarTone: 'brand',
    cardVariant: 'solid',
    cardPadding: 'lg',
  },
  argTypes: {
    title: { control: 'text' },
    userName: { control: 'text' },
    userMeta: { control: 'text' },
    userInitials: { control: 'text' },
    userAvatarSrc: { name: 'User avatar src', control: 'text' },
    prose: { control: 'text' },
    proseVariant: { control: 'select', options: PROSE_VARIANTS },
    bodyVariant: { control: 'select', options: BODY_VARIANTS },
    imageTileCount: { name: 'Image tile count', control: 'select', options: IMAGE_TILE_COUNTS, when: { key: 'bodyVariant', value: 'image-update' } },
    imageUrl: { name: 'Media image URL', control: 'text' },
    imageTile1Src: { name: 'Image tile 1 src', control: 'text', when: { key: 'bodyVariant', value: 'image-update' } },
    imageTile2Src: { name: 'Image tile 2 src', control: 'text', when: { key: 'bodyVariant', value: 'image-update' } },
    imageTile3Src: { name: 'Image tile 3 src', control: 'text', when: { key: 'bodyVariant', value: 'image-update' } },
    imageTile4Src: { name: 'Image tile 4 src', control: 'text', when: { key: 'bodyVariant', value: 'image-update' } },
    imageTile5Src: { name: 'Image tile 5 src', control: 'text', when: { key: 'bodyVariant', value: 'image-update' } },
    imageTile6Src: { name: 'Image tile 6 src', control: 'text', when: { key: 'bodyVariant', value: 'image-update' } },
    imageAspect: { control: 'select', options: IMAGE_ASPECTS },
    audioArtImageUrl: { control: 'text', when: { key: 'bodyVariant', value: 'music-release' } },
    audioArtAlt: { control: 'text', when: { key: 'bodyVariant', value: 'music-release' } },
    verified: { control: 'boolean' },
    kind: { control: 'text' },
    avatarTone: { control: 'select', options: AVATAR_TONES },
    cardVariant: { control: 'select', options: CARD_VARIANTS },
    cardPadding: { control: 'select', options: CARD_PADDINGS },
  },
};
export default meta;

export const Default = {
  name: 'PostCard',
  sourceInsert: {
    props: {
      title: 'NeoVoice랑 즉흥 듀엣 — AI 영상 위에 보컬 얹기',
      userName: 'Hailey Luna',
      userMeta: '보컬리스트 · 콜라보 라이브 · 방송 중',
      userInitials: 'HL',
      userAvatarSrc: '',
      prose: '지금 NeoVoice 채널과 합방 중입니다. 라이브 코멘트로 곡 분위기 정해주세요.',
      proseVariant: 'default',
      bodyVariant: 'none',
      imageTileCount: '4',
      imageUrl: '',
      imageTile1Src: '',
      imageTile2Src: '',
      imageTile3Src: '',
      imageTile4Src: '',
      imageTile5Src: '',
      imageTile6Src: '',
      imageAspect: '16/9',
      audioArtImageUrl: '',
      audioArtAlt: 'Track cover art',
      verified: true,
      kind: 'text',
      avatarTone: 'brand',
      cardVariant: 'solid',
      cardPadding: 'lg',
    },
  },
  render: (args: Args) => {
    const bodyVariant = asOption(args.bodyVariant, BODY_VARIANTS, 'none');
    return (
      <SgDsLibraryPostCard
        avatarTone={asOption(args.avatarTone, AVATAR_TONES, 'brand')}
        bodySlot={renderBodyVariant(bodyVariant, args)}
        cardPadding={asOption(args.cardPadding, CARD_PADDINGS, 'lg')}
        cardVariant={asOption(args.cardVariant, CARD_VARIANTS, 'solid')}
        engagementSlot={renderEngagementVariant(bodyVariant)}
        imageAspect={asOption(args.imageAspect, IMAGE_ASPECTS, '16/9')}
        imageTileCount={asOption(args.imageTileCount, IMAGE_TILE_COUNTS, '4')}
        imageTile1Src={asText(args.imageTile1Src)}
        imageTile2Src={asText(args.imageTile2Src)}
        imageTile3Src={asText(args.imageTile3Src)}
        imageTile4Src={asText(args.imageTile4Src)}
        imageTile5Src={asText(args.imageTile5Src)}
        imageTile6Src={asText(args.imageTile6Src)}
        imageUrl={asText(args.imageUrl, '')}
        kind={asText(args.kind, 'text')}
        prose={asText(args.prose, '')}
        proseVariant={asOption(args.proseVariant, PROSE_VARIANTS, 'default')}
        stats={getStatsForBodyVariant(bodyVariant)}
        title={asText(args.title, '')}
        userAvatarSrc={asText(args.userAvatarSrc) || undefined}
        userInitials={asText(args.userInitials, 'U')}
        userMeta={asText(args.userMeta, '')}
        userName={asText(args.userName, 'User')}
        verified={asBoolean(args.verified)}
      />
    );
  },
};

export const LeadProseOnly = {
  args: {
    title: '',
    userName: 'Koda',
    userMeta: '작곡가 · 1시간 전',
    userInitials: 'KO',
    prose: '방금 Koda의 「정원사」 보컬 작업 마쳤습니다. 데모 곧 올립니다.',
    proseVariant: 'lead',
    verified: true,
    bodyVariant: 'none',
    kind: 'text',
    avatarTone: 'teal',
  },
  render: Default.render,
};

export const LiveVideo = {
  args: {
    title: '새벽 라이브 #18 — Hailey × NeoVoice',
    userName: 'Hailey Luna',
    userMeta: '보컬리스트 · 방송 중',
    userInitials: 'HL',
    prose: '라이브 코멘트로 다음 벌스 분위기 정해주세요. 지금 들어오는 투표 결과를 바로 프롬프트에 반영합니다.',
    verified: true,
    bodyVariant: 'live-video',
    kind: 'live',
    avatarTone: 'brand',
  },
  render: Default.render,
};

export const VideoCollab = {
  args: {
    title: 'City Bloom — final motion cut',
    userName: 'Mika Studio',
    userMeta: '영상 디렉터 · 12분 전',
    userInitials: 'MS',
    prose: 'AI 컷 편집본과 실제 보컬 테이크를 합친 공개 버전입니다. 아래 크레딧은 자동 정산 대상이에요.',
    verified: true,
    bodyVariant: 'video-collab',
    kind: 'video',
    avatarTone: 'purple',
  },
  render: Default.render,
};

export const MusicRelease = {
  args: {
    title: 'garden after midnight — demo take',
    userName: 'Koda',
    userMeta: '작곡가 · 1시간 전',
    userInitials: 'KO',
    prose: '드럼은 사람 연주, 코러스 레이어는 NeoVoice로 쌓았습니다. 리믹스 참여 열어둘게요.',
    verified: true,
    bodyVariant: 'music-release',
    kind: 'music',
    avatarTone: 'teal',
  },
  render: Default.render,
};

export const VoiceClip = {
  args: {
    title: '보이스 코멘트 — 0:18 호흡 체크',
    userName: 'Arin',
    userMeta: '프로듀서 · 24분 전',
    userInitials: 'AR',
    prose: '방금 받은 코러스 피드백입니다. 0:18 지점의 호흡만 살짝 더 남기면 감정선이 자연스러워질 것 같아요.',
    verified: false,
    bodyVariant: 'voice-clip',
    kind: 'voice',
    avatarTone: 'blue',
  },
  render: Default.render,
};

export const ImageUpdate = {
  args: {
    title: 'City Bloom cover studies',
    userName: 'Mika',
    userMeta: '아트 디렉터 · 36분 전',
    userInitials: 'MK',
    prose: '재킷 후보 4장입니다. 2번은 라이브 버전, 4번은 음원 공개용으로 보고 있어요.',
    verified: true,
    bodyVariant: 'image-update',
    kind: 'image',
    avatarTone: 'pink',
  },
  render: Default.render,
};

function renderBodyVariant(variant: PostCardBodyVariant, args: Args): ReactNode {
  if (variant === 'live-video') {
    return (
      <SgDsLibraryMediaFrame
        aspect="16/9"
        background="linear-gradient(140deg, #0f172a 0%, #155e75 42%, #e11d48 100%)"
        captionEyebrow="ON AIR · 42m"
        captionTitle="NeoVoice duet session"
        live
        src={asText(args.imageUrl)}
        viewerCount="3,812 watching"
      />
    );
  }

  if (variant === 'video-collab') {
    return (
      <>
        <SgDsLibraryMediaFrame
          aspect="4/5"
          badgeText="AI video"
          background="linear-gradient(145deg, #172554 0%, #7c2d12 46%, #db2777 100%)"
          captionEyebrow="PREMIERE · 02:17"
          captionTitle="City Bloom / final motion cut"
          duration="2:17"
          src={asText(args.imageUrl)}
        />
        <SgDsLibraryCollabCredits
          items={[
            { avatarTone: 'purple', credit: '+4.2k crd', initials: 'MS', name: 'Mika Studio', role: 'DIR', verified: true },
            { avatarTone: 'brand', credit: '+2.8k crd', initials: 'HL', name: 'Hailey Luna', role: 'VOC', verified: true },
            { avatarTone: 'teal', credit: '+1.1k crd', initials: 'NV', name: 'NeoVoice', role: 'AI' },
          ]}
        />
      </>
    );
  }

  if (variant === 'music-release') {
    return (
      <SgDsLibraryAudioFrame
        eyebrow="MUSIC RELEASE"
        meta="Stem package · 4:02 · Remix open"
        title="garden_after_midnight.wav"
        variant="music"
      >
        <SgDsLibraryAudioBlock
          artAlt={asText(args.audioArtAlt, 'Track cover art')}
          artBackground="linear-gradient(145deg, #0f172a 0%, #0d9488 44%, #f59e0b 100%)"
          artImageUrl={asText(args.audioArtImageUrl, '')}
          artName="garden.m4a"
          endTime="4:02"
          playedBars={21}
          startTime="2:08"
        />
        <SgDsLibraryToolbar
          size="sm"
          wrap
          startSlot={(
            <>
              <SgDsLibraryChip icon="music" size="sm" tone="brand">Melodic pop</SgDsLibraryChip>
              <SgDsLibraryChip icon="mic-2" size="sm">Open vocal</SgDsLibraryChip>
              <SgDsLibraryChip icon="sparkles" size="sm">Remixable</SgDsLibraryChip>
            </>
          )}
        />
      </SgDsLibraryAudioFrame>
    );
  }

  if (variant === 'voice-clip') {
    return (
      <SgDsLibraryAudioFrame
        eyebrow="VOICE NOTE"
        meta="0:42 · Producer feedback"
        title="0:18 호흡 체크"
        variant="voice"
      >
        <SgDsLibraryAudioPlayer
          playedBars={9}
          size="sm"
          time="0:18 / 0:42"
          variant="compact"
        />
      </SgDsLibraryAudioFrame>
    );
  }

  if (variant === 'image-update') {
    return (
      <>
        <SgDsLibraryImageGrid
          aspect="4/3"
          cols="2"
          imageTile1Src={asText(args.imageTile1Src) || asText(args.imageUrl)}
          imageTile2Src={asText(args.imageTile2Src)}
          imageTile3Src={asText(args.imageTile3Src)}
          imageTile4Src={asText(args.imageTile4Src)}
          imageTile5Src={asText(args.imageTile5Src)}
          imageTile6Src={asText(args.imageTile6Src)}
          tileCount={asOption(args.imageTileCount, IMAGE_TILE_COUNTS, '4')}
        />
        <SgDsLibraryCollabCredits
          items={[
            { avatarTone: 'pink', credit: '+1.4k crd', initials: 'MK', name: 'Mika', role: 'ART', verified: true },
            { avatarTone: 'coral', credit: '+680 crd', initials: 'RN', name: 'Rina', role: '3D' },
          ]}
        />
      </>
    );
  }

  return null;
}

function renderEngagementVariant(variant: PostCardBodyVariant): ReactNode {
  if (variant === 'live-video') {
    return (
      <SgDsLibraryTopComment
        author="SOYU"
        avatarTone="pink"
        comment="브릿지에서 신스 톤 조금 더 밝게 가면 후렴이 확 열릴 것 같아요."
        initials="SY"
      />
    );
  }

  if (variant === 'video-collab') {
    return (
      <SgDsLibraryTopComment
        author="Koda"
        avatarTone="amber"
        comment="2절 컷 전환 타이밍이 좋아요. 리믹스용 스템도 열어두면 바로 붙겠습니다."
        initials="KO"
      />
    );
  }

  if (variant === 'voice-clip') {
    return (
      <SgDsLibraryTopComment
        author="Hailey"
        avatarTone="brand"
        comment="확인했어요. 마지막 음절 숨소리는 살리고 앞부분만 정리해서 다시 올릴게요."
        initials="HL"
      />
    );
  }

  if (variant === 'image-update') {
    return (
      <SgDsLibraryTopComment
        author="NeoVoice"
        avatarTone="teal"
        comment="2번 톤이 보컬 질감하고 가장 잘 맞습니다. 라이브 썸네일로도 명확해요."
        initials="NV"
      />
    );
  }

  return null;
}

function getStatsForBodyVariant(variant: PostCardBodyVariant): SgDsLibraryPostCardStat[] {
  if (variant === 'live-video') return LIVE_STATS;
  if (variant === 'music-release') return MUSIC_STATS;
  if (variant === 'video-collab') {
    return [
      { label: 'Views', value: '42.8k' },
      { label: 'Likes', value: '9.6k' },
      { label: 'Comments', value: 284 },
      { label: 'Credits', value: '12.4k', tone: 'brand', icon: 'gem', spacerBefore: true },
    ];
  }
  if (variant === 'voice-clip') {
    return [
      { label: 'Replies', value: 36 },
      { label: 'Saves', value: 412 },
      { label: 'Shares', value: 57 },
    ];
  }
  if (variant === 'image-update') {
    return [
      { label: 'Votes', value: '5.6k' },
      { label: 'Likes', value: '18.1k' },
      { label: 'Comments', value: 492 },
      { label: 'Supporters', value: '3,740', tone: 'brand', icon: 'gem', spacerBefore: true },
    ];
  }
  return DEFAULT_STATS;
}

function asBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value === 'true';
}

function asOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === 'string' && options.includes(value as T) ? (value as T) : fallback;
}

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
