<script setup>
import {
  Sidebar,
  SidebarFollowRow,
  SidebarGroup,
  SidebarItem,
  Stack,
  UserBlock,
  PopoverList,
  PopoverItem,
  ButtonPopover,
  SectionTitle,
  Tabs,
  TabsList,
  Tab,
  MediaFrame,
  CardGrid,
  VideoListCard,
  Button,
  Text,
  SectionTitleGroup,
  SidebarFooter,
  UserCardHead,
  UserCard,
  Input,
  Link,
  Icon,
  Badge,
  Avatar,
  Card,
} from '@/components'
</script>

<template>
  <Stack
    :style="{ width: '100%', height: '100%', overflow: 'hidden' }"
    as="main"
    direction="row"
    align="stretch"
    gap="lg"
  >
    <!-- LEFT — SIDEBAR -->
    <Sidebar
      :style="{ width: '72px' }"
      :collapsed="true"
      collapsedWidth="72"
      headerLogoImage="/workbench-assets/icons/logo-mpks329o.svg"
      headerSymbolImage="/workbench-assets/icons/symbol-mpks329n.svg"
      presentation="sidebar"
      width="272px"
      background="none"
      :bordered="false"
      radius="none"
      brandMarkText="Y"
      expandedBrandDisplay="symbol-logo"
      height="100vh"
    >
      <SidebarGroup seeAllIcon="chevron-right">
        <UserCard name="Hailey Luna" initials="HL" meta="Creator · live now" variant="outline" tint="sunken">
          <UserCardHead>
            <UserBlock
              action3Icon=""
              action3Variant="ghost"
              action2Icon=""
              avatarSize="sm"
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
                placement="bottom-start"
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
          </UserCardHead>
        </UserCard>
      </SidebarGroup>

      <SidebarGroup seeAllIcon="chevron-right">
        <SidebarItem :emphasized="false" badgeVariant="subtle" icon="plus" label="작품 만들기" :active="false" />
      </SidebarGroup>

      <SidebarGroup>
        <SidebarItem icon="house" label="홈" :active="true" />
        <SidebarItem icon="layout-grid" label="탐색" :active="false" />
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

      <SidebarFooter primaryLabel="다크모드" primaryIcon="moon" secondaryLabel="설정" secondaryIcon="settings" />
    </Sidebar>

    <Stack
      :style="{ height: '100%', paddingRight: 'var(--ds-spacing-stack-padding-lg)', overflow: 'hidden', width: '100%', paddingTop: '0.75rem' }"
      as="div"
      radius="none"
      direction="column"
      align="center"
      justify="start"
      gap="none"
      padding="none"
      background="none"
      mask="none"
      maskStart="45"
      maskEnd="100"
      maskAngle="0"
      glassBlur="18"
    >
      <Stack
        :style="{ width: '100%', overflow: 'visible', flex: '1 1 auto', height: '100%', maxWidth: '1440px' }"
        as="div"
        radius="md"
        direction="column"
        align="center"
        justify="start"
        gap="xs"
        padding="none"
        background="none"
        mask="none"
        maskStart="45"
        maskEnd="100"
        maskAngle="0"
        glassBlur="18"
      >
        <!-- Header -->
        <Stack
          justify="between"
          background="none"
          :style="{ width: '100%', paddingTop: 'var(--ds-spacing-space-2)', top: '0px', zIndex: '2', paddingBottom: 'var(--ds-spacing-space-3)' }"
          as="header"
          direction="row"
          align="center"
          gap="md"
          :wrap="false"
        >
          <Input
            leadingIcon="search"
            :style="{ maxWidth: '400px' }"
            placeholder="검색어를 입력하세요."
            type="text"
            state="default"
            labelPosition="outside"
            size="md"
            shape="pill"
          />
          <Button shape="pill" variant="soft" size="md" leadingIcon="ellipsis" iconOnly aria-label="라이브러리 설정" />
        </Stack>

        <!-- Scrollable content -->
        <Stack
          :scrollFade="false"
          :style="{ height: '100%', width: '100%', overflow: 'scroll' }"
          as="div"
          radius="md"
          direction="column"
          align="center"
          justify="start"
          gap="2xl"
          padding="none"
          background="none"
          mask="none"
          maskStart="45"
          maskEnd="100"
          maskAngle="0"
          glassBlur="18"
        >
          <!-- Hero card grid -->
          <CardGrid
            :itemPropKeys="['viewerCount', 'captionEyebrow', 'captionTitle', 'duration', 'progress', 'progressLabel', 'playLabel', 'liveLabel', 'src', 'background', 'badgeText', 'badgeVariant', 'badgeStatus', 'locked', 'lockIcon', 'lockTitle', 'lockMessage', 'lockActionLabel', 'lockActionIcon', 'lockActionVariant', 'lockActionSize', 'lockActionShape', 'live', 'size', 'fit', 'maxHeight', 'align']"
            itemMaxSize="900px"
            itemMinSize="340px"
            :style="{ width: '100%' }"
            itemSizeOverride="50%"
            :itemProps="[{ src: 'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg' }, { src: 'https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg' }, { src: 'https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg' }, { src: 'https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg' }, { src: 'https://i.pinimg.com/736x/65/2a/e8/652ae82db9bcdc65e6ddc3fe5d61594a.jpg' }, { src: 'https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg' }]"
            :shadow="false"
            itemSize="custom"
            count="6"
            cols="3"
            :arrows="false"
            layout="row"
            gap="sm"
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
              :showPlay="false"
              :showGrain="true"
              size="md"
              background="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
            />
          </CardGrid>

          <!-- 실시간 TOP 10 -->
          <Stack as="section" direction="column" gap="sm">
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
                <ButtonPopover
                  trailingIcon="chevron-down"
                  placement="bottom-end"
                  buttonLabel="최신순"
                  buttonShape="default"
                  buttonSize="sm"
                  buttonVariant="ghost"
                  :closeOnItemClick="true"
                >
                  <PopoverList>
                    <PopoverItem icon="clock">최신순</PopoverItem>
                    <PopoverItem icon="flame">인기순</PopoverItem>
                    <PopoverItem icon="sparkles">추천순</PopoverItem>
                  </PopoverList>
                </ButtonPopover>
                <Button trailingIcon="chevron-right" badgeVariant="danger" variant="ghost" size="sm" shape="default">모든 랭킹 보기</Button>
              </SectionTitleGroup>
            </SectionTitle>

            <CardGrid
              itemMaxSize="480px"
              itemMinSize="320px"
              count="10"
              itemSize="custom"
              itemSizeOverride="30%"
              layout="row"
              gap="lg"
              :arrows="false"
              edgeFade="fade"
              scroll="snap"
            >
              <!-- 1 -->
              <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
                <Text :truncate="false" :style="{ color: 'var(--ds-color-brand-bg)', fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="primary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">1</Text>
                <VideoListCard mediaSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/ad/e4/53/ade453608e2e7c8ffc38bc8ba991cb50.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="md" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
              </Stack>

              <!-- 2 -->
              <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
                <Text :truncate="false" :style="{ color: 'var(--ds-color-brand-bg)', fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="primary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">2</Text>
                <VideoListCard mediaSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/736x/65/2a/e8/652ae82db9bcdc65e6ddc3fe5d61594a.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="md" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
              </Stack>

              <!-- 3 -->
              <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
                <Text :truncate="false" :style="{ color: 'var(--ds-color-brand-bg)', fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="primary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">3</Text>
                <VideoListCard mediaSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/736x/3e/36/00/3e3600f33f0c190104d30d2a971e1659.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="md" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
              </Stack>

              <!-- 4 -->
              <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
                <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">4</Text>
                <VideoListCard mediaSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="md" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
              </Stack>

              <!-- 5 -->
              <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
                <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">5</Text>
                <VideoListCard mediaSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="md" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
              </Stack>

              <!-- 6 -->
              <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
                <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">6</Text>
                <VideoListCard mediaSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="md" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
              </Stack>

              <!-- 7 -->
              <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
                <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">7</Text>
                <VideoListCard mediaSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/736x/cb/12/b2/cb12b2f39982bf66734cd7e5a34eb891.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="md" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
              </Stack>

              <!-- 8 -->
              <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
                <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">8</Text>
                <VideoListCard mediaSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="md" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
              </Stack>

              <!-- 9 -->
              <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
                <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">9</Text>
                <VideoListCard mediaSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/ad/e4/53/ade453608e2e7c8ffc38bc8ba991cb50.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="md" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
              </Stack>

              <!-- 10 -->
              <Stack justify="start" as="article" direction="row" align="start" gap="none" :style="{ width: '100%' }">
                <Text :truncate="false" :style="{ fontStyle: 'italic', flex: '0 0 auto', width: '40px' }" as="p" tone="tertiary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">10</Text>
                <VideoListCard mediaSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" thumbnailImageUrl="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg" title="새벽이 떠오를 때 — 2인 콜라보 단편" creatorName="코다 / Koda" meta="92K 시청 · 1주 전" duration="17:02" progress="64" progressLabel="Media progress" actionLabel="More options" actionSize="sm" thumbnailAspect="16/9" avatarAlt="코다 / Koda" avatarInitials="코다" creatorBadge="후원자 145k" creatorBadgeStatus="neutral" creatorBadgeVariant="flat" badgeText="15+" badgeVariant="solid" badgeStatus="warning" :creatorVerified="true" :showGrain="true" variant="vertical" avatarTone="brand" titleLines="1" size="lg" avatarSize="sm" avatarShape="circle" thumbnailWidth="50%" thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)" actionIcon="ellipsis" :showAction="true" />
              </Stack>
            </CardGrid>
          </Stack>

          <!-- 에디터 추천 -->
          <Stack as="section" direction="column" gap="sm">
            <SectionTitle
              :style="{ width: '100%' }"
              title="에디터 추천"
              icon="thumbs-up"
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
                <ButtonPopover
                  trailingIcon="chevron-down"
                  placement="bottom-end"
                  buttonLabel="최신순"
                  buttonShape="default"
                  buttonSize="sm"
                  buttonVariant="ghost"
                  :closeOnItemClick="true"
                >
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
              itemMaxSize="480px"
              itemMinSize="320px"
              cols="3"
              itemAspectRatio=""
              :style="{ height: 'fit-content' }"
              count="10"
              itemSize="custom"
              itemSizeOverride="30%"
              layout="row"
              gap="sm"
              :arrows="false"
              edgeFade="fade"
              scroll="snap"
            >
              <Stack :style="{ height: 'fit-content' }" as="div" radius="none" direction="column" align="stretch" justify="start" gap="sm" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
                <VideoListCard
                  eyebrowColor="#ff0055"
                  eyebrowColorTokenCollection="sg-ds-library-semantic-color"
                  eyebrowColorToken="brand-bg"
                  eyebrow="Editor's Pick"
                  avatarSrc="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg"
                  thumbnailImageUrl="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg"
                  title="새벽이 떠오를 때 — 2인 콜라보 단편"
                  creatorName="코다 / Koda"
                  meta="92K 시청 · 1주 전"
                  duration="17:02"
                  progress="64"
                  progressLabel="Media progress"
                  actionLabel="More options"
                  actionSize="sm"
                  thumbnailAspect="16/9"
                  avatarAlt="코다 / Koda"
                  avatarInitials="코다"
                  creatorBadge="후원자 145k"
                  creatorBadgeStatus="neutral"
                  creatorBadgeVariant="flat"
                  badgeText="15+"
                  badgeVariant="solid"
                  badgeStatus="warning"
                  :creatorVerified="true"
                  :showGrain="true"
                  variant="vertical"
                  avatarTone="brand"
                  titleLines="1"
                  size="lg"
                  avatarSize="md"
                  avatarShape="circle"
                  thumbnailWidth="50%"
                  thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                  actionIcon="ellipsis"
                  :showAction="true"
                />
                <Stack
                  :style="{ height: 'fit-content', paddingRight: 'var(--ds-spacing-space-2)' }"
                  as="div"
                  radius="lg"
                  direction="row"
                  align="stretch"
                  justify="start"
                  gap="xs"
                  padding="lg"
                  background="surface"
                  mask="none"
                  maskStart="45"
                  maskEnd="100"
                  maskAngle="0"
                  glassBlur="18"
                >
                  <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="xxs" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
                    <UserBlock
                      meta="YOVO 공식 에디터"
                      action3Icon=""
                      action3Variant="ghost"
                      action2Icon=""
                      avatarSize="xs"
                      avatarSrc="https://i.pinimg.com/736x/cb/12/b2/cb12b2f39982bf66734cd7e5a34eb891.jpg"
                      :style="{ width: '100%' }"
                      name="Munhee J"
                      initials="MJ"
                      avatarTone="purple"
                      :verified="true"
                      size="sm"
                    >
                      <ButtonPopover
                        :style="{ width: '32px' }"
                        leadingIcon="ellipsis"
                        :iconOnly="true"
                        trailingIcon="chevron-down"
                        placement="bottom-start"
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
                    <Text lineHeight="128%" :truncate="true" :style="{ width: '100%', height: '54px' }" as="p" tone="secondary" variant="body" transform="none" weight="inherit" truncateLines="3" align="start">잠 못 드는 밤, 옆에서 다정히 속삭여 드릴게요. 단단한 위스퍼 보이스와 가벼운 ear-blowing, 페이지 넘기는 소리, 빗소리 레이어를 90분간 이어가는 풀버전입니다. 헤드폰 사용을 권장합니다. 챕터별로 분리되어 있어 듣고 싶은 부분부터 골라 들을 수 있어요.</Text>
                  </Stack>
                </Stack>
              </Stack>
            </CardGrid>
          </Stack>

          <!-- 공식 크리에이터 -->
          <Stack :style="{ width: '100%' }" as="section" direction="column" gap="sm">
            <SectionTitle
              :style="{ width: '100%' }"
              title="공식 크리에이터"
              icon="trending-up"
              as="header"
              align="center"
              iconTone="none"
              :showIcon="true"
              titleAs="h4"
              titleVariant="heading-4"
              titleWeight="bold"
              :wrapActions="true"
            >
              <SectionTitleGroup align="end">
                <Button trailingIcon="chevron-right" variant="soft" size="sm" shape="default">모두 보기</Button>
              </SectionTitleGroup>
            </SectionTitle>

            <CardGrid
              itemMaxSize="280px"
              itemMinSize="200px"
              itemSizeOverride="12%"
              count="10"
              itemSize="custom"
              layout="row"
              gap="sm"
              :arrows="false"
              edgeFade="fade"
              scroll="snap"
            >
              <Card
                :style="{ backgroundImage: 'linear-gradient(var(--ds-color-surface-card), var(--ds-color-surface-card))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundBlendMode: 'normal' }"
                variant="bare"
                padding="lg"
              >
                <Stack direction="column" align="center" gap="md">
                  <Stack as="div" radius="none" direction="column" align="center" justify="start" gap="xxs" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
                    <Avatar src="https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg" initials="C" size="2xl" shape="circle" tone="purple" />
                    <Stack justify="center" direction="row" align="center" gap="xxs">
                      <Text as="p" variant="body" weight="semibold">코스모 픽쳐스</Text>
                      <Icon name="badge-check" size="14px" />
                    </Stack>
                    <Text as="p" variant="caption" tone="tertiary">@cosmo_pic</Text>
                  </Stack>
                  <Badge status="success" variant="flat" size="md" shape="pill" icon="trending-up">+27.8%</Badge>
                  <Button :style="{ width: '100%' }" variant="soft" size="sm" shape="pill" leadingIcon="plus">팔로우</Button>
                </Stack>
              </Card>
            </CardGrid>
          </Stack>

          <!-- 최신 작품 -->
          <Stack as="section" direction="column" gap="sm">
            <SectionTitle
              :style="{ width: '100%', height: '32px' }"
              title="최신 작품"
              icon="sparkle"
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
                <ButtonPopover
                  trailingIcon="chevron-down"
                  placement="bottom-end"
                  buttonLabel="최신순"
                  buttonShape="default"
                  buttonSize="sm"
                  buttonVariant="ghost"
                  :closeOnItemClick="true"
                >
                  <PopoverList>
                    <PopoverItem icon="clock">최신순</PopoverItem>
                    <PopoverItem icon="flame">인기순</PopoverItem>
                    <PopoverItem icon="sparkles">추천순</PopoverItem>
                  </PopoverList>
                </ButtonPopover>
                <Button trailingIcon="chevron-right" badgeVariant="danger" variant="ghost" size="sm" shape="default">모두 보기</Button>
              </SectionTitleGroup>
            </Stack>

            <CardGrid
              :itemProps="[{}, { thumbnailImageUrl: 'https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/736x/97/7f/36/977f363a9b80eaf236f4bbc0a1321fc7.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/1200x/8c/98/24/8c98241e92d8dd4db5942c4559ca0805.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/736x/cb/12/b2/cb12b2f39982bf66734cd7e5a34eb891.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/736x/65/2a/e8/652ae82db9bcdc65e6ddc3fe5d61594a.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg' }, {}, { thumbnailImageUrl: 'https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg' }]"
              cols="4"
              count="12"
              itemSize="custom"
              itemSizeOverride="400px"
              layout="grid"
              gap="sm"
              :arrows="false"
              edgeFade="fade"
              scroll="snap"
            >
              <VideoListCard
                mediaSize="sm"
                thumbnailImageUrl="https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg"
                title="새벽이 떠오를 때 — 2인 콜라보 단편"
                creatorName="코다 / Koda"
                meta="92K 시청 · 1주 전"
                duration="17:02"
                progress="24"
                actionLabel="More options"
                actionSize="sm"
                thumbnailAspect="16/9"
                avatarAlt="코다 / Koda"
                avatarInitials="코다"
                creatorBadge="후원자 145k"
                creatorBadgeStatus="neutral"
                creatorBadgeVariant="flat"
                badgeText="15+"
                badgeVariant="solid"
                badgeStatus="warning"
                :creatorVerified="true"
                :showGrain="true"
                variant="vertical"
                avatarTone="brand"
                titleLines="1"
                size="sm"
                avatarSize="sm"
                avatarShape="circle"
                thumbnailWidth="50%"
                thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                actionIcon="ellipsis"
                :showAction="true"
              />
            </CardGrid>

            <Stack direction="row" justify="center" padding="var(--wb-spacing-space-4)">
              <Button variant="ghost" size="sm" label="더 불러오기" trailingIcon="chevron-down" />
            </Stack>
          </Stack>

          <!-- Footer -->
          <Stack
            :style="{ height: 'fit-content', marginTop: 'auto' }"
            justify="center"
            align="center"
            padding="xl"
            background="none"
            direction="row"
            :wrap="true"
            gap="none"
          >
            <Stack :wrap="true" as="div" radius="none" direction="row" align="stretch" justify="center" gap="sm" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
              <Link variant="subtle" size="sm">소개</Link>
              <Link variant="subtle" size="sm">크리에이터 가이드</Link>
              <Link variant="subtle" size="sm">크레딧 정책</Link>
              <Link variant="subtle" size="sm">고객지원</Link>
              <Link variant="subtle" size="sm">한국어</Link>
            </Stack>
            <Stack justify="center" direction="row" width="100%" marginTop="12px">© 2026 YOVO</Stack>
          </Stack>

        </Stack>
      </Stack>
    </Stack>
  </Stack>
</template>
