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
  SectionTitleGroup,
  TabsPanel,
  PostCard,
  PostStack,
  Button,
  Tab,
  TabsList,
  Tabs,
  Input,
  Story,
  StoryStrip,
} from '@/components'
</script>

<template>
  <Stack
    :style="{ width: '100%', height: '100%', overflow: 'scroll' }"
    as="main"
    direction="row"
    align="stretch"
    gap="lg"
  >
    <!-- LEFT — SIDEBAR -->
    <Sidebar
      :style="{ height: '100%' }"
      :collapsed="false"
      collapsedWidth="64"
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
      <SidebarGroup :style="{ height: 'fit-content' }">
        <SidebarItem :emphasized="true" badgeVariant="subtle" icon="plus" label="작품 만들기" :active="false" />
      </SidebarGroup>

      <SidebarGroup>
        <SidebarItem icon="house" label="홈" :active="true" />
        <SidebarItem icon="video" label="VIDEO" :active="false" />
        <SidebarItem icon="user-star" label="크리에이터" badgeStatus="info" badgeVariant="subtle" :active="false" />
        <SidebarItem icon="messages-square" label="채팅" :active="false" />
        <SidebarItem badge="12" icon="bell-dot" label="알림" :active="false" />
        <SidebarItem icon="book-marked" label="라이브러리" :active="false" />
      </SidebarGroup>

      <SidebarGroup count="45" seeAllLabel="모두보기" label="팔로잉">
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg" size="sm" name="Hailey Luna" initials="HL" avatarTone="brand" status="live" tail="LIVE" tailStatus="live" tailVariant="plain" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg" size="sm" name="NeoVoice" initials="NV" avatarTone="teal" tail="방송중" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg" size="sm" name="코다 / Koda" initials="KO" avatarTone="amber" tail="작업중" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" size="sm" name="Ren Morimoto" initials="RM" avatarTone="purple" tail="5분" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg" size="sm" name="aether.studio" initials="AT" avatarTone="coral" tail="3시간" as="button" />
      </SidebarGroup>

      <SidebarGroup :style="{ height: '100%' }" seeAllLabel="모두보기" count="13" label="후원 중인 채널">
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" status="live" size="sm" name="Lumen-X" initials="LX" avatarTone="coral" tail="VIP" tailStatus="warning" tailVariant="subtle" as="button" />
        <SidebarFollowRow avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg" size="sm" name="Monomer" initials="MO" avatarTone="teal" tail="멤버" tailStatus="neutral" tailVariant="subtle" as="button" />
      </SidebarGroup>

      <SidebarGroup label="프로필" seeAllIcon="chevron-right">
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
          <ButtonPopover leadingIcon="ellipsis" :iconOnly="true" trailingIcon="chevron-down" placement="top-end" buttonLabel="최신순" buttonShape="pill" buttonSize="sm" buttonVariant="ghost" :closeOnItemClick="true">
            <PopoverList>
              <PopoverItem icon="circle-user">프로필</PopoverItem>
              <PopoverItem icon="layout-dashboard">대시보드</PopoverItem>
              <PopoverItem icon="settings">설정</PopoverItem>
            </PopoverList>
          </ButtonPopover>
        </UserBlock>
      </SidebarGroup>
    </Sidebar>

    <Stack align="center" :style="{ width: '100%', paddingTop: 'var(--ds-spacing-space-3)', overflow: 'hidden', height: '100%', flex: '1 1 auto', minWidth: '600px' }" direction="column" gap="none">
      <!-- Hero details -->
      <Stack :style="{ width: '100%', overflow: 'scroll', flex: '1 1 auto', height: 'fit-content' }" as="div" radius="md" direction="column" align="center" justify="start" gap="2xl" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
        <Tabs :style="{ height: 'fit-content', overflow: 'visible', maxWidth: '800px', width: '100%' }" variant="underline" size="lg">
          <Stack :style="{ position: 'sticky', top: '0', zIndex: '1', paddingTop: 'var(--ds-spacing-space-2)' }" direction="column" align="stretch" justify="start" gap="sm" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
            <Input
              shape="pill"
              :clearable="true"
              labelPosition="outside"
              type="search"
              placeholder="제목, 크리에이터, 태그 검색"
              leadingIcon="search"
              size="md"
            />
            <TabsList label="Tabs">
              <Tab :selected="true">맞춤추천</Tab>
              <Tab :badge="true" badgeVariant="danger" badgeText="17" :selected="false">서포터 전용</Tab>
              <Tab :badge="true" badgeVariant="danger" badgeText="48" :selected="false">구독중</Tab>
            </TabsList>
          </Stack>

          <TabsPanel :selected="true">
            <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="lg" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
              <Stack :style="{ height: '100%', overflow: 'scroll' }" as="div" radius="none" direction="column" align="stretch" justify="start" gap="none" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
                <Stack gap="none" :style="{ width: '100%', height: 'fit-content' }" paddingTop="var(--ds-spacing-space-8)" minWidth="0.5rem">
                  <SectionTitle
                    titleWeight="semibold"
                    titleAs="h4"
                    titleVariant="heading-4"
                    icon="user-star"
                    iconTone="none"
                    :showIcon="true"
                    title="추천 크리에이터"
                    :wrapActions="false"
                  />
                  <StoryStrip label="라이브 중인 크리에이터" scroll="auto">
                    <Story avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" label="Hailey" initials="HL" badge="LIVE" state="unseen" avatarTone="brand" size="lg" />
                    <Story avatarSrc="https://i.pinimg.com/736x/a8/37/8c/a8378cc951d79b9130952b0914f92ee6.jpg" label="NeoVoice" initials="NV" badge="LIVE" state="unseen" avatarTone="teal" size="lg" />
                    <Story avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg" label="Ren M." initials="RM" badge="LIVE" state="unseen" avatarTone="purple" size="lg" />
                    <Story badge="LIVE" avatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg" label="Koda" initials="KO" state="unseen" avatarTone="amber" size="lg" />
                    <Story badge="LIVE" avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg" label="aether" initials="AT" state="unseen" avatarTone="coral" size="lg" />
                    <Story badge="LIVE" avatarSrc="https://i.pinimg.com/736x/c3/aa/31/c3aa3137039ac43eb565b0a4aa1acbd9.jpg" label="JIMIN" initials="JM" state="unseen" avatarTone="blue" size="lg" />
                    <Story badge="LIVE" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" label="Mika" initials="MK" state="unseen" avatarTone="green" size="lg" />
                    <Story badge="LIVE" avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg" label="aether" initials="AT" state="unseen" avatarTone="coral" size="lg" />
                    <Story badge="LIVE" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" label="SOYU" initials="SY" state="unseen" avatarTone="pink" size="lg" />
                    <Story badge="LIVE" avatarSrc="https://i.pinimg.com/736x/c3/aa/31/c3aa3137039ac43eb565b0a4aa1acbd9.jpg" label="Mika" initials="MK" state="unseen" avatarTone="green" size="lg" />
                  </StoryStrip>
                </Stack>

                <PostStack :style="{ height: '100%' }" newCount="24" :showNewPill="true">
                  <!-- POST 1 — LIVE NOW (collab broadcast) -->
                  <SectionTitle
                    titleWeight="semibold"
                    titleAs="h4"
                    titleVariant="heading-4"
                    icon="layout-list"
                    iconTone="none"
                    :showIcon="true"
                    title="추천 피드"
                    :wrapActions="false"
                  >
                    <SectionTitleGroup align="end">
                      <ButtonPopover :fullWidth="false" :defaultOpen="false" :arrow="false" leadingIcon="sliders-horizontal" trailingIcon="chevron-down" placement="bottom-end" buttonLabel="최신순" buttonShape="default" buttonSize="sm" buttonVariant="soft" :closeOnItemClick="true">
                        <PopoverList>
                          <PopoverItem icon="clock">최신순</PopoverItem>
                          <PopoverItem icon="flame">인기순</PopoverItem>
                          <PopoverItem icon="sparkles">추천순</PopoverItem>
                        </PopoverList>
                      </ButtonPopover>
                    </SectionTitleGroup>
                  </SectionTitle>

                  <PostCard
                    imageUrl="https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg"
                    kind="video"
                    userAvatarSrc="https://i.pinimg.com/736x/cb/12/b2/cb12b2f39982bf66734cd7e5a34eb891.jpg"
                    bodyVariant="none"
                    userName="Hailey Luna"
                    userMeta="보컬리스트 · 콜라보 라이브 · 방송 중"
                    userInitials="HL"
                    avatarTone="brand"
                    :verified="true"
                    title="NeoVoice랑 즉흥 듀엣 — AI 영상 위에 보컬 얹기"
                    prose="지금 NeoVoice 채널과 합방 중입니다. 끝나면 풀버전 영상으로 편집해서 올릴게요. 채팅으로 듣고 싶은 곡 알려주세요."
                    cardVariant="outline"
                    cardPadding="md"
                    :stats="[
                      { label: '시청 중', value: '1,218' },
                      { label: '채팅', value: 284 },
                      { label: 'Likes', value: 4218 },
                      { label: 'Supporters', value: 92, tone: 'brand', icon: 'gem', spacerBefore: true },
                    ]"
                  />

                  <!-- POST 2 — Video Collab -->
                  <PostCard
                    proseVariant="default"
                    imageUrl="https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg"
                    imageAspect="16/9"
                    userAvatarSrc="https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg"
                    kind="video"
                    bodyVariant="none"
                    userName="코다 / Koda"
                    userMeta="AI 영상감독 · 인천 · 2시간 전"
                    userInitials="KO"
                    avatarTone="amber"
                    :verified="true"
                    title="달이 지는 도시 — 3인 콜라보 단편 풀버전 공개"
                    prose="먼저 멤버 분들께만 풀어드렸던 17분짜리 단편을 오늘 일반 공개합니다. 첼로 즉흥과 보컬은 한 번에 녹음했고, AI 영상은 25번 정도 다시 만들었어요."
                    cardVariant="outline"
                    cardPadding="md"
                    :stats="[
                      { label: '재생', value: '124K' },
                      { label: 'Likes', value: '18.4K' },
                      { label: 'Comments', value: '1,248' },
                      { label: 'Supporters', value: '1,840', tone: 'brand', icon: 'gem', spacerBefore: true },
                    ]"
                  />

                  <!-- POST 3 — Voice Casting Call (audio reference) -->
                  <PostCard
                    userAvatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg"
                    kind="cast"
                    bodyVariant="voice-clip"
                    userName="aether.studio"
                    userMeta="AI 단편 감독 · 부산 · 5시간 전"
                    userInitials="AT"
                    avatarTone="coral"
                    :verified="true"
                    title="[모집] AI 단편 「여름 끝의 라디오」에 들어갈 내레이션 한 줄 보내주세요"
                    prose="중간에 라디오 진행자 컷이 있는데, 거기 들어갈 15초 내외 한국어/영어 내레이션을 모집합니다. 채택되면 영상 크레딧 + 500 크레딧 보상."
                    cardVariant="outline"
                    cardPadding="md"
                    :stats="[
                      { label: '응답', value: 38 },
                      { label: '남음', value: '4일 12시간' },
                      { label: '관심', value: 214 },
                    ]"
                  />

                  <!-- POST 5 — Text + image grid (creator update) -->
                  <PostCard
                    imageTile6Src="https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg"
                    imageTile5Src="https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg"
                    imageTileCount="6"
                    imageAspect="4/5"
                    imageTile2Src="https://i.pinimg.com/736x/3e/36/00/3e3600f33f0c190104d30d2a971e1659.jpg"
                    imageTile4Src="https://i.pinimg.com/736x/65/2a/e8/652ae82db9bcdc65e6ddc3fe5d61594a.jpg"
                    imageTile3Src="https://i.pinimg.com/1200x/ad/e4/53/ade453608e2e7c8ffc38bc8ba991cb50.jpg"
                    imageTile1Src="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg"
                    userAvatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg"
                    kind="text"
                    bodyVariant="image-update"
                    userName="Ren Morimoto"
                    userMeta="성우 · 도쿄 · 7시간 전"
                    userInitials="RM"
                    avatarTone="purple"
                    :verified="true"
                    prose="새로운 캐릭터 등장"
                    proseVariant="lead"
                    cardVariant="outline"
                    cardPadding="md"
                    :stats="[
                      { label: 'Likes', value: '1,840' },
                      { label: 'Comments', value: 124 },
                      { label: 'Saves', value: 62 },
                      { label: 'Supporters', value: 240, tone: 'brand', icon: 'gem', spacerBefore: true },
                    ]"
                  />

                  <!-- POST 6 — AI Music release (audio single) -->
                  <PostCard
                    userAvatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg"
                    audioArtImageUrl="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg"
                    kind="audio"
                    bodyVariant="music-release"
                    userName="NeoVoice"
                    userMeta="AI 보컬리스트 · 어제 오후 8시 · 음원 공개"
                    userInitials="NV"
                    avatarTone="teal"
                    :verified="true"
                    title="싱글 「dusk.exe」 — 3분 25초"
                    prose="한밤중에 만든 트랙이라 시끄러우면 죄송합니다. 보컬 라인은 4번 다시 짰어요."
                    cardVariant="outline"
                    cardPadding="md"
                    :stats="[
                      { label: '재생', value: '8,420' },
                      { label: 'Likes', value: '1,128' },
                      { label: '라이브러리', value: 96 },
                      { label: 'Supporters', value: 320, tone: 'brand', icon: 'gem', spacerBefore: true },
                    ]"
                  />
                </PostStack>
              </Stack>

              <Stack direction="row" justify="center" padding="var(--wb-spacing-space-4)">
                <Button variant="ghost" size="sm" label="더 불러오기" trailingIcon="chevron-down" />
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
          </TabsPanel>
        </Tabs>
      </Stack>
    </Stack>

    <!-- RIGHT ASIDE -->
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
            <ButtonPopover leadingIcon="ellipsis" :iconOnly="true" trailingIcon="chevron-down" placement="bottom-end" buttonLabel="최신순" buttonShape="pill" buttonSize="sm" buttonVariant="soft" :closeOnItemClick="true">
              <PopoverList>
                <PopoverItem icon="circle-user">프로필</PopoverItem>
                <PopoverItem icon="layout-dashboard">대쉬보드</PopoverItem>
                <PopoverItem icon="settings">설정</PopoverItem>
              </PopoverList>
            </ButtonPopover>
          </UserBlock>
        </UserCardHead>
        <UserCardStats :style="{ padding: 'var(--ds-spacing-space-2)' }" followersLabel="팔로워" followersValue="12.4K" followingLabel="멤버" followingValue="384" postsLabel="포스트" postsValue="128" />
        <UserCardSection :style="{ height: 'fit-content' }" tint="sunken">
          <CreditBalanceCard :showRows="true" :showActions="true" action2Label="이력" action1Label="충전하기">
            <CreditBalanceCardRow :style="{ height: '21px' }" label="후원자" value="1,455" delta="+6" deltaTone="positive" />
            <CreditBalanceCardRow :style="{ height: '21px' }" label="오늘 받은 후원" value="+240CRD" delta="+18%" deltaTone="positive" />
          </CreditBalanceCard>
        </UserCardSection>
      </UserCard>

      <!-- Suggested creators -->
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

      <!-- Follow suggestions -->
      <Stack as="section" direction="column" gap="xs" aria-label="Main">
        <Stack direction="row" align="center" justify="between">
          <Text as="h3" variant="ui" weight="semibold">팔로우 추천</Text>
          <Link variant="subtle" size="sm" href="#">새로고침</Link>
        </Stack>
        <Stack direction="column" gap="md">
          <UserBlock avatarSize="sm" avatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg" name="SOYU" meta="보컬 · 24.1K · Hailey와 자주 작업" initials="SY" avatarTone="pink" :verified="true" size="sm" />
          <UserBlock avatarSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" name="Mika 三輪" meta="첼리스트 · 8.6K · 콜라보 가능" initials="MK" avatarTone="green" size="sm" />
          <UserBlock avatarSize="sm" avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg" name="Nexus Choir" meta="합창 · AI 보컬 합성 · 3.2K" initials="NX" avatarTone="blue" size="sm" />
          <UserBlock avatarSize="sm" avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg" name="유진 / Yujin" meta="사운드 디자이너 · 1.4K" initials="YJ" avatarTone="green" size="sm" />
        </Stack>
      </Stack>
    </Stack>
  </Stack>
</template>
