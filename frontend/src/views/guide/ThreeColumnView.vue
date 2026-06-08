<script setup>
import {
  Sidebar,
  SidebarFollowRow,
  SidebarGroup,
  SidebarItem,
  Stack,
  Text,
  UserBlock,
  UserCard,
  UserCardHead,
  UserCardSection,
  UserCardStats,
  PopoverList,
  PopoverItem,
  ButtonPopover,
  CreditBalanceCardRow,
  TopicRow,
  Link,
  CreditBalanceCard,
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
    width="100%"
    minHeight="100%"
    overflow="auto"
  >
    <!-- LEFT — SIDEBAR -->
    <Sidebar
      :style="{ width: '272px' }"
      :collapsed="false"
      collapsedWidth="64"
      headerLogoImage="/workbench-assets/icons/logo-mpks329o.svg"
      headerSymbolImage="/workbench-assets/icons/symbol-mpks329n.svg"
      presentation="sidebar"
      width="md"
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

    <!-- MAIN CENTER COLUMN -->
    <Stack
      align="center"
      :style="{ width: '100%', paddingTop: 'var(--ds-spacing-space-3)', overflow: 'hidden', height: '100%', flex: '1 1 auto', minWidth: '600px' }"
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
        gap="xxs"
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
          <SectionTitle
            title="Page Title"
            icon="sparkles"
            as="header"
            align="start"
            iconTone="purple"
            :showIcon="false"
            subtitleTone="tertiary"
            subtitleVariant="body-sm"
            titleAs="h1"
            titleVariant="heading-1"
            titleWeight="bold"
            :wrapActions="true"
          />
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
            :style="{ height: '448px', width: '100%' }"
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

    <!-- RIGHT — ASIDE -->
    <Stack
      :style="{ height: '100%', paddingBottom: 'var(--ds-spacing-space-4)', minWidth: '280px', maxWidth: '320px' }"
      as="aside"
      align="stretch"
      gap="2xl"
      padding="lg"
    >
      <!-- MY CARD -->
      <UserCard :style="{ flex: '0 0 auto' }" action2Variant="primary" action1Variant="ghost" tint="default" variant="outline">
        <UserCardHead :style="{ height: '84px' }" name="Name" avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg">
          <UserBlock
            action3Variant="ghost"
            action3Icon=""
            avatarSize="lg"
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
          </UserBlock>
        </UserCardHead>

        <UserCardStats
          :style="{ padding: 'var(--ds-spacing-space-2)' }"
          followersLabel="팔로워"
          followersValue="12.4K"
          followingLabel="멤버"
          followingValue="384"
          postsLabel="포스트"
          postsValue="128"
        />

        <UserCardSection :style="{ height: 'fit-content' }" tint="sunken">
          <CreditBalanceCard :showRows="true" :showActions="true" action2Label="이력" action1Label="충전하기">
            <CreditBalanceCardRow :style="{ height: '21px' }" label="후원자" value="1,455" delta="+6" deltaTone="positive" />
            <CreditBalanceCardRow :style="{ height: '21px' }" label="오늘 받은 후원" value="+240CRD" delta="+18%" deltaTone="positive" />
          </CreditBalanceCard>
        </UserCardSection>
      </UserCard>

      <!-- Suggested creators / YOVO Trending -->
      <Stack :style="{ height: 'fit-content' }" direction="column" gap="none">
        <Stack :style="{ padding: '0px', margin: '0px' }" direction="row" align="center" justify="between">
          <Text as="h3" variant="ui" weight="semibold">YOVO 트랜딩</Text>
          <Link tailIcon="chevron-right" :external="false" variant="subtle" size="sm" href="#">모두보기</Link>
        </Stack>
        <TopicRow :rank="1" title="달이 지는 도시" sub="317K 시청 · 1,840 후원자" delta="+218%" deltaTone="brand" :divider="true" />
        <TopicRow :style="{ height: '55px' }" :rank="2" title="#synthwave" sub="이번 주 새 트랙 218개" delta="+94%" deltaTone="neutral" :divider="true" />
        <TopicRow :rank="3" title="한국어 내레이션" sub="12개 모집 진행 중" delta="+61%" deltaTone="neutral" :divider="true" />
        <TopicRow :rank="4" title="Lumen-X EP.4 비하인드" sub="신규 멤버 +182 / 7일" delta="—" deltaTone="neutral" :divider="true" />
        <TopicRow :rank="5" title="aether.studio" sub="「여름 끝의 라디오」 응답 모집" delta="NEW" deltaTone="brand" :divider="false" />
      </Stack>

      <!-- Follow Suggestions -->
      <Stack as="section" direction="column" gap="xs" aria-label="Suggested creators">
        <Stack direction="row" align="center" justify="between">
          <Text as="h3" variant="ui" weight="semibold">팔로우 추천</Text>
          <Link variant="subtle" size="sm" href="#">새로고침</Link>
        </Stack>
        <Stack direction="column" gap="md">
          <UserBlock
            avatarSize="sm"
            avatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg"
            name="SOYU"
            meta="보컬 · 24.1K · Hailey와 자주 작업"
            initials="SY"
            avatarTone="pink"
            :verified="true"
            size="sm"
          />
          <UserBlock
            avatarSize="sm"
            avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg"
            name="Mika 三輪"
            meta="첼리스트 · 8.6K · 콜라보 가능"
            initials="MK"
            avatarTone="green"
            size="sm"
          />
          <UserBlock
            avatarSize="sm"
            avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg"
            name="Nexus Choir"
            meta="합창 · AI 보컬 합성 · 3.2K"
            initials="NX"
            avatarTone="blue"
            size="sm"
          />
          <UserBlock
            avatarSize="sm"
            avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg"
            name="유진 / Yujin"
            meta="사운드 디자이너 · 1.4K"
            initials="YJ"
            avatarTone="green"
            size="sm"
          />
        </Stack>
      </Stack>
    </Stack>
  </Stack>
</template>
