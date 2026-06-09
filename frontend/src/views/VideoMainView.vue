<script setup>
import {
  UserBlock,
  SectionTitle,
  SectionTitleGroup,
  CardGrid,
  MediaFrame,
  Text,
  PopoverList,
  PopoverItem,
  ButtonPopover,
  Button,
  VideoListCard,
  TabsList,
  Tabs,
  Tab,
  Input,
  Stack,
  SidebarFollowRow,
  SidebarItem,
  SidebarGroup,
  Sidebar,
} from '@/components'
import { onMounted } from 'vue'
import { useVideoStore } from '@/stores/video'

const videoStore = useVideoStore()

onMounted(() => {
  videoStore.fetchVideoPosts()
})

function timeAgo(ms) {
  if (!ms) return ''
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금 전'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  return hours < 24 ? `${hours}시간 전` : `${Math.floor(hours / 24)}일 전`
}
</script>

<template>
  <Stack
    :style="{ width: '100%', height: '100%', overflow: 'hidden' }"
    as="div"
    radius="none"
    direction="row"
    align="stretch"
    justify="start"
    gap="lg"
    padding="none"
    background="none"
    mask="none"
    maskStart="45"
    maskEnd="100"
    maskAngle="0"
    glassBlur="18"
  >
    <Sidebar
      :style="{ width: '272px' }"
      :collapsed="false"
      collapsedWidth="64"
      headerLogoImage="/workbench-assets/icons/logo-mpks329o.svg"
      headerSymbolImage="/workbench-assets/icons/symbol-mpks329n.svg"
      presentation="sidebar"
      width="272px"
      background="surface"
      :bordered="false"
      radius="none"
      brandMarkText="Y"
      brandName="YOVO"
      expandedBrandDisplay="symbol-logo"
      activeItem="home"
      height="100vh"
    >
      <UserBlock
        action3Icon=""
        action3Variant="ghost"
        action2Icon=""
        avatarSize="md"
        avatarSrc="https://i.pinimg.com/736x/cb/12/b2/cb12b2f39982bf66734cd7e5a34eb891.jpg"
        :style="{ width: '100%' }"
        name="Munhee J"
        meta="@munhee · 크리에이터"
        initials="MJ"
        avatarTone="purple"
        :verified="true"
        size="md"
      >
        <ButtonPopover
          :style="{ width: '32px' }"
          leadingIcon="ellipsis"
          :iconOnly="true"
          trailingIcon="chevron-down"
          placement="bottom-end"
          buttonLabel="최신순"
          buttonShape="pill"
          buttonSize="sm"
          buttonVariant="ghost"
          :closeOnItemClick="true"
        >
          <PopoverList>
            <PopoverItem icon="circle-user">프로필</PopoverItem>
            <PopoverItem icon="layout-dashboard">대시보드</PopoverItem>
            <PopoverItem icon="settings">설정</PopoverItem>
          </PopoverList>
        </ButtonPopover>
      </UserBlock>

      <SidebarGroup seeAllIcon="chevron-right" />

      <SidebarGroup :style="{ height: 'fit-content' }">
        <SidebarItem :emphasized="true" badgeVariant="subtle" icon="plus" label="작품 만들기" :active="false" />
      </SidebarGroup>

      <SidebarGroup>
        <SidebarItem icon="house" label="홈" :active="true" />
        <SidebarItem icon="book-marked" label="구매목록" :active="false" />
        <SidebarItem badge="12" icon="bell-dot" label="알림" :active="false" />
      </SidebarGroup>

      <SidebarGroup count="45" seeAllLabel="모두보기" label="팔로잉">
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg" size="sm" name="Hailey Luna" initials="HL" avatarTone="brand" status="live" tail="LIVE" tailStatus="live" tailVariant="plain" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg" size="sm" name="NeoVoice" initials="NV" avatarTone="teal" tail="방송중" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg" size="sm" name="코다 / Koda" initials="KO" avatarTone="amber" tail="작업중" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" size="sm" name="Ren Morimoto" initials="RM" avatarTone="purple" tail="5분" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg" size="sm" name="aether.studio" initials="AT" avatarTone="coral" tail="3시간" as="button" />
      </SidebarGroup>
    </Sidebar>

    <Stack
      :style="{ height: '100%', overflow: 'scroll', width: '100%', minWidth: '800px' }"
      as="section"
      justify="start"
      :wrap="false"
      direction="column"
      align="center"
      gap="2xl"
      padding="lg"
    >
      <!-- Hero / VIDEO header section -->
      <Stack
        as="div"
        radius="none"
        direction="column"
        align="center"
        justify="start"
        gap="md"
        padding="none"
        background="none"
        mask="none"
        maskStart="45"
        maskEnd="100"
        maskAngle="0"
        glassBlur="18"
      >
        <SectionTitle
          :style="{ width: '100%' }"
          title="VIDEO"
          icon="sparkles"
          as="header"
          align="center"
          iconTone="purple"
          :showIcon="false"
          subtitleTone="tertiary"
          subtitleVariant="body-sm"
          titleAs="h1"
          titleVariant="heading-1"
          titleWeight="bold"
          :wrapActions="true"
        >
          <SectionTitleGroup :style="{ width: '100%', flex: '0 1 auto', maxWidth: 'var(--ds-spacing-dialog-max-width-sm)' }" align="end">
            <Input
              :style="{ width: '100%' }"
              shape="pill"
              :clearable="true"
              labelPosition="outside"
              type="search"
              placeholder="제목, 크리에이터, 태그 검색"
              leadingIcon="search"
              size="md"
            />
          </SectionTitleGroup>
        </SectionTitle>

        <CardGrid
          :itemProps="[
            { src: 'https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg' },
            { src: 'https://i.pinimg.com/736x/3e/36/00/3e3600f33f0c190104d30d2a971e1659.jpg' },
            { src: 'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg' },
            { src: 'https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg' },
            { src: 'https://i.pinimg.com/1200x/ad/e4/53/ade453608e2e7c8ffc38bc8ba991cb50.jpg' },
            { src: 'https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg' },
          ]"
          itemSizeOverride="640px"
          :shadow="false"
          itemSize="custom"
          count="6"
          cols="3"
          :arrows="false"
          layout="row"
          gap="lg"
          scroll="smooth"
          itemAspectRatio="16 / 9"
          edgeFade="fade"
        >
          <MediaFrame
            :style="{ width: '100%', height: 'fit-content' }"
            :live="false"
            src="https://i.pinimg.com/1200x/ad/e4/53/ade453608e2e7c8ffc38bc8ba991cb50.jpg"
            :locked="false"
            viewerCount="4,218 watching"
            captionEyebrow="ON AIR · 1h 22m"
            captionTitle="새벽 라이브 #18 — Hailey × NeoVoice"
            duration="17:02"
            progress="64"
            progressLabel="Media progress"
            playLabel="Play"
            liveLabel="LIVE"
            aspect="16/9"
            badgeText="Member's Only"
            badgeVariant="solid"
            badgeStatus="danger"
            lockIcon="lock"
            lockActionVariant="primary"
            lockActionSize="sm"
            lockActionShape="pill"
            :showPlay="true"
            :showGrain="true"
            size="md"
            background="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
          />
        </CardGrid>
      </Stack>

      <!-- 실시간 TOP 10 -->
      <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="sm">
        <SectionTitle
          :style="{ width: '100%' }"
          title="실시간 TOP 10"
          icon="trophy"
          as="header"
          align="center"
          iconTone="none"
          :showIcon="true"
          subtitleTone="tertiary"
          subtitleVariant="body-sm"
          titleAs="h4"
          titleVariant="heading-4"
          titleWeight="bold"
          :wrapActions="true"
        >
          <SectionTitleGroup align="end">
            <ButtonPopover trailingIcon="chevron-down" placement="bottom-end" buttonLabel="최신순" buttonShape="default" buttonSize="sm" buttonVariant="ghost" :closeOnItemClick="true">
              <PopoverList>
                <PopoverItem icon="clock">최신순</PopoverItem>
                <PopoverItem icon="flame">인기순</PopoverItem>
                <PopoverItem icon="sparkles">추천순</PopoverItem>
              </PopoverList>
            </ButtonPopover>
            <Button trailingIcon="chevron-right" badgeVariant="danger" variant="ghost" size="sm" shape="default">모든 랭킹 보기</Button>
          </SectionTitleGroup>
        </SectionTitle>

        <CardGrid count="10" itemSize="custom" itemSizeOverride="400px" layout="row" gap="lg" :arrows="false" edgeFade="fade" scroll="snap">
          <!-- 1 -->
          <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
            <Text :truncate="false" :style="{ color: 'var(--ds-color-brand-bg)', fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="primary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">1</Text>
            <VideoListCard avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/ad/e4/53/ade453608e2e7c8ffc38bc8ba991cb50.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="3" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
          <!-- 2 -->
          <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
            <Text :truncate="false" :style="{ color: 'var(--ds-color-brand-bg)', fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="primary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">2</Text>
            <VideoListCard avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/736x/65/2a/e8/652ae82db9bcdc65e6ddc3fe5d61594a.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="3" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
          <!-- 3 -->
          <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
            <Text :truncate="false" :style="{ color: 'var(--ds-color-brand-bg)', fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="primary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">3</Text>
            <VideoListCard avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/736x/3e/36/00/3e3600f33f0c190104d30d2a971e1659.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="3" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
          <!-- 4 -->
          <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
            <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">4</Text>
            <VideoListCard avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="3" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
          <!-- 5 -->
          <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
            <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">5</Text>
            <VideoListCard avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="3" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
          <!-- 6 -->
          <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
            <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">6</Text>
            <VideoListCard avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="3" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
          <!-- 7 -->
          <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
            <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">7</Text>
            <VideoListCard avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/736x/cb/12/b2/cb12b2f39982bf66734cd7e5a34eb891.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="3" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
          <!-- 8 -->
          <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
            <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">8</Text>
            <VideoListCard avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="3" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
          <!-- 9 -->
          <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
            <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">9</Text>
            <VideoListCard avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/ad/e4/53/ade453608e2e7c8ffc38bc8ba991cb50.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="3" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
          <!-- 10 -->
          <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
            <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">10</Text>
            <VideoListCard avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="3" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
        </CardGrid>
      </Stack>

      <!-- 에디터 추천 -->
      <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="sm">
        <SectionTitle
          :style="{ width: '100%' }"
          title="에디터 추천"
          icon="star"
          as="header"
          align="center"
          iconTone="none"
          :showIcon="true"
          subtitleTone="tertiary"
          subtitleVariant="body-sm"
          titleAs="h4"
          titleVariant="heading-4"
          titleWeight="bold"
          :wrapActions="true"
        >
          <SectionTitleGroup align="end">
            <ButtonPopover trailingIcon="chevron-down" placement="bottom-end" buttonLabel="최신순" buttonShape="default" buttonSize="sm" buttonVariant="ghost" :closeOnItemClick="true">
              <PopoverList>
                <PopoverItem icon="clock">최신순</PopoverItem>
                <PopoverItem icon="flame">인기순</PopoverItem>
                <PopoverItem icon="sparkles">추천순</PopoverItem>
              </PopoverList>
            </ButtonPopover>
            <Button trailingIcon="chevron-right" badgeVariant="danger" variant="ghost" size="sm" shape="default">모두 보기</Button>
          </SectionTitleGroup>
        </SectionTitle>

        <CardGrid
          cols="3"
          itemAspectRatio=""
          :style="{ height: 'fit-content' }"
          count="10"
          itemSize="custom"
          itemSizeOverride="400px"
          layout="row"
          gap="lg"
          :arrows="false"
          edgeFade="fade"
          scroll="snap"
        >
          <Stack :style="{ height: 'fit-content' }" as="div" radius="none" direction="column" align="stretch" justify="start" gap="xxs" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
            <Stack :style="{ height: 'fit-content', paddingRight: 'var(--ds-spacing-space-2)' }" as="div" radius="lg" direction="row" align="stretch" justify="start" gap="xs" padding="lg" background="surface" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
              <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="xxs" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
                <Text lineHeight="128%" :truncate="true" :style="{ width: '100%', height: 'fit-content' }" as="p" tone="primary" variant="body" transform="none" weight="semibold" truncateLines="3" align="start">Editor J</Text>
                <Text lineHeight="128%" :truncate="true" :style="{ width: '100%', height: '54px' }" as="p" tone="secondary" variant="body" transform="none" weight="inherit" truncateLines="3" align="start">잠 못 드는 밤, 옆에서 다정히 속삭여 드릴게요. 단단한 위스퍼 보이스와 가벼운 ear-blowing, 페이지 넘기는 소리, 빗소리 레이어를 90분간 이어가는 풀버전입니다. 헤드폰 사용을 권장합니다. 챕터별로 분리되어 있어 듣고 싶은 부분부터 골라 들을 수 있어요.</Text>
              </Stack>
            </Stack>
            <VideoListCard avatarSrc="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg" thumbnailImageUrl="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
          </Stack>
        </CardGrid>
      </Stack>

      <!-- 오늘만 무료감상 -->
      <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="sm">
        <SectionTitle
          :style="{ width: '100%' }"
          title="오늘만 무료감상"
          icon="hand-coins"
          as="header"
          align="center"
          iconTone="none"
          :showIcon="true"
          subtitleTone="tertiary"
          subtitleVariant="body-sm"
          titleAs="h4"
          titleVariant="heading-4"
          titleWeight="bold"
          :wrapActions="true"
        >
          <SectionTitleGroup align="end">
            <Button trailingIcon="chevron-right" badgeVariant="danger" variant="ghost" size="sm" shape="default">모두 보기</Button>
          </SectionTitleGroup>
        </SectionTitle>

        <CardGrid
          :itemProps="[
            {},
            { thumbnailImageUrl: 'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg' },
            { thumbnailImageUrl: 'https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg' },
            {},
            { thumbnailImageUrl: 'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg' },
            { thumbnailImageUrl: 'https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg' },
          ]"
          count="10"
          itemSize="custom"
          itemSizeOverride="400px"
          layout="row"
          gap="lg"
          :arrows="false"
          edgeFade="fade"
          scroll="snap"
        >
          <VideoListCard avatarSrc="https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="FREE" badgeVariant="solid" badgeStatus="success" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
        </CardGrid>
      </Stack>

      <!-- 최신 작품 -->
      <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="sm">
        <SectionTitle
          :style="{ width: '100%', height: '32px' }"
          title="최신 작품"
          icon="video"
          as="header"
          align="center"
          iconTone="none"
          :showIcon="true"
          subtitleTone="tertiary"
          subtitleVariant="body-sm"
          titleAs="h4"
          titleVariant="heading-4"
          titleWeight="bold"
          :wrapActions="true"
        />

        <Stack direction="row" align="center" gap="md" :wrap="false">
          <Stack flex="1 1 auto" minWidth="0">
            <Tabs ariaLabel="카테고리 필터" size="md" variant="pill">
              <TabsList>
                <Tab selected leadingIcon="layout-grid">전체</Tab>
                <Tab leadingIcon="headphones">보이스드라마</Tab>
                <Tab leadingIcon="clapperboard">시네마틱</Tab>
                <Tab leadingIcon="ear">ASMR</Tab>
                <Tab leadingIcon="film">단편영상</Tab>
                <Tab leadingIcon="sparkles">애니메이션</Tab>
                <Tab leadingIcon="play">MV</Tab>
                <Tab leadingIcon="video">Vlog</Tab>
              </TabsList>
            </Tabs>
          </Stack>

          <SectionTitleGroup align="end">
            <ButtonPopover trailingIcon="chevron-down" placement="bottom-end" buttonLabel="최신순" buttonShape="default" buttonSize="sm" buttonVariant="ghost" :closeOnItemClick="true">
              <PopoverList>
                <PopoverItem icon="clock">최신순</PopoverItem>
                <PopoverItem icon="flame">인기순</PopoverItem>
                <PopoverItem icon="sparkles">추천순</PopoverItem>
              </PopoverList>
            </ButtonPopover>
            <Button trailingIcon="chevron-right" badgeVariant="danger" variant="ghost" size="sm" shape="default">모두 보기</Button>
          </SectionTitleGroup>
        </Stack>

        <!-- 로딩 -->
        <Text v-if="videoStore.loading && videoStore.posts.length === 0" tone="tertiary">불러오는 중...</Text>

        <!-- 빈 상태 -->
        <Text v-else-if="!videoStore.loading && videoStore.posts.length === 0" tone="tertiary">작품이 없습니다.</Text>

        <CardGrid
          v-else
          cols="4"
          :count="videoStore.posts.length"
          itemSize="custom"
          itemSizeOverride="400px"
          layout="grid"
          gap="lg"
          :arrows="false"
          edgeFade="fade"
          scroll="snap"
        >
          <VideoListCard
            v-for="post in videoStore.posts"
            :key="post.id"
            mediaSize="sm"
            :thumbnailImageUrl="post.locked_thumbnail_url ?? undefined"
            :title="post.title_ko ?? post.title ?? ''"
            :creatorName="post.creator_user?.nickname ?? ''"
            :meta="timeAgo(post.created_at)"
            :duration="post.duration ?? undefined"
            actionLabel="More options"
            actionSize="sm"
            thumbnailAspect="16/9"
            :avatarAlt="post.creator_user?.nickname ?? ''"
            :avatarInitials="(post.creator_user?.nickname ?? '?')[0]"
            :avatarSrc="post.creator_user?.profile_image ?? undefined"
            :showGrain="true"
            variant="vertical"
            avatarTone="neutral"
            titleLines="1"
            size="sm"
            avatarSize="sm"
            avatarShape="circle"
            thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
            actionIcon="ellipsis"
            :showAction="true"
          />
        </CardGrid>
      </Stack>

      <!-- Load more -->
      <Stack direction="row" justify="center" marginTop="var(--ds-spacing-space-6)" padding="var(--wb-spacing-space-4)" height="40px" marginBottom="var(--ds-spacing-space-12)">
        <Button variant="ghost" size="sm" label="더 불러오기" trailingIcon="chevron-down" />
      </Stack>
    </Stack>
  </Stack>
</template>
