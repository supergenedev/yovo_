<script setup>
import {
  Badge,
  Button,
  ButtonPopover,
  Card,
  CardGrid,
  Chip,
  Divider,
  Input,
  PopoverItem,
  PopoverList,
  Stack,
  Text,
  UserBlock,
  UserCard,
  UserCardHead,
  Media,
} from '@/components'
</script>

<template>
  <Stack
    :style="{ height: '100%', width: '100%', overflow: 'hidden' }"
    as="main"
    direction="row"
    align="stretch"
    justify="start"
    gap="lg"
    padding="none"
    background="none"
  >
    <Stack
      justify="start"
      :scrollFade="false"
      align="center"
      :style="{ width: '1549px', minWidth: 'var(--ds-spacing-dialog-max-width-md)', paddingTop: '0.75rem', overflow: 'hidden', height: '100%', flex: '1 1 auto', paddingRight: 'var(--ds-spacing-space-4)' }"
      direction="column"
      gap="none"
    >
      <Stack
        :style="{ height: '100%', overflow: 'hidden', width: '100%', maxWidth: '1200px' }"
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
          justify="between"
          background="none"
          :style="{ width: '100%', paddingTop: 'var(--ds-spacing-space-2)', top: '0px', zIndex: '2', paddingBottom: 'var(--ds-spacing-space-3)' }"
          as="header"
          direction="row"
          align="center"
          gap="md"
          :wrap="false"
        >
          <Stack direction="column" gap="xs" flex="1 1 auto">
            <Text as="h1" tone="primary" variant="heading-1" weight="bold" truncateLines="1" align="start">작품 만들기</Text>
          </Stack>

          <Button variant="secondary" shape="pill" size="md">임시 저장</Button>
          <Button shape="pill" variant="soft" size="md" leadingIcon="ellipsis" iconOnly aria-label="Create" />
        </Stack>

        <Stack
          :wrap="false"
          :scrollFade="false"
          :style="{ width: '100%', height: '100%', overflow: 'scroll' }"
          as="div"
          radius="md"
          direction="column"
          align="center"
          justify="start"
          gap="lg"
          padding="none"
          background="none"
        >
          <Stack
            direction="column"
            align="start"
            justify="start"
            gap="xl"
            :wrap="false"
            :style="{ width: '100%', maxWidth: '1320px', paddingBottom: 'var(--ds-spacing-space-8)', height: '100%', overflow: 'hidden' }"
          >
            <Stack
              :scrollFade="true"
              as="aside"
              direction="column"
              gap="sm"
              padding="none"
              background="surface"
              radius="md"
              :style="{ minWidth: '260px', top: '0px', width: '100%', zIndex: '1', overflow: 'scroll', height: 'fit-content', flex: '0 0 auto' }"
            >
              <Stack :style="{ flex: '0 0 auto' }" direction="row" gap="xs">
                <Stack :style="{ minWidth: '140px' }" direction="row" align="center" gap="sm" padding="sm" radius="md" background="accent">
                  <Media :style="{ width: '40px', overflow: 'hidden' }" rounded="pill" aspectRatio="1 / 1" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none">
                    <Text :style="{ width: 'fit-content', height: 'fit-content' }" lineHeight="1em" as="p" tone="static-dark" variant="heading-6" transform="none" weight="inherit" truncateLines="1" align="start">1</Text>
                  </Media>
                  <Stack direction="column" gap="none">
                    <Text as="p" variant="body" tone="static-light" weight="bold">작품 정보</Text>
                    <Text as="p" variant="caption" tone="static-light">제목·카테고리·태그</Text>
                  </Stack>
                </Stack>
                <Stack :style="{ minWidth: '140px' }" direction="row" align="center" gap="sm" padding="sm" radius="md">
                  <Media :style="{ width: '40px' }" rounded="pill" aspectRatio="1 / 1" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none">
                    <Text :style="{ width: 'fit-content', height: 'fit-content' }" lineHeight="1em" as="p" tone="primary" variant="heading-6" transform="none" weight="inherit" truncateLines="1" align="start">2</Text>
                  </Media>
                  <Stack direction="column" gap="none">
                    <Text as="p" variant="body" weight="bold">스토리</Text>
                    <Text as="p" variant="caption" tone="tertiary">시놉시스 작성</Text>
                  </Stack>
                </Stack>
                <Stack :style="{ minWidth: '140px' }" direction="row" align="center" gap="sm" padding="sm" radius="md">
                  <Media :style="{ width: '40px' }" rounded="pill" aspectRatio="1 / 1" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none">
                    <Text :style="{ width: 'fit-content', height: 'fit-content' }" lineHeight="1em" as="p" tone="primary" variant="heading-6" transform="none" weight="inherit" truncateLines="1" align="start">3</Text>
                  </Media>
                  <Stack direction="column" gap="none">
                    <Text as="p" variant="body" weight="bold">캐릭터</Text>
                    <Text as="p" variant="caption" tone="tertiary">출연 캐릭터 설정</Text>
                  </Stack>
                </Stack>
                <Stack :style="{ minWidth: '140px' }" direction="row" align="center" gap="sm" padding="sm" radius="md">
                  <Media :style="{ width: '40px' }" rounded="pill" aspectRatio="1 / 1" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none">
                    <Text :style="{ width: 'fit-content', height: 'fit-content' }" lineHeight="1em" as="p" tone="primary" variant="heading-6" transform="none" weight="inherit" truncateLines="1" align="start">4</Text>
                  </Media>
                  <Stack direction="column" gap="none">
                    <Text as="p" variant="body" weight="bold">장면</Text>
                    <Text as="p" variant="caption" tone="tertiary">씬 생성 및 편집</Text>
                  </Stack>
                </Stack>
                <Stack :style="{ minWidth: '140px' }" direction="row" align="center" gap="sm" padding="sm" radius="md">
                  <Media :style="{ width: '40px' }" rounded="pill" aspectRatio="1 / 1" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none">
                    <Text :style="{ width: 'fit-content', height: 'fit-content' }" lineHeight="1em" as="p" tone="primary" variant="heading-6" transform="none" weight="inherit" truncateLines="1" align="start">5</Text>
                  </Media>
                  <Stack direction="column" gap="none">
                    <Text as="p" variant="body" weight="bold">더빙</Text>
                    <Text as="p" variant="caption" tone="tertiary">음성 방식 선택</Text>
                  </Stack>
                </Stack>
                <Stack :style="{ minWidth: '140px' }" direction="row" align="center" gap="sm" padding="sm" radius="md">
                  <Media :style="{ width: '40px' }" rounded="pill" aspectRatio="1 / 1" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none">
                    <Text :style="{ width: 'fit-content', height: 'fit-content' }" lineHeight="1em" as="p" tone="primary" variant="heading-6" transform="none" weight="inherit" truncateLines="1" align="start">6</Text>
                  </Media>
                  <Stack direction="column" gap="none">
                    <Text as="p" variant="body" weight="bold">편집</Text>
                    <Text as="p" variant="caption" tone="tertiary">대사·구간 다듬기</Text>
                  </Stack>
                </Stack>
                <Stack :style="{ minWidth: '140px' }" direction="row" align="center" gap="sm" padding="sm" radius="md">
                  <Media :style="{ width: '40px' }" rounded="pill" aspectRatio="1 / 1" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none">
                    <Text :style="{ width: 'fit-content', height: 'fit-content' }" lineHeight="1em" as="p" tone="primary" variant="heading-6" transform="none" weight="inherit" truncateLines="1" align="start">7</Text>
                  </Media>
                  <Stack direction="column" gap="none">
                    <Text as="p" variant="body" weight="bold">공개 설정</Text>
                    <Text as="p" variant="caption" tone="tertiary">썸네일·가격·게시</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              :scrollFade="true"
              as="section"
              direction="column"
              gap="2xl"
              padding="none"
              background="none"
              radius="md"
              :style="{ minWidth: '0', height: '100%', overflow: 'scroll', flex: '1 1 auto', padding: 'var(--ds-spacing-space-1)' }"
            >
              <Stack direction="column" gap="xs">
                <Text as="p" variant="caption" tone="brand" weight="bold">작품 정보</Text>
                <Text as="h2" variant="heading-2" weight="bold">어떤 작품을 만드시나요?</Text>
                <Text as="p" variant="body-sm" tone="tertiary">제목과 카테고리, 태그를 입력하면 검색·추천에 도움이 돼요.</Text>
              </Stack>

              <Stack :style="{ paddingBottom: 'var(--ds-spacing-space-6)' }" direction="column" gap="lg">
                <Divider :style="{ margin: 'var(--ds-spacing-space-0)' }" label="기본 정보" labelPosition="left" />
                <Stack direction="column" gap="xs">
                  <Text as="p" variant="body" weight="bold">제목</Text>
                  <Input type="search" labelPosition="outside" shape="default" defaultValue="별빛 정원의 비밀" :readOnly="false" size="lg" />
                </Stack>
                <Stack direction="column" gap="xs">
                  <Text as="p" variant="body" weight="bold">한 줄 소개</Text>
                  <Input labelPosition="outside" description="피드와 SNS 공유에 노출돼요." defaultValue="잃어버린 편지를 따라 시작된 한여름의 정원 미스터리." :readOnly="false" size="lg" />
                </Stack>
                <Stack direction="column" gap="xs">
                  <Text as="p" variant="body" weight="bold">시리즈</Text>
                  <Stack direction="row" gap="sm" :wrap="true">
                    <Stack direction="row" gap="xs" :style="{ flex: '1 1 360px', width: '496px', height: 'fit-content' }">
                      <Input labelPosition="inside" description="이어지는 작품이면 입력" label="시리즈" placeholder="예: 별빛 정원 시리즈" :readOnly="false" size="lg" />
                      <Input label="에피소드" labelPosition="inside" defaultValue="EP. 01" :readOnly="false" size="lg" />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Stack :style="{ paddingBottom: 'var(--ds-spacing-space-6)' }" direction="column" gap="lg">
                <Divider :style="{ margin: 'var(--ds-spacing-space-0)' }" label="분류" labelPosition="left" />
                <Stack direction="column" gap="xs">
                  <Text as="p" variant="body" weight="bold">카테고리</Text>
                  <Stack direction="row" gap="xs" :wrap="true">
                    <Button shape="pill" size="sm" variant="primary">보이스드라마</Button>
                    <Button shape="pill" size="sm" variant="outline">ASMR</Button>
                    <Button shape="pill" size="sm" variant="outline">오디오북</Button>
                    <Button shape="pill" size="sm" variant="outline">시네마틱</Button>
                    <Button shape="pill" size="sm" variant="outline">코믹</Button>
                    <Button shape="pill" size="sm" variant="outline">음악</Button>
                    <Button shape="pill" size="sm" variant="outline">애니메이션</Button>
                  </Stack>
                </Stack>
                <Stack direction="column" gap="xs">
                  <Stack direction="row" align="center" justify="between">
                    <Text as="p" variant="body" weight="bold">태그</Text>
                    <Stack :style="{ width: 'fit-content' }" as="div" radius="none" direction="row" align="stretch" justify="end" gap="md" padding="none" background="none">
                      <Text :style="{ height: 'fit-content' }" as="span" variant="caption" tone="tertiary">최대 5개, Enter로 추가</Text>
                      <Text as="span" variant="caption" tone="tertiary">2/5</Text>
                    </Stack>
                  </Stack>
                  <Card variant="outline" padding="sm" gap="xs">
                    <Stack direction="row" align="center" gap="xs" :wrap="true">
                      <Chip tone="brand" removable removeLabel="로맨스 제거">#로맨스</Chip>
                      <Chip tone="brand" removable removeLabel="판타지 제거">#판타지</Chip>
                      <Text as="span" variant="body-sm" tone="tertiary">태그 입력 후 Enter</Text>
                    </Stack>
                  </Card>
                  <Text :style="{ height: 'fit-content' }" as="span" variant="caption" tone="tertiary">추천 태그</Text>
                  <Stack direction="row" gap="xs" :wrap="true">
                    <Chip :removable="false" variant="outline" size="md">#일상</Chip>
                    <Chip variant="outline" size="md">#스릴러</Chip>
                    <Chip variant="outline" size="md">#코미디</Chip>
                    <Chip variant="outline" size="md">#청량</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                    <Chip variant="outline" size="md">#치유</Chip>
                  </Stack>
                </Stack>
              </Stack>

              <Stack direction="column" gap="xl">
                <Divider :style="{ margin: 'var(--ds-spacing-space-0)' }" label="제작 옵션" labelPosition="left" />
                <Stack direction="column" gap="xs">
                  <Stack justify="between" direction="row" align="baseline" gap="xs" width="auto">
                    <Text as="p" variant="heading-6" weight="bold">언어</Text>
                    <Text as="span" variant="caption" tone="tertiary">대사·자막·TTS 음성 기본 언어</Text>
                  </Stack>
                  <CardGrid layout="grid" cols="4" gap="sm" :shadow="false">
                    <Card :style="{ height: '100%' }" variant="outline" padding="md" gap="xxs">
                      <Stack as="div" radius="none" direction="row" align="center" justify="start" gap="md" padding="none" background="none">
                        <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="none" padding="none" background="none">
                          <Text as="span" variant="body" weight="bold">한국어</Text>
                          <Text as="span" variant="caption" tone="tertiary">Korean</Text>
                        </Stack>
                        <Badge :style="{ width: 'fit-content' }" status="danger" variant="subtle" size="sm" shape="pill">기본</Badge>
                      </Stack>
                    </Card>
                    <Card :style="{ height: '100%' }" variant="solid" padding="md" gap="xxs">
                      <Text as="span" variant="body" weight="bold">日本語</Text>
                      <Text as="span" variant="caption" tone="tertiary">Japanese</Text>
                    </Card>
                    <Card :style="{ height: '100%' }" variant="solid" padding="md" gap="xxs">
                      <Text as="span" variant="body" weight="bold">English</Text>
                      <Text as="span" variant="caption" tone="tertiary">English</Text>
                    </Card>
                    <Card :style="{ height: '100%' }" variant="solid" padding="md" gap="xxs">
                      <Text as="span" variant="body" weight="bold">中文</Text>
                      <Text as="span" variant="caption" tone="tertiary">Chinese</Text>
                    </Card>
                  </CardGrid>
                </Stack>
                <Stack direction="column" gap="xs">
                  <Stack justify="between" direction="row" align="baseline" gap="xs" width="auto">
                    <Text as="p" variant="heading-6" weight="bold">화면 비율</Text>
                    <Text as="span" variant="caption" tone="tertiary">씬 생성·영상 출력 비율</Text>
                  </Stack>
                  <CardGrid layout="grid" cols="3" gap="sm" :shadow="false">
                    <Card variant="outline" padding="lg" gap="xs">
                      <Stack align="center" gap="xs">
                        <Badge status="danger" variant="solid" size="md">16:9</Badge>
                        <Text as="span" variant="body-sm" weight="bold" align="center">가로 (16:9)</Text>
                        <Text as="span" variant="caption" tone="tertiary" align="center">유튜브·시네마틱</Text>
                      </Stack>
                    </Card>
                    <Card variant="solid" padding="lg" gap="xs">
                      <Stack align="center" gap="xs">
                        <Badge status="neutral" variant="flat" size="md">9:16</Badge>
                        <Text as="span" variant="body-sm" weight="bold" align="center">세로 (9:16)</Text>
                        <Text as="span" variant="caption" tone="tertiary" align="center">쇼츠·릴스</Text>
                      </Stack>
                    </Card>
                    <Card variant="solid" padding="lg" gap="xs">
                      <Stack align="center" gap="xs">
                        <Badge status="neutral" variant="flat" size="md">1:1</Badge>
                        <Text as="span" variant="body-sm" weight="bold" align="center">정사각 (1:1)</Text>
                        <Text as="span" variant="caption" tone="tertiary" align="center">피드 카드</Text>
                      </Stack>
                    </Card>
                  </CardGrid>
                </Stack>
                <Stack direction="column" gap="xs">
                  <Stack justify="between" direction="row" align="baseline" gap="xs" width="auto">
                    <Text as="p" variant="heading-6" weight="bold">아트 스타일 프리셋</Text>
                    <Text as="span" variant="caption" tone="tertiary">씬 이미지 생성 베이스</Text>
                  </Stack>
                  <CardGrid layout="grid" cols="3" gap="sm" :shadow="false">
                    <Card variant="outline" padding="none" gap="none">
                      <Media src="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg" rounded="md" aspectRatio="16 / 9" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none" />
                      <Stack direction="row" align="center" justify="between" padding="sm">
                        <Text as="span" variant="body-sm" weight="bold">애니메 소프트</Text>
                        <Badge status="danger" variant="subtle" size="sm" shape="pill">선택</Badge>
                      </Stack>
                    </Card>
                    <Card variant="solid" padding="none" gap="none">
                      <Media src="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg" rounded="md" aspectRatio="16 / 9" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none" />
                      <Stack padding="sm"><Text as="span" variant="body-sm" weight="bold">애니메 샤프</Text></Stack>
                    </Card>
                    <Card variant="solid" padding="none" gap="none">
                      <Media src="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg" rounded="md" aspectRatio="16 / 9" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none" />
                      <Stack padding="sm"><Text as="span" variant="body-sm" weight="bold">만화 / 만화체</Text></Stack>
                    </Card>
                    <Card variant="solid" padding="none" gap="none">
                      <Media src="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg" rounded="md" aspectRatio="16 / 9" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none" />
                      <Stack padding="sm"><Text as="span" variant="body-sm" weight="bold">시네마틱 리얼</Text></Stack>
                    </Card>
                    <Card variant="solid" padding="none" gap="none">
                      <Media src="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg" rounded="md" aspectRatio="16 / 9" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none" />
                      <Stack padding="sm"><Text as="span" variant="body-sm" weight="bold">수채화</Text></Stack>
                    </Card>
                    <Card variant="solid" padding="none" gap="none">
                      <Media src="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg" rounded="md" aspectRatio="16 / 9" backgroundPosition="center" fit="cover" overlay="none" overlayGlassBlur="18" overlayMask="none" overlayMaskStart="38" overlayMaskEnd="100" overlayMaskAngle="0" mask="none" />
                      <Stack padding="sm"><Text as="span" variant="body-sm" weight="bold">파스텔 일러스트</Text></Stack>
                    </Card>
                  </CardGrid>
                </Stack>
                <Stack direction="column" gap="xs">
                  <Stack justify="between" direction="row" align="baseline" gap="xs" width="auto">
                    <Text as="p" variant="heading-6" weight="bold">연령 등급</Text>
                    <Text as="span" variant="caption" tone="tertiary">플랫폼 정책 준수를 위해 필요합니다</Text>
                  </Stack>
                  <Stack direction="row" gap="xs" :wrap="true">
                    <Badge status="success" variant="solid" size="xl" shape="pill">전체</Badge>
                    <Button shape="pill" size="sm" variant="outline">12+</Button>
                    <Button shape="pill" size="sm" variant="outline">15+</Button>
                    <Button shape="pill" size="sm" variant="outline">19+</Button>
                  </Stack>
                </Stack>
              </Stack>

              <Divider />
              <Stack as="footer" direction="row" align="center" justify="center" gap="sm">
                <Button variant="primary" shape="pill" size="lg" trailingIcon="arrow-right">다음 단계</Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
</template>
