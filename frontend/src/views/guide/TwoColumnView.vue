<script setup>
import {
  Sidebar,
  SidebarFollowRow,
  SidebarGroup,
  SidebarItem,
  Stack,
  Text,
  UserBlock,
  PopoverList,
  PopoverItem,
  ButtonPopover,
  Link,
  SectionTitle,
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
        <SidebarFollowRow
          avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg"
          size="sm"
          name="Hailey Luna"
          initials="HL"
          avatarTone="brand"
          status="live"
          tail="LIVE"
          tailStatus="live"
          tailVariant="plain"
          as="button"
        />
        <SidebarFollowRow
          avatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg"
          size="sm"
          name="NeoVoice"
          initials="NV"
          avatarTone="teal"
          tail="방송중"
          as="button"
        />
        <SidebarFollowRow
          avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg"
          size="sm"
          name="코다 / Koda"
          initials="KO"
          avatarTone="amber"
          tail="작업중"
          as="button"
        />
        <SidebarFollowRow
          avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg"
          size="sm"
          name="Ren Morimoto"
          initials="RM"
          avatarTone="purple"
          tail="5분"
          as="button"
        />
        <SidebarFollowRow
          avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg"
          size="sm"
          name="aether.studio"
          initials="AT"
          avatarTone="coral"
          tail="3시간"
          as="button"
        />
      </SidebarGroup>
    </Sidebar>

    <!-- MAIN -->
    <Stack
      align="center"
      :style="{ width: '100%', paddingTop: '0.75rem', overflow: 'hidden', height: '100%', flex: '1 1 auto', paddingRight: '1rem', minWidth: '600px' }"
      direction="column"
      gap="none"
    >
      <!-- Hero details -->
      <Stack
        :style="{ height: '100%', maxWidth: '1400px' }"
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
          justify="between"
          background="none"
          :style="{ height: 'var(--ds-spacing-space-16)', width: '100%', paddingTop: 'var(--ds-spacing-space-2)', top: '0px', position: 'sticky', zIndex: '1', paddingBottom: 'var(--ds-spacing-space-3)' }"
          as="header"
          direction="row"
          align="center"
          gap="md"
          :wrap="false"
        >
          <Text as="p" tone="primary" variant="heading-1" transform="none" weight="inherit" truncateLines="1" align="start">Page Header</Text>

          <ButtonPopover
            leadingIcon="ellipsis"
            :iconOnly="true"
            trailingIcon="chevron-down"
            placement="bottom-end"
            buttonLabel="최신순"
            buttonShape="pill"
            buttonSize="sm"
            buttonVariant="soft"
            :closeOnItemClick="true"
          >
            <PopoverList>
              <PopoverItem icon="circle-user">프로필</PopoverItem>
              <PopoverItem icon="layout-dashboard">대쉬보드</PopoverItem>
              <PopoverItem icon="settings">설정</PopoverItem>
            </PopoverList>
          </ButtonPopover>
        </Stack>

        <Stack
          :style="{ width: '100%', overflow: 'scroll', flex: '1 1 auto' }"
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
          <Stack
            :style="{ width: '100%', height: 'fit-content' }"
            as="div"
            radius="none"
            direction="column"
            align="stretch"
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
            <Stack
              :style="{ height: '320px' }"
              as="div"
              radius="none"
              direction="column"
              align="stretch"
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
              <Card :style="{ height: '100%' }" title="Header Section" variant="bare" gap="md" padding="md" />
            </Stack>

            <Stack
              as="div"
              radius="none"
              direction="column"
              align="stretch"
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
                title="Section1"
                icon="sparkles"
                as="header"
                align="start"
                iconTone="purple"
                :showIcon="false"
                subtitleTone="tertiary"
                subtitleVariant="body-sm"
                titleAs="h4"
                titleVariant="heading-4"
                titleWeight="bold"
                :wrapActions="true"
              />
            </Stack>

            <Stack
              as="div"
              radius="none"
              direction="column"
              align="stretch"
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
                title="Section2"
                icon="sparkles"
                as="header"
                align="start"
                iconTone="purple"
                :showIcon="false"
                subtitleTone="tertiary"
                subtitleVariant="body-sm"
                titleAs="h4"
                titleVariant="heading-4"
                titleWeight="bold"
                :wrapActions="true"
              />
            </Stack>
          </Stack>

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
            <Stack
              :wrap="true"
              as="div"
              radius="none"
              direction="row"
              align="stretch"
              justify="center"
              gap="sm"
              padding="none"
              background="none"
              mask="none"
              maskStart="45"
              maskEnd="100"
              maskAngle="0"
              glassBlur="18"
            >
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
