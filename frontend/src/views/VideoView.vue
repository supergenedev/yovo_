<script setup>
import {
  Alert,
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardGrid,
  Chip,
  Comment,
  Divider,
  Sidebar,
  SidebarFollowRow,
  SidebarGroup,
  SidebarItem,
  Stack,
  Stat,
  StatList,
  Text,
  UserBlock,
  UserCard,
  UserCardHead,
  PopoverList,
  PopoverItem,
  ButtonPopover,
  VideoListCard,
  SectionTitleGroup,
  SectionTitle,
  ToolbarGroup,
  CommentInput,
  SidebarFooter,
  Link,
  TopicRow,
  PostListItem,
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
      :collapsed="false"
      collapsedWidth="72"
      headerLogoImage="/workbench-assets/icons/logo-mpks329o.svg"
      headerSymbolImage="/workbench-assets/icons/symbol-mpks329n.svg"
      presentation="sidebar"
      width="md"
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
        <SidebarItem icon="house" label="홈" :active="false" />
        <SidebarItem icon="layout-grid" label="작품" :active="true" />
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
      justify="start"
      :scrollFade="false"
      align="center"
      :style="{ width: '100%', minWidth: 'var(--ds-spacing-dialog-max-width-md)', paddingTop: '0.75rem', overflow: 'hidden', height: '100%', flex: '1 1 auto', paddingRight: 'var(--ds-spacing-space-4)' }"
      direction="column"
      gap="none"
    >
      <!-- Hero details -->
      <Stack
        :style="{ height: '100%', overflow: 'hidden', width: '100%', maxWidth: '1960px' }"
        as="div"
        radius="none"
        direction="column"
        align="center"
        justify="start"
        gap="xs"
        padding="none"
        background="none"
      >
        <Stack
          background="none"
          :style="{ height: 'fit-content', width: '100%', paddingTop: 'var(--ds-spacing-space-2)', top: '0px', position: 'sticky', zIndex: '1', paddingBottom: 'var(--ds-spacing-space-3)' }"
          as="header"
          direction="row"
          align="center"
          gap="md"
          :wrap="false"
        >
          <Button shape="pill" variant="soft" size="md" leadingIcon="arrow-left" iconOnly aria-label="Video — view" />
          <Stack flex="1 1 auto" direction="column" gap="xs">
            <Breadcrumb size="sm" separator="chevron">
              <BreadcrumbItem :style="{ height: '16px' }">
                <BreadcrumbLink href="#">작품</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">보이스 · ASMR</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbCurrent>잠 못 드는 밤, 너의 옆에서 속삭이는 3시간 ASMR</BreadcrumbCurrent>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
          <Button shape="pill" variant="soft" size="md" leadingIcon="ellipsis" iconOnly aria-label="더보기" />
        </Stack>

        <Stack
          :scrollFade="false"
          :style="{ width: '100%', height: '100%', overflow: 'scroll' }"
          as="div"
          radius="md"
          direction="row"
          align="stretch"
          justify="start"
          gap="2xl"
          padding="none"
          background="none"
        >
          <Stack
            :style="{ width: '100%', overflow: 'scroll', flex: '1 1 auto', height: '100%' }"
            as="div"
            radius="md"
            direction="column"
            align="center"
            justify="start"
            gap="2xl"
            padding="none"
            background="none"
          >
            <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="xs" padding="none" background="none">
              <Alert
                :style="{ width: '100%' }"
                action1Variant="primary"
                action1Label="구매하기"
                actionPlacement="end"
                :hideIcon="false"
                status="info"
                variant="flat"
                icon="lock"
                title="전체 재생은 구매 후 가능해요"
                message="미리듣기 00:30 · 전체 03:00:00"
              />
              <PostListItem
                mediaProgress="40"
                mediaBadgeText="Suppoter's Only"
                mediaSrc="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg"
                avatarSrc="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg"
                :style="{ width: '100%' }"
                title="새벽이 떠오를 때 — 2인 콜라보 단편"
                initials="KO"
                meta="코다 / Koda · 1주 전"
                avatarAlt="코다 / Koda"
                :showAvatar="true"
                variant="vertical"
                avatarTone="amber"
                size="lg"
                avatarSize="sm"
                avatarShape="circle"
                mediaAspect="16/9"
                mediaBackground="linear-gradient(140deg, #0c1429 0%, #4c1d95 50%, #be185d 100%)"
                mediaBadgeStatus="info"
                mediaBadgeVariant="solid"
                mediaDuration="12:48"
                mediaLiveLabel="LIVE"
                mediaLockActionShape="pill"
                mediaLockActionSize="sm"
                mediaLockActionVariant="primary"
                mediaLockIcon="lock"
                mediaPlayLabel="Play"
                mediaProgressLabel="Media progress"
                :mediaShowGrain="true"
                :mediaShowPlay="true"
                mediaSize="sm"
              />
              <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="none" padding="none" background="none">
                <Divider variant="solid" orientation="horizontal" labelPosition="center" inset="none" />
                <Stack direction="column" gap="none">
                  <Stack direction="row" align="center" gap="md" :wrap="false">
                    <StatList :brandStat="true" :style="{ width: '100%', flex: '0 0 auto' }" size="md">
                      <Stat icon="heart" value="1,234" label="좋아요" />
                      <Stat icon="message-circle" value="89" label="댓글" />
                      <Stat icon="eye" value="12.5K" label="조회" />
                      <Stat icon="share-2" value="312" label="공유" />
                      <ToolbarGroup align="end">
                        <Button shape="pill" variant="ghost" size="md" leadingIcon="share2" iconOnly aria-label="저장" />
                        <Button shape="pill" variant="ghost" size="md" leadingIcon="bookmark" iconOnly aria-label="저장" />
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
                            <PopoverItem icon="clock">최신순</PopoverItem>
                            <PopoverItem icon="flame">인기순</PopoverItem>
                            <PopoverItem icon="sparkles">추천순</PopoverItem>
                          </PopoverList>
                        </ButtonPopover>
                      </ToolbarGroup>
                    </StatList>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              :style="{ maxWidth: 'var(--ds-spacing-dialog-max-width-lg)', height: 'fit-content', paddingBottom: 'var(--ds-spacing-space-8)', overflow: 'visible' }"
              as="div"
              radius="none"
              direction="column"
              align="stretch"
              justify="start"
              gap="xl"
              padding="none"
              background="none"
            >
              <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="sm" padding="none" background="none">
                <Stack as="section" direction="column" gap="sm">
                  <Text as="p" variant="body" tone="secondary" :style="{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }">
                    잠 못 드는 밤, 옆에서 다정히 속삭여 드릴게요. 단단한 위스퍼 보이스와 가벼운 ear-blowing, 페이지 넘기는 소리, 빗소리 레이어를 90분간 이어가는 풀버전입니다. 헤드폰 사용을 권장합니다. 챕터별로 분리되어 있어 듣고 싶은 부분부터 골라 들을 수 있어요.
                  </Text>
                  <Stack align="center" justify="start" direction="row" gap="xs" :wrap="true">
                    <Chip icon="" tone="brand" variant="default">19+</Chip>
                    <Chip icon="mic" tone="neutral" variant="default">보이스</Chip>
                    <Chip tone="neutral" variant="default">ASMR</Chip>
                    <Chip icon="flame" tone="neutral" variant="default">신작</Chip>
                  </Stack>
                  <Button variant="ghost" size="sm" trailingIcon="chevron-down">더보기</Button>
                </Stack>

                <Card variant="outline" padding="md" gap="none">
                  <Stack :style="{ height: '21px' }" direction="row" align="center" gap="md" paddingTop="sm" paddingBottom="sm">
                    <Text as="span" variant="body-sm" weight="regular" tone="tertiary" :style="{ width: '90px', whiteSpace: 'nowrap' }">공개일</Text>
                    <Text as="span" variant="body" weight="regular" :style="{ flex: 1, fontVariantNumeric: 'tabular-nums' }">2026.08.15</Text>
                  </Stack>
                  <Divider variant="dotted" />
                  <Stack direction="row" align="center" gap="md" paddingTop="sm" paddingBottom="sm">
                    <Text as="span" variant="body-sm" weight="regular" tone="tertiary" :style="{ width: '90px', whiteSpace: 'nowrap' }">재생시간</Text>
                    <Text as="span" variant="body" weight="regular" :style="{ flex: 1, fontVariantNumeric: 'tabular-nums' }">03:00:00</Text>
                  </Stack>
                  <Divider variant="dotted" />
                  <Stack direction="row" align="center" gap="md" paddingTop="sm" paddingBottom="sm">
                    <Text as="span" variant="body-sm" weight="regular" tone="tertiary" :style="{ width: '90px', whiteSpace: 'nowrap' }">카테고리</Text>
                    <Text as="span" variant="body" weight="regular" :style="{ flex: 1, width: '660px', height: '21px' }">일상 · ASMR</Text>
                  </Stack>
                  <Divider variant="dotted" />
                  <Stack justify="center" direction="row" gap="md" align="start" paddingTop="md" paddingBottom="sm">
                    <Text as="span" variant="body-sm" weight="regular" tone="tertiary" :style="{ width: '90px', paddingTop: '6px', whiteSpace: 'nowrap' }">
                      태그
                    </Text>
                    <Stack direction="row" gap="xs" :wrap="true" flex="1 1 auto" paddingTop="xs">
                      <Chip size="sm" tone="neutral" variant="default">#힐링</Chip>
                      <Chip size="sm" tone="neutral" variant="default">#수면용</Chip>
                      <Chip size="sm" tone="neutral" variant="default">#여성향</Chip>
                      <Chip size="sm" tone="neutral" variant="default">#위스퍼</Chip>
                    </Stack>
                  </Stack>
                </Card>

                <Stack direction="row" justify="center" align="center" gap="sm" paddingTop="md">
                  <Button variant="ghost" size="sm" leadingIcon="triangle-alert">신고하기</Button>
                  <Button variant="ghost" size="sm" leadingIcon="ban">사용자 차단</Button>
                </Stack>
              </Stack>

              <Stack :style="{ height: 'fit-content' }" as="section" direction="column" gap="md">
                <Stack direction="row" align="center" gap="sm">
                  <Text as="h3" variant="heading-3" weight="bold" :style="{ flex: 1 }">댓글&#32;
                    <Text as="span" variant="heading-3" weight="bold" tone="tertiary">89</Text>
                  </Text>
                  <Button variant="ghost" size="sm" trailingIcon="chevron-right">전체보기</Button>
                </Stack>

                <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="xxs" padding="none" background="none">
                  <Alert
                    hidden="true"
                    status="info"
                    variant="flat"
                    icon="lock"
                    message="로그인하면 댓글로 의견을 남길 수 있어요."
                    action1Label="로그인"
                    action1Variant="primary"
                    actionPlacement="end"
                    actionSize="sm"
                  />
                  <CommentInput
                    :showCancel="false"
                    :readOnly="false"
                    :disabled="false"
                    initials="ME"
                    placeholder="댓글을 입력하세요"
                    :showAvatar="true"
                    avatarTone="brand"
                    rows="3"
                    maxLength="300"
                    :showAttachment="true"
                    :showCounter="true"
                    :showEmoji="true"
                    submitLabel="등록"
                  />
                  <Divider />
                  <Comment author="user_a" avatarTone="pink" initials="U" time="2시간 전" body="정말 좋아요! 헤드폰으로 들었는데 진짜 옆에 있는 것 같아서 깜짝 놀랐어요." :likeCount="12" :replyCount="2" />
                  <Divider />
                  <Comment :pinned="false" :liked="true" :verified="true" avatarSrc="https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg" author="_mintly" avatarTone="teal" initials="M" time="5시간 전" body="챕터 3의 빗소리 레이어가 진짜 인생이에요. 다음 작품도 기대됩니다." :likeCount="5" :replyCount="0" />
                  <Divider />
                  <Comment :style="{ height: 'fit-content' }" author="sora_99" avatarTone="amber" initials="S" time="어제" body="수면용으로 자주 듣고 있어요. 오늘도 잘 자고 갑니다." :likeCount="8" :replyCount="1" />
                  <Button variant="ghost" size="sm" trailingIcon="chevron-down">더보기</Button>
                </Stack>
              </Stack>

              <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="xs">
                <SectionTitle
                  :style="{ width: '100%' }"
                  title="Noel ASMR의 다른 작품"
                  icon="hand-coins"
                  as="header"
                  align="center"
                  iconTone="none"
                  :showIcon="false"
                  subtitleTone="tertiary"
                  subtitleVariant="body-sm"
                  titleAs="h4"
                  titleVariant="heading-4"
                  titleWeight="bold"
                  :wrapActions="true"
                >
                  <SectionTitleGroup align="end">
                    <Button trailingIcon="chevron-right" badgeVariant="danger" variant="soft" size="sm" shape="default">모두보기</Button>
                  </SectionTitleGroup>
                </SectionTitle>
                <CardGrid
                  :itemProps="[{}, { thumbnailImageUrl: 'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg' }, {}, { thumbnailImageUrl: 'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg' }]"
                  count="10"
                  itemSize="custom"
                  itemSizeOverride="240px"
                  layout="row"
                  gap="sm"
                  :arrows="false"
                  edgeFade="fade"
                  scroll="snap"
                >
                  <VideoListCard
                    mediaSize="sm"
                    :showAvatar="false"
                    avatarSrc="https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg"
                    thumbnailImageUrl="https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg"
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
                    badgeText="FREE"
                    badgeVariant="solid"
                    badgeStatus="success"
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
              </Stack>

              <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="xs">
                <SectionTitle
                  :style="{ width: '100%' }"
                  title="비슷한 작품"
                  icon="hand-coins"
                  as="header"
                  align="center"
                  iconTone="none"
                  :showIcon="false"
                  subtitleTone="tertiary"
                  subtitleVariant="body-sm"
                  titleAs="h4"
                  titleVariant="heading-4"
                  titleWeight="bold"
                  :wrapActions="true"
                >
                  <SectionTitleGroup align="end">
                    <Button trailingIcon="chevron-right" badgeVariant="danger" variant="soft" size="sm" shape="default">모두보기</Button>
                  </SectionTitleGroup>
                </SectionTitle>
                <CardGrid
                  :itemProps="[{}, { thumbnailImageUrl: 'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg', badgeText: 'Suppoter\'s Only', badgeStatus: 'info', progress: '32' }, { thumbnailImageUrl: 'https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg' }, {}, { thumbnailImageUrl: 'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg' }, { thumbnailImageUrl: 'https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg' }]"
                  count="10"
                  itemSize="custom"
                  itemSizeOverride="240px"
                  layout="row"
                  gap="sm"
                  :arrows="false"
                  edgeFade="fade"
                  scroll="snap"
                >
                  <VideoListCard
                    badgeText="19+"
                    mediaSize="sm"
                    :showAvatar="true"
                    avatarSrc="https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg"
                    thumbnailImageUrl="https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg"
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
                    badgeVariant="solid"
                    badgeStatus="danger"
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
              <Stack :wrap="true" as="div" radius="none" direction="row" align="stretch" justify="center" gap="sm" padding="none" background="none">
                <Link variant="subtle" size="sm">소개</Link>
                <Link variant="subtle" size="sm">크리에이터 가이드</Link>
                <Link variant="subtle" size="sm">크레딧 정책</Link>
                <Link variant="subtle" size="sm">고객지원</Link>
                <Link variant="subtle" size="sm">한국어</Link>
              </Stack>
              <Stack justify="center" direction="row" width="100%" marginTop="12px">© 2026 YOVO</Stack>
            </Stack>
          </Stack>

          <!-- RIGHT ASIDE -->
          <Stack
            :style="{ height: '100%', paddingBottom: '1rem', maxWidth: '320px', minWidth: '280px', position: 'sticky', top: '0' }"
            as="aside"
            align="stretch"
            gap="2xl"
            padding="none"
          >
            <!-- Trending -->
            <Stack :style="{ height: 'fit-content' }" gap="none" direction="column">
              <Stack :style="{ height: 'fit-content' }" direction="column" gap="none">
                <Stack :style="{ padding: '0px', margin: '0px' }" direction="row" align="center" justify="between" height="21px">
                  <Text as="h3" variant="ui" weight="semibold">YOVO 트랜딩</Text>
                  <Link tailIcon="chevron-right" :external="false" variant="subtle" size="sm" href="#">모두보기</Link>
                </Stack>
                <TopicRow :rank="1" title="달이 지는 도시" sub="317K 시청 · 1,840 후원자" delta="+218%" deltaTone="brand" :divider="true" />
                <TopicRow :rank="2" title="#synthwave" sub="이번 주 새 트랙 218개" delta="+94%" deltaTone="neutral" :divider="true" />
                <TopicRow :rank="3" title="한국어 내레이션" sub="12개 모집 진행 중" delta="+61%" deltaTone="neutral" :divider="true" />
                <TopicRow :rank="4" title="Lumen-X EP.4 비하인드" sub="신규 멤버 +182 / 7일" delta="—" deltaTone="neutral" :divider="true" />
                <TopicRow :rank="5" title="aether.studio" sub="「여름 끝의 라디오」 응답 모집" delta="NEW" deltaTone="brand" :divider="false" />
              </Stack>
            </Stack>

            <!-- Suggested creators -->
            <Stack as="section" direction="column" gap="var(--wb-spacing-space-2)" aria-label="Suggested creators">
              <Stack direction="row" align="center" justify="between" marginBottom="12px" height="21px">
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
      </Stack>
    </Stack>
  </Stack>
</template>
