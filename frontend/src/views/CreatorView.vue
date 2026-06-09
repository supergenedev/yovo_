<script setup>
import {
  UserBlock,
  Stack,
  SectionTitle,
  SectionTitleGroup,
  Input,
  Card,
  CardGrid,
  Text,
  Button,
  ButtonPopover,
  PopoverList,
  PopoverItem,
  Avatar,
  Badge,
  Chip,
  Divider,
  Icon,
  Tabs,
  TabsList,
  Tab,
  Media,
} from '@/components'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCreatorStore } from '@/stores/creator'

const router = useRouter()
const creatorStore = useCreatorStore()
const searchQuery = ref('')
let searchTimer = null

onMounted(() => {
  creatorStore.fetchRecommended()
  creatorStore.fetchDiscover()
})

function onSearch(e) {
  const q = e.target?.value ?? ''
  searchQuery.value = q
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    if (q.trim()) creatorStore.search(q.trim())
    else creatorStore.fetchDiscover()
  }, 300)
}
</script>

<template>
  <Stack as="div" radius="none" direction="row" align="stretch" justify="start" gap="lg" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
    <Stack :style="{ width: '100%', overflow: 'scroll', height: '100%' }" as="div" direction="column" align="center" justify="start" gap="lg" padding="none">
      <Stack
        :style="{ minWidth: '800px' }"
        as="section"
        justify="start"
        :wrap="false"
        direction="column"
        align="center"
        gap="2xl"
        padding="lg"
        width="100%"
        height="fit-content"
      >

        <!-- Header: title + search -->
        <SectionTitle :style="{ width: '100%', maxWidth: '1400px' }" title="크리에이터 탐색" icon="user-star" as="header" align="center" iconTone="brand" :showIcon="false" titleAs="h1" titleVariant="heading-1" titleWeight="bold" :wrapActions="true">
          <SectionTitleGroup :style="{ flex: '0 1 auto', maxWidth: 'var(--ds-spacing-dialog-max-width-sm)', width: '100%' }" align="end">
            <Input :style="{ width: '100%' }" shape="pill" :clearable="true" labelPosition="outside" type="search" placeholder="크리에이터, 태그 검색…" leadingIcon="search" size="md" :value="searchQuery" @input="onSearch" />
          </SectionTitleGroup>
        </SectionTitle>

        <!-- Stat cards (4) -->
        <Stack :style="{ maxWidth: '1400px' }" as="div" radius="none" direction="column" align="stretch" justify="start" gap="md" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
          <Stack :style="{ maxWidth: '1400px' }" as="section" direction="row" align="stretch" justify="start" gap="lg" :wrap="true" width="100%">
            <Card variant="bare" padding="none" :style="{ flex: '1 1 0', minWidth: '220px', height: 'fit-content' }">
              <Stack direction="row" align="center" justify="start" gap="sm">
                <Stack :style="{ background: 'var(--ds-color-brand-bg-subtle, rgba(236,72,153,0.12))' }" radius="pill" padding="md" align="center" justify="center" width="auto">
                  <Icon strokeWidth="2" name="users" size="32" />
                </Stack>
                <Stack direction="column" gap="none" width="auto">
                  <Text as="p" variant="body-sm" tone="tertiary">활동 크리에이터</Text>
                  <Text as="p" variant="heading-3" weight="bold">12,480</Text>
                </Stack>
              </Stack>
            </Card>

            <Card variant="bare" padding="none" :style="{ flex: '1 1 0', minWidth: '220px', height: 'fit-content' }">
              <Stack direction="row" align="center" justify="start" gap="sm">
                <Stack :style="{ background: 'rgba(16,185,129,0.12)' }" radius="pill" padding="md" align="center" justify="center" width="auto">
                  <Icon strokeWidth="2" name="sparkles" size="32" />
                </Stack>
                <Stack direction="column" gap="none" width="auto">
                  <Text as="p" variant="body-sm" tone="tertiary">이번 주 신규</Text>
                  <Text as="p" variant="heading-3" weight="bold" tone="success">+284</Text>
                </Stack>
              </Stack>
            </Card>

            <Card variant="bare" padding="none" :style="{ flex: '1 1 0', minWidth: '220px', height: 'fit-content' }">
              <Stack direction="row" align="center" justify="start" gap="sm">
                <Stack :style="{ background: 'rgba(99,102,241,0.12)' }" radius="pill" padding="md" align="center" justify="center" width="auto">
                  <Icon strokeWidth="2" name="globe" size="32" />
                </Stack>
                <Stack direction="column" gap="none" width="auto">
                  <Text as="p" variant="body-sm" tone="tertiary">팔로우 가능 카테고리</Text>
                  <Text as="p" variant="heading-3" weight="bold">8</Text>
                </Stack>
              </Stack>
            </Card>

            <Card variant="bare" padding="none" :style="{ flex: '1 1 0', minWidth: '220px', height: 'fit-content' }">
              <Stack direction="row" align="center" justify="start" gap="sm">
                <Stack :style="{ background: 'rgba(249,115,22,0.12)' }" radius="pill" padding="md" align="center" justify="center" width="auto">
                  <Icon strokeWidth="2" name="flame" size="32" />
                </Stack>
                <Stack direction="column" gap="none" width="auto">
                  <Text as="p" variant="body-sm" tone="tertiary">이번 달 인기 태그</Text>
                  <Text as="p" variant="heading-3" weight="bold" tone="brand">#보이스드라마</Text>
                </Stack>
              </Stack>
            </Card>
          </Stack>

          <!-- Spotlight banner -->
          <Stack
            background="none"
            as="section"
            :style="{ maxWidth: '1400px', position: 'relative', overflow: 'hidden' }"
            radius="lg"
            padding="xl"
            direction="column"
            align="start"
            gap="xl"
            width="100%"
            :wrap="true"
          >
            <Text as="p" tone="static-light" variant="body-sm" transform="none" weight="inherit" truncateLines="1" align="start">스포트라이트</Text>
            <Stack padding="md" direction="column" gap="sm" :style="{ minWidth: '0', height: 'fit-content', zIndex: '1', width: 'fit-content' }">
              <Avatar status="" src="https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg" :style="{ zIndex: '1' }" initials="M" size="2xl" shape="circle" tone="coral" alt="MIKO Studio" />
              <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="none" padding="none" background="none" mask="none" maskStart="45" maskEnd="100" maskAngle="0" glassBlur="18">
                <Stack direction="row" align="center" gap="xs">
                  <Text as="h2" variant="heading-2" weight="bold" tone="static-light">MIKO Studio</Text>
                  <Icon name="badge-check" size="22px" />
                </Stack>
                <Text as="p" variant="body" tone="static-light">단편영화 전문 스튜디오</Text>
              </Stack>
              <Stack direction="row" align="center" gap="lg" :wrap="true">
                <Text as="span" variant="body-sm" tone="static-light" weight="semibold">219K 팔로워</Text>
                <Text as="span" variant="body-sm" tone="static-light" weight="semibold">92 작품</Text>
                <Text as="span" variant="body-sm" tone="static-light" weight="semibold">+18.2% 지난 30일</Text>
              </Stack>
              <Stack direction="row" align="center" gap="sm" :wrap="true" :style="{ marginTop: 'var(--ds-spacing-space-2)' }">
                <Button variant="secondary" size="md" shape="pill" leadingIcon="lock-open">구독 · ⓒ 3,900/월</Button>
                <Button variant="secondary" size="md" shape="pill" leadingIcon="plus">팔로우</Button>
              </Stack>
            </Stack>

            <Media src="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg" overlayColor="#ff0055" mask="none" :style="{ position: 'absolute', top: '0px', width: '60%', height: '100%', zIndex: '0', right: '0px' }" rounded="md" aspectRatio="16 / 9" backgroundPosition="right" fit="cover" overlay="accent" overlayGlassBlur="18" overlayMask="fade" overlayMaskStart="5" overlayMaskEnd="60" overlayMaskAngle="100" />
          </Stack>
        </Stack>

        <!-- 떠오르는 크리에이터 (rising) -->
        <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="sm" width="100%">
          <SectionTitle :style="{ width: '100%' }" title="떠오르는 크리에이터" icon="trending-up" as="header" align="center" iconTone="none" :showIcon="true" titleAs="h4" titleVariant="heading-4" titleWeight="bold" :wrapActions="true">
            <SectionTitleGroup align="end">
              <Button trailingIcon="chevron-right" variant="soft" size="sm" shape="default">모두 보기</Button>
            </SectionTitleGroup>
          </SectionTitle>

          <!-- 로딩 -->
          <Text v-if="creatorStore.listLoading && creatorStore.recommended.length === 0" tone="tertiary">불러오는 중...</Text>

          <!-- 빈 상태 -->
          <Text v-else-if="!creatorStore.listLoading && creatorStore.recommended.length === 0" tone="tertiary">추천 크리에이터가 없습니다.</Text>

          <!-- 크리에이터 목록 -->
          <CardGrid v-else :count="creatorStore.recommended.length" itemSize="custom" itemSizeOverride="200px" layout="row" gap="sm" :arrows="false" edgeFade="fade" scroll="snap">
            <Card v-for="creator in creatorStore.recommended" :key="creator.id" variant="outline" padding="lg" :style="{ cursor: 'pointer' }" @click="router.push('/creator/' + creator.id)">
              <Stack direction="column" align="center" gap="md">
                <Stack as="div" radius="none" direction="column" align="center" justify="start" gap="xxs" padding="none" background="none">
                  <Avatar
                    :src="creator.profile_image ?? undefined"
                    :initials="(creator.nickname ?? '?')[0]"
                    size="2xl"
                    shape="circle"
                    tone="neutral"
                  />
                  <Stack justify="center" direction="row" align="center" gap="xxs">
                    <Text as="p" variant="body" weight="semibold">{{ creator.nickname }}</Text>
                  </Stack>
                  <Text v-if="creator.followers_count != null" as="p" variant="caption" tone="tertiary">{{ creator.followers_count.toLocaleString() }} 팔로워</Text>
                </Stack>
                <Stack v-if="creator.tags && creator.tags.length" direction="row" gap="xxs" :wrap="true" justify="center">
                  <Badge v-for="tag in creator.tags.slice(0, 2)" :key="tag" status="neutral" variant="subtle" size="sm" shape="pill">{{ tag }}</Badge>
                </Stack>
                <Button
                  :style="{ width: '100%' }"
                  :variant="creator.interaction_with_me?.is_following ? 'primary' : 'soft'"
                  size="sm"
                  shape="pill"
                  :leadingIcon="creator.interaction_with_me?.is_following ? 'check' : 'plus'"
                  @click.stop="creatorStore.follow(creator.id)"
                >{{ creator.interaction_with_me?.is_following ? '팔로잉' : '팔로우' }}</Button>
              </Stack>
            </Card>
          </CardGrid>
        </Stack>

        <!-- 크리에이터 랭킹 TOP 10 -->
        <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="sm" width="100%">
          <SectionTitle :style="{ width: '100%' }" title="크리에이터 랭킹 TOP 10" icon="trophy" as="header" align="center" iconTone="none" :showIcon="true" titleAs="h4" titleVariant="heading-4" titleWeight="bold" :wrapActions="true">
            <SectionTitleGroup align="end">
              <ButtonPopover trailingIcon="chevron-down" placement="bottom-end" buttonLabel="팔로워순" buttonShape="default" buttonSize="sm" buttonVariant="soft" :closeOnItemClick="true">
                <PopoverList>
                  <PopoverItem icon="users">팔로워순</PopoverItem>
                  <PopoverItem icon="trending-up">성장순</PopoverItem>
                  <PopoverItem icon="flame">인기순</PopoverItem>
                </PopoverList>
              </ButtonPopover>
              <Button trailingIcon="chevron-right" variant="soft" size="sm" shape="default">모든 랭킹 보기</Button>
            </SectionTitleGroup>
          </SectionTitle>
          <Card variant="solid" padding="sm" gap="none">
            <!-- 1 -->
            <Stack as="article" direction="row" align="center" justify="start" gap="md" padding="sm" width="100%">
              <Text :style="{ width: '28px', flex: '0 0 auto' }" as="span" variant="heading-4" weight="bold" tone="brand" align="center">1</Text>
              <Avatar initials="N" size="md" shape="circle" tone="blue" />
              <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                <Stack direction="row" align="center" gap="xxs" :wrap="false">
                  <Text as="span" variant="body" weight="semibold">Noel ASMR</Text>
                  <Icon name="badge-check" size="14px" />
                  <Text as="span" variant="caption" tone="tertiary">@noel_asmr</Text>
                </Stack>
                <Text as="p" variant="body-sm" tone="tertiary" :truncate="true" truncateLines="1">잠 못 드는 밤, Noel의 속삭임</Text>
              </Stack>
              <Stack justify="start" direction="row" align="center" gap="xxs" width="auto" :style="{ flex: '0 0 auto' }">
                <Text as="span" variant="body" weight="bold">413K</Text>
                <Text as="span" variant="caption" tone="success">+8.7%</Text>
              </Stack>
              <Button variant="soft" size="sm" shape="pill">프로필</Button>
            </Stack>
            <Divider orientation="horizontal" variant="solid" inset="none" />
            <!-- 2 -->
            <Stack as="article" direction="row" align="center" justify="start" gap="md" padding="sm" width="100%">
              <Text :style="{ width: '28px', flex: '0 0 auto' }" as="span" variant="heading-4" weight="bold" tone="brand" align="center">2</Text>
              <Avatar initials="C" size="md" shape="circle" tone="purple" />
              <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                <Stack direction="row" align="center" gap="xxs" :wrap="false">
                  <Text as="span" variant="body" weight="semibold">코스모 픽쳐스</Text>
                  <Icon name="badge-check" size="14px" />
                  <Text as="span" variant="caption" tone="tertiary">@cosmo_pic</Text>
                </Stack>
                <Text as="p" variant="body-sm" tone="tertiary" :truncate="true" truncateLines="1">프리미엄 시네마틱 시리즈</Text>
              </Stack>
              <Stack justify="start" direction="row" align="center" gap="xxs" width="auto" :style="{ flex: '0 0 auto' }">
                <Text as="span" variant="body" weight="bold">342K</Text>
                <Text as="span" variant="caption" tone="success">+27.8%</Text>
              </Stack>
              <Button variant="soft" size="sm" shape="pill">프로필</Button>
            </Stack>
            <Divider orientation="horizontal" variant="solid" inset="none" />
            <!-- 3 -->
            <Stack as="article" direction="row" align="center" justify="start" gap="md" padding="sm" width="100%">
              <Text :style="{ width: '28px', flex: '0 0 auto' }" as="span" variant="heading-4" weight="bold" tone="brand" align="center">3</Text>
              <Avatar initials="S" size="md" shape="circle" tone="coral" />
              <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                <Stack direction="row" align="center" gap="xxs" :wrap="false">
                  <Text as="span" variant="body" weight="semibold">사야 SAYA</Text>
                  <Icon name="badge-check" size="14px" />
                  <Text as="span" variant="caption" tone="tertiary">@saya_sings</Text>
                </Stack>
                <Text as="p" variant="body-sm" tone="tertiary" :truncate="true" truncateLines="1">보컬리스트 · 첫 풀앨범 진행 중</Text>
              </Stack>
              <Stack justify="start" direction="row" align="center" gap="xxs" width="auto" :style="{ flex: '0 0 auto' }">
                <Text as="span" variant="body" weight="bold">287K</Text>
                <Text as="span" variant="caption" tone="success">+9.5%</Text>
              </Stack>
              <Button variant="soft" size="sm" shape="pill">프로필</Button>
            </Stack>
            <Divider orientation="horizontal" variant="solid" inset="none" />
            <!-- 4 -->
            <Stack as="article" direction="row" align="center" justify="start" gap="md" padding="sm" width="100%">
              <Text :style="{ width: '28px', flex: '0 0 auto' }" as="span" variant="heading-4" weight="bold" tone="tertiary" align="center">4</Text>
              <Avatar initials="M" size="md" shape="circle" tone="amber" />
              <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                <Stack direction="row" align="center" gap="xxs" :wrap="false">
                  <Text as="span" variant="body" weight="semibold">MIKO Studio</Text>
                  <Icon name="badge-check" size="14px" />
                  <Text as="span" variant="caption" tone="tertiary">@miko_studio</Text>
                </Stack>
                <Text as="p" variant="body-sm" tone="tertiary" :truncate="true" truncateLines="1">단편영화 전문 스튜디오</Text>
              </Stack>
              <Stack justify="start" direction="row" align="center" gap="xxs" width="auto" :style="{ flex: '0 0 auto' }">
                <Text as="span" variant="body" weight="bold">219K</Text>
                <Text as="span" variant="caption" tone="success">+18.2%</Text>
              </Stack>
              <Button variant="soft" size="sm" shape="pill">프로필</Button>
            </Stack>
            <Divider orientation="horizontal" variant="solid" inset="none" />
            <!-- 5 -->
            <Stack as="article" direction="row" align="center" justify="start" gap="md" padding="sm" width="100%">
              <Text :style="{ width: '28px', flex: '0 0 auto' }" as="span" variant="heading-4" weight="bold" tone="tertiary" align="center">5</Text>
              <Avatar initials="L" size="md" shape="circle" tone="pink" />
              <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                <Stack direction="row" align="center" gap="xxs" :wrap="false">
                  <Text as="span" variant="body" weight="semibold">Lumi Anime</Text>
                  <Icon name="badge-check" size="14px" />
                  <Text as="span" variant="caption" tone="tertiary">@lumi_anime</Text>
                </Stack>
                <Text as="p" variant="body-sm" tone="tertiary" :truncate="true" truncateLines="1">독립 애니메이션 단편</Text>
              </Stack>
              <Stack justify="start" direction="row" align="center" gap="xxs" width="auto" :style="{ flex: '0 0 auto' }">
                <Text as="span" variant="body" weight="bold">197K</Text>
                <Text as="span" variant="caption" tone="success">+15.4%</Text>
              </Stack>
              <Button variant="soft" size="sm" shape="pill">프로필</Button>
            </Stack>
            <Divider orientation="horizontal" variant="solid" inset="none" />
            <!-- 6 -->
            <Stack as="article" direction="row" align="center" justify="start" gap="md" padding="sm" width="100%">
              <Text :style="{ width: '28px', flex: '0 0 auto' }" as="span" variant="heading-4" weight="bold" tone="tertiary" align="center">6</Text>
              <Avatar initials="R" size="md" shape="circle" tone="brand" />
              <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                <Stack direction="row" align="center" gap="xxs" :wrap="false">
                  <Text as="span" variant="body" weight="semibold">RINA</Text>
                  <Icon name="badge-check" size="14px" />
                  <Text as="span" variant="caption" tone="tertiary">@rina_voice</Text>
                </Stack>
                <Text as="p" variant="body-sm" tone="tertiary" :truncate="true" truncateLines="1">당신의 밤을 채우는 보이스 드라마</Text>
              </Stack>
              <Stack justify="start" direction="row" align="center" gap="xxs" width="auto" :style="{ flex: '0 0 auto' }">
                <Text as="span" variant="body" weight="bold">184K</Text>
                <Text as="span" variant="caption" tone="success">+12.4%</Text>
              </Stack>
              <Button variant="soft" size="sm" shape="pill">프로필</Button>
            </Stack>
            <Divider orientation="horizontal" variant="solid" inset="none" />
            <!-- 7 -->
            <Stack as="article" direction="row" align="center" justify="start" gap="md" padding="sm" width="100%">
              <Text :style="{ width: '28px', flex: '0 0 auto' }" as="span" variant="heading-4" weight="bold" tone="tertiary" align="center">7</Text>
              <Avatar initials="D" size="md" shape="circle" tone="amber" />
              <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                <Stack direction="row" align="center" gap="xxs" :wrap="false">
                  <Text as="span" variant="body" weight="semibold">DAISY</Text>
                  <Icon name="badge-check" size="14px" />
                  <Text as="span" variant="caption" tone="tertiary">@daisy_drama</Text>
                </Stack>
                <Text as="p" variant="body-sm" tone="tertiary" :truncate="true" truncateLines="1">새벽 라디오 드라마</Text>
              </Stack>
              <Stack justify="start" direction="row" align="center" gap="xxs" width="auto" :style="{ flex: '0 0 auto' }">
                <Text as="span" variant="body" weight="bold">168K</Text>
                <Text as="span" variant="caption" tone="success">+11.0%</Text>
              </Stack>
              <Button variant="soft" size="sm" shape="pill">프로필</Button>
            </Stack>
            <Divider orientation="horizontal" variant="solid" inset="none" />
            <!-- 8 -->
            <Stack as="article" direction="row" align="center" justify="start" gap="md" padding="sm" width="100%">
              <Text :style="{ width: '28px', flex: '0 0 auto' }" as="span" variant="heading-4" weight="bold" tone="tertiary" align="center">8</Text>
              <Avatar initials="A" size="md" shape="circle" tone="purple" />
              <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                <Stack direction="row" align="center" gap="xxs" :wrap="false">
                  <Text as="span" variant="body" weight="semibold">안나아트</Text>
                  <Icon name="badge-check" size="14px" />
                  <Text as="span" variant="caption" tone="tertiary">@anna_art</Text>
                </Stack>
                <Text as="p" variant="body-sm" tone="tertiary" :truncate="true" truncateLines="1">팬아트와 오리지널 캐릭터</Text>
              </Stack>
              <Stack justify="start" direction="row" align="center" gap="xxs" width="auto" :style="{ flex: '0 0 auto' }">
                <Text as="span" variant="body" weight="bold">143K</Text>
                <Text as="span" variant="caption" tone="success">+5.6%</Text>
              </Stack>
              <Button variant="soft" size="sm" shape="pill">프로필</Button>
            </Stack>
            <Divider orientation="horizontal" variant="solid" inset="none" />
            <!-- 9 -->
            <Stack as="article" direction="row" align="center" justify="start" gap="md" padding="sm" width="100%">
              <Text :style="{ width: '28px', flex: '0 0 auto' }" as="span" variant="heading-4" weight="bold" tone="tertiary" align="center">9</Text>
              <Avatar initials="유" size="md" shape="circle" tone="teal" />
              <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                <Stack direction="row" align="center" gap="xxs" :wrap="false">
                  <Text as="span" variant="body" weight="semibold">유니의 다락방</Text>
                  <Icon name="badge-check" size="14px" />
                  <Text as="span" variant="caption" tone="tertiary">@yuni_attic</Text>
                </Stack>
                <Text as="p" variant="body-sm" tone="tertiary" :truncate="true" truncateLines="1">감성 일러스트와 짧은 글</Text>
              </Stack>
              <Stack justify="start" direction="row" align="center" gap="xxs" width="auto" :style="{ flex: '0 0 auto' }">
                <Text as="span" variant="body" weight="bold">128K</Text>
                <Text as="span" variant="caption" tone="success">+3.2%</Text>
              </Stack>
              <Button variant="soft" size="sm" shape="pill">프로필</Button>
            </Stack>
            <Divider orientation="horizontal" variant="solid" inset="none" />
            <!-- 10 -->
            <Stack as="article" direction="row" align="center" justify="start" gap="md" padding="sm" width="100%">
              <Text :style="{ width: '28px', flex: '0 0 auto' }" as="span" variant="heading-4" weight="bold" tone="tertiary" align="center">10</Text>
              <Avatar initials="하" size="md" shape="circle" tone="green" />
              <Stack direction="column" gap="xxs" :style="{ flex: '1 1 auto', minWidth: '0' }">
                <Stack direction="row" align="center" gap="xxs" :wrap="false">
                  <Text as="span" variant="body" weight="semibold">하라 일러스트</Text>
                  <Icon name="badge-check" size="14px" />
                  <Text as="span" variant="caption" tone="tertiary">@hara_draws</Text>
                </Stack>
                <Text as="p" variant="body-sm" tone="tertiary" :truncate="true" truncateLines="1">초록빛 일러스트레이션 시리즈</Text>
              </Stack>
              <Stack justify="start" direction="row" align="center" gap="xxs" width="auto" :style="{ flex: '0 0 auto' }">
                <Text as="span" variant="body" weight="bold">92K</Text>
                <Text as="span" variant="caption" tone="success">+4.1%</Text>
              </Stack>
              <Button variant="soft" size="sm" shape="pill">프로필</Button>
            </Stack>
          </Card>
        </Stack>

        <!-- 모든 크리에이터 (filters + grid) -->
        <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="md" width="100%">
          <SectionTitle :style="{ width: '100%' }" title="모든 크리에이터" icon="users" as="header" align="center" iconTone="none" :showIcon="true" titleAs="h4" titleVariant="heading-4" titleWeight="bold" :wrapActions="true">
            <SectionTitleGroup align="end">
              <ButtonPopover trailingIcon="chevron-down" placement="bottom-end" buttonLabel="인기순" buttonShape="default" buttonSize="sm" buttonVariant="soft" :closeOnItemClick="true">
                <PopoverList>
                  <PopoverItem icon="flame">인기순</PopoverItem>
                  <PopoverItem icon="clock">최신순</PopoverItem>
                  <PopoverItem icon="trending-up">성장순</PopoverItem>
                </PopoverList>
              </ButtonPopover>
            </SectionTitleGroup>
          </SectionTitle>

          <Tabs ariaLabel="카테고리 필터" size="md" variant="pill">
            <TabsList>
              <Tab selected leadingIcon="globe">전체</Tab>
              <Tab leadingIcon="headphones">보이스드라마</Tab>
              <Tab leadingIcon="ear">ASMR</Tab>
              <Tab leadingIcon="image">일러스트</Tab>
              <Tab leadingIcon="clapperboard">시네마틱</Tab>
              <Tab leadingIcon="pen-tool">코믹/만화</Tab>
              <Tab leadingIcon="music">음악</Tab>
              <Tab leadingIcon="sparkles">애니메이션</Tab>
            </TabsList>
          </Tabs>

          <Text v-if="creatorStore.listLoading && creatorStore.discover.length === 0" tone="tertiary">불러오는 중...</Text>
          <Text v-else-if="!creatorStore.listLoading && creatorStore.discover.length === 0" tone="tertiary">검색 결과가 없습니다.</Text>

          <!-- Creator cards grid -->
          <CardGrid v-else :cols="4" :count="creatorStore.discover.length" itemSize="custom" itemSizeOverride="300px" layout="grid" gap="sm" :arrows="false" edgeFade="visible" scroll="snap">
            <Card
              v-for="creator in creatorStore.discover"
              :key="creator.id"
              variant="solid"
              padding="none"
              gap="none"
              :style="{ cursor: 'pointer' }"
              @click="router.push('/creator/' + creator.id)"
            >
              <Stack
                :style="{
                  height: '160px',
                  background: creator.background_color ?? 'linear-gradient(135deg,#1e1b4b,#4c1d95)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }"
                radius="none"
                direction="row"
                align="end"
                justify="start"
                padding="md"
              >
                <Avatar
                  :src="creator.profile_image ?? undefined"
                  :initials="(creator.nickname ?? '?').slice(0, 2).toUpperCase()"
                  size="lg"
                  shape="circle"
                  tone="brand"
                  :alt="creator.nickname"
                />
              </Stack>
              <Stack direction="column" gap="sm" padding="md">
                <Stack direction="column" gap="none">
                  <Stack direction="row" align="center" gap="xxs">
                    <Text as="h6" variant="heading-6" weight="semibold">{{ creator.nickname }}</Text>
                    <Icon v-if="creator.creator_type === 'official'" name="badge-check" size="16" />
                  </Stack>
                  <Text v-if="creator.username" as="p" variant="caption" tone="tertiary">@{{ creator.username }}</Text>
                </Stack>
                <Text v-if="creator.introduction" as="p" variant="body" tone="secondary" :truncate="true" truncateLines="2">{{ creator.introduction }}</Text>
                <Stack v-if="creator.tags?.length" direction="row" align="center" gap="xxs" :wrap="false">
                  <Chip v-for="tag in creator.tags.slice(0, 3)" :key="tag" size="sm">#{{ tag }}</Chip>
                </Stack>
                <Stack direction="row" align="center" justify="between" gap="sm">
                  <Stack direction="row" align="center" gap="md" width="auto">
                    <Stack direction="column" gap="none" width="auto">
                      <Text as="span" variant="body" weight="bold">{{ (creator.followers_count ?? 0).toLocaleString() }}</Text>
                      <Text as="span" variant="caption" tone="tertiary">팔로워</Text>
                    </Stack>
                    <Stack direction="column" gap="none" width="auto">
                      <Text as="span" variant="body" weight="bold">{{ (creator.posts_count ?? 0).toLocaleString() }}</Text>
                      <Text as="span" variant="caption" tone="tertiary">작품</Text>
                    </Stack>
                  </Stack>
                  <Button
                    :variant="creator.interaction_with_me?.is_following ? 'primary' : 'secondary'"
                    size="sm"
                    shape="pill"
                    :leadingIcon="creator.interaction_with_me?.is_following ? 'check' : 'plus'"
                    @click.stop="creatorStore.follow(creator.id)"
                  >{{ creator.interaction_with_me?.is_following ? '팔로잉' : '팔로우' }}</Button>
                </Stack>
              </Stack>
            </Card>
          </CardGrid>
        </Stack>

        <Stack direction="row" justify="center" :style="{ marginTop: 'var(--ds-spacing-space-6)', padding: 'var(--wb-spacing-space-4)', height: '40px', marginBottom: 'var(--ds-spacing-space-12)' }">
          <Button variant="ghost" size="sm" label="더 불러오기" trailingIcon="chevron-down" />
        </Stack>

      </Stack>
    </Stack>
  </Stack>
</template>
