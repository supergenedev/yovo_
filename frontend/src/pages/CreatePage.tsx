import { useState } from 'react'
import {
  SgDsLibraryStack,
  SgDsLibraryText,
  SgDsLibraryButton,
  SgDsLibraryBadge,
  SgDsLibraryCard,
  SgDsLibraryCardGrid,
  SgDsLibraryChip,
  SgDsLibraryDivider,
  SgDsLibraryInput,
  SgDsLibraryMedia,
} from '@/libraries/sg-ds-library/components'

const CATEGORIES = ['보이스드라마', 'ASMR', '오디오북', '시네마틱', '코믹', '음악', '애니메이션']
const SUGGESTED_TAGS = ['#일상', '#스릴러', '#코미디', '#청량', '#치유', '#로맨스', '#판타지', '#액션']
const STEPS = [
  { num: '1', label: '작품 정보', sub: '제목·카테고리·태그' },
  { num: '2', label: '스토리', sub: '시놉시스 작성' },
  { num: '3', label: '캐릭터', sub: '출연 캐릭터 설정' },
  { num: '4', label: '장면', sub: '씬 생성 및 편집' },
  { num: '5', label: '더빙', sub: '음성 방식 선택' },
  { num: '6', label: '편집', sub: '대사·구간 다듬기' },
  { num: '7', label: '공개 설정', sub: '썸네일·가격·게시' },
]

export default function CreatePage() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [tags, setTags] = useState(['#로맨스', '#판타지'])
  const [selectedAspect, setSelectedAspect] = useState(0)
  const [selectedStyle, setSelectedStyle] = useState(0)
  const [selectedRating, setSelectedRating] = useState(0)
  const [selectedLang, setSelectedLang] = useState(0)

  return (
    <SgDsLibraryStack
      style={{ height: '100%', width: '100%', overflow: 'hidden' }}
      as="main"
      data-wb-bg-token="surface-page"
      data-wb-bg-token-collection="sg-ds-library-semantic-color"
      direction="column"
      align="stretch"
      justify="start"
      gap="none"
      padding="none"
      background="none"
    >
      <SgDsLibraryStack
        justify="start"
        scrollFade={false}
        align="center"
        style={{ width: '100%', minWidth: 'var(--ds-spacing-dialog-max-width-md)', paddingTop: '0.75rem', overflow: 'hidden', height: '100%', flex: '1 1 auto', paddingRight: 'var(--ds-spacing-space-4)', paddingLeft: 'var(--ds-spacing-space-4)' }}
        direction="column"
        gap="none"
      >
        <SgDsLibraryStack
          style={{ height: '100%', overflow: 'hidden', width: '100%', maxWidth: '1200px' }}
          as="div"
          radius="none"
          direction="column"
          align="center"
          justify="start"
          gap="xs"
          padding="none"
          background="none"
        >
          {/* HEADER */}
          <SgDsLibraryStack
            justify="between"
            data-wb-bg-token="surface-page"
            data-wb-bg-token-collection="sg-ds-library-semantic-color"
            background="none"
            style={{ width: '100%', paddingTop: 'var(--ds-spacing-space-2)', top: '0px', zIndex: 2, paddingBottom: 'var(--ds-spacing-space-3)' }}
            as="header"
            direction="row"
            align="center"
            gap="md"
            wrap={false}
          >
            <SgDsLibraryStack direction="column" gap="xs" flex="1 1 auto">
              <SgDsLibraryText as="h1" tone="primary" variant="heading-1" weight="bold" truncateLines="1" align="start">작품 만들기</SgDsLibraryText>
            </SgDsLibraryStack>
            <SgDsLibraryButton variant="secondary" shape="pill" size="md">임시 저장</SgDsLibraryButton>
            <SgDsLibraryButton shape="pill" variant="soft" size="md" leadingIcon="ellipsis" iconOnly aria-label="더보기" />
          </SgDsLibraryStack>

          <SgDsLibraryStack
            wrap={false}
            scrollFade={false}
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            as="div"
            radius="md"
            direction="column"
            align="center"
            justify="start"
            gap="lg"
            padding="none"
            background="none"
          >
            <SgDsLibraryStack
              direction="column"
              align="start"
              justify="start"
              gap="xl"
              wrap={false}
              style={{ width: '100%', maxWidth: '1320px', paddingBottom: 'var(--ds-spacing-space-8)', height: '100%', overflow: 'hidden' }}
            >
              {/* STEP NAV */}
              <SgDsLibraryStack
                scrollFade={true}
                as="aside"
                direction="column"
                gap="sm"
                padding="none"
                background="surface"
                radius="md"
                style={{ minWidth: '260px', top: '0px', width: '100%', zIndex: 1, overflow: 'scroll', height: 'fit-content', flex: '0 0 auto' }}
              >
                <SgDsLibraryStack style={{ flex: '0 0 auto' }} direction="row" gap="xs">
                  {STEPS.map((step, i) => (
                    <SgDsLibraryStack
                      key={step.num}
                      style={{ minWidth: '140px' }}
                      direction="row"
                      align="center"
                      gap="sm"
                      padding="sm"
                      radius="md"
                      background={i === 0 ? 'accent' : 'none'}
                    >
                      <SgDsLibraryMedia
                        style={{ width: '40px', overflow: 'hidden' }}
                        rounded="pill"
                        aspectRatio="1 / 1"
                        backgroundPosition="center"
                        fit="cover"
                        overlay="none"
                        mask="none"
                      >
                        <SgDsLibraryText
                          style={{ width: 'fit-content', height: 'fit-content' }}
                          lineHeight="1em"
                          as="p"
                          tone={i === 0 ? 'static-dark' : 'primary'}
                          variant="heading-6"
                          weight="inherit"
                          truncateLines="1"
                          align="start"
                        >
                          {step.num}
                        </SgDsLibraryText>
                      </SgDsLibraryMedia>
                      <SgDsLibraryStack direction="column" gap="none">
                        <SgDsLibraryText as="p" variant="body" tone={i === 0 ? 'static-light' : 'primary'} weight="bold">{step.label}</SgDsLibraryText>
                        <SgDsLibraryText as="p" variant="caption" tone={i === 0 ? 'static-light' : 'tertiary'}>{step.sub}</SgDsLibraryText>
                      </SgDsLibraryStack>
                    </SgDsLibraryStack>
                  ))}
                </SgDsLibraryStack>
              </SgDsLibraryStack>

              {/* MAIN FORM */}
              <SgDsLibraryStack
                scrollFade={true}
                as="section"
                direction="column"
                gap="2xl"
                padding="none"
                background="none"
                radius="md"
                style={{ minWidth: '0', height: '100%', overflow: 'scroll', flex: '1 1 auto', padding: 'var(--ds-spacing-space-1)' }}
              >
                {/* Section header */}
                <SgDsLibraryStack direction="column" gap="xs">
                  <SgDsLibraryText as="p" variant="caption" tone="brand" weight="bold">작품 정보</SgDsLibraryText>
                  <SgDsLibraryText as="h2" variant="heading-2" weight="bold">어떤 작품을 만드시나요?</SgDsLibraryText>
                  <SgDsLibraryText as="p" variant="body-sm" tone="tertiary">제목과 카테고리, 태그를 입력하면 검색·추천에 도움이 돼요.</SgDsLibraryText>
                </SgDsLibraryStack>

                {/* 기본 정보 */}
                <SgDsLibraryStack style={{ paddingBottom: 'var(--ds-spacing-space-6)' }} direction="column" gap="lg">
                  <SgDsLibraryDivider style={{ margin: 'var(--ds-spacing-space-0)' }} label="기본 정보" labelPosition="left" />
                  <SgDsLibraryStack direction="column" gap="xs">
                    <SgDsLibraryText as="p" variant="body" weight="bold">제목</SgDsLibraryText>
                    <SgDsLibraryInput type="search" labelPosition="outside" shape="default" defaultValue="별빛 정원의 비밀" readOnly={false} size="lg" />
                  </SgDsLibraryStack>
                  <SgDsLibraryStack direction="column" gap="xs">
                    <SgDsLibraryText as="p" variant="body" weight="bold">한 줄 소개</SgDsLibraryText>
                    <SgDsLibraryInput labelPosition="outside" description="피드와 SNS 공유에 노출돼요." defaultValue="잃어버린 편지를 따라 시작된 한여름의 정원 미스터리." readOnly={false} size="lg" />
                  </SgDsLibraryStack>
                  <SgDsLibraryStack direction="column" gap="xs">
                    <SgDsLibraryText as="p" variant="body" weight="bold">시리즈</SgDsLibraryText>
                    <SgDsLibraryStack direction="row" gap="sm" wrap={true}>
                      <SgDsLibraryStack direction="row" gap="xs" style={{ flex: '1 1 360px', width: '496px', height: 'fit-content' }}>
                        <SgDsLibraryInput labelPosition="inside" description="이어지는 작품이면 입력" label="시리즈" placeholder="예: 별빛 정원 시리즈" readOnly={false} size="lg" />
                        <SgDsLibraryInput label="에피소드" labelPosition="inside" defaultValue="EP. 01" readOnly={false} size="lg" />
                      </SgDsLibraryStack>
                    </SgDsLibraryStack>
                  </SgDsLibraryStack>
                </SgDsLibraryStack>

                {/* 분류 */}
                <SgDsLibraryStack style={{ paddingBottom: 'var(--ds-spacing-space-6)' }} direction="column" gap="lg">
                  <SgDsLibraryDivider style={{ margin: 'var(--ds-spacing-space-0)' }} label="분류" labelPosition="left" />
                  <SgDsLibraryStack direction="column" gap="xs">
                    <SgDsLibraryText as="p" variant="body" weight="bold">카테고리</SgDsLibraryText>
                    <SgDsLibraryStack direction="row" gap="xs" wrap={true}>
                      {CATEGORIES.map((cat, i) => (
                        <SgDsLibraryButton
                          key={cat}
                          shape="pill"
                          size="sm"
                          variant={selectedCategory === i ? 'primary' : 'outline'}
                          onClick={() => setSelectedCategory(i)}
                        >
                          {cat}
                        </SgDsLibraryButton>
                      ))}
                    </SgDsLibraryStack>
                  </SgDsLibraryStack>
                  <SgDsLibraryStack direction="column" gap="xs">
                    <SgDsLibraryStack direction="row" align="center" justify="between">
                      <SgDsLibraryText as="p" variant="body" weight="bold">태그</SgDsLibraryText>
                      <SgDsLibraryStack style={{ width: 'fit-content' }} as="div" radius="none" direction="row" align="stretch" justify="end" gap="md" padding="none" background="none">
                        <SgDsLibraryText style={{ height: 'fit-content' }} as="span" variant="caption" tone="tertiary">최대 5개, Enter로 추가</SgDsLibraryText>
                        <SgDsLibraryText as="span" variant="caption" tone="tertiary">{tags.length}/5</SgDsLibraryText>
                      </SgDsLibraryStack>
                    </SgDsLibraryStack>
                    <SgDsLibraryCard variant="outline" padding="sm" gap="xs">
                      <SgDsLibraryStack direction="row" align="center" gap="xs" wrap={true}>
                        {tags.map((tag) => (
                          <SgDsLibraryChip
                            key={tag}
                            tone="brand"
                            removable
                            removeLabel={`${tag} 제거`}
                            onRemove={() => setTags(tags.filter((t) => t !== tag))}
                          >
                            {tag}
                          </SgDsLibraryChip>
                        ))}
                        <SgDsLibraryText as="span" variant="body-sm" tone="tertiary">태그 입력 후 Enter</SgDsLibraryText>
                      </SgDsLibraryStack>
                    </SgDsLibraryCard>
                    <SgDsLibraryText style={{ height: 'fit-content' }} as="span" variant="caption" tone="tertiary">추천 태그</SgDsLibraryText>
                    <SgDsLibraryStack direction="row" gap="xs" wrap={true}>
                      {SUGGESTED_TAGS.map((tag) => (
                        <SgDsLibraryChip
                          key={tag}
                          variant="outline"
                          size="md"
                          onClick={() => {
                            if (!tags.includes(tag) && tags.length < 5) setTags([...tags, tag])
                          }}
                        >
                          {tag}
                        </SgDsLibraryChip>
                      ))}
                    </SgDsLibraryStack>
                  </SgDsLibraryStack>
                </SgDsLibraryStack>

                {/* 제작 옵션 */}
                <SgDsLibraryStack direction="column" gap="xl">
                  <SgDsLibraryDivider style={{ margin: 'var(--ds-spacing-space-0)' }} label="제작 옵션" labelPosition="left" />

                  {/* 언어 */}
                  <SgDsLibraryStack direction="column" gap="xs">
                    <SgDsLibraryStack justify="between" direction="row" align="end" gap="xs" width="auto">
                      <SgDsLibraryText as="p" variant="heading-6" weight="bold">언어</SgDsLibraryText>
                      <SgDsLibraryText as="span" variant="caption" tone="tertiary">대사·자막·TTS 음성 기본 언어</SgDsLibraryText>
                    </SgDsLibraryStack>
                    <SgDsLibraryCardGrid layout="grid" cols="4" gap="sm" shadow={false}>
                      {[['한국어', 'Korean'], ['日本語', 'Japanese'], ['English', 'English'], ['中文', 'Chinese']].map(([name, sub], i) => (
                        <SgDsLibraryCard
                          key={name}
                          style={{ height: '100%', cursor: 'pointer' }}
                          variant={selectedLang === i ? 'outline' : 'solid'}
                          padding="md"
                          gap="xxs"
                          onClick={() => setSelectedLang(i)}
                        >
                          <SgDsLibraryStack as="div" direction="row" align="center" justify="start" gap="md" padding="none" background="none">
                            <SgDsLibraryStack direction="column" align="stretch" justify="start" gap="none" padding="none" background="none">
                              <SgDsLibraryText as="span" variant="body" weight="bold">{name}</SgDsLibraryText>
                              <SgDsLibraryText as="span" variant="caption" tone="tertiary">{sub}</SgDsLibraryText>
                            </SgDsLibraryStack>
                            {selectedLang === i && (
                              <SgDsLibraryBadge style={{ width: 'fit-content' }} status="danger" variant="subtle" size="sm" shape="pill">기본</SgDsLibraryBadge>
                            )}
                          </SgDsLibraryStack>
                        </SgDsLibraryCard>
                      ))}
                    </SgDsLibraryCardGrid>
                  </SgDsLibraryStack>

                  {/* 화면 비율 */}
                  <SgDsLibraryStack direction="column" gap="xs">
                    <SgDsLibraryStack justify="between" direction="row" align="end" gap="xs" width="auto">
                      <SgDsLibraryText as="p" variant="heading-6" weight="bold">화면 비율</SgDsLibraryText>
                      <SgDsLibraryText as="span" variant="caption" tone="tertiary">씬 생성·영상 출력 비율</SgDsLibraryText>
                    </SgDsLibraryStack>
                    <SgDsLibraryCardGrid layout="grid" cols="3" gap="sm" shadow={false}>
                      {[
                        { ratio: '16:9', label: '가로 (16:9)', sub: '유튜브·시네마틱' },
                        { ratio: '9:16', label: '세로 (9:16)', sub: '쇼츠·릴스' },
                        { ratio: '1:1', label: '정사각 (1:1)', sub: '피드 카드' },
                      ].map((item, i) => (
                        <SgDsLibraryCard
                          key={item.ratio}
                          variant={selectedAspect === i ? 'outline' : 'solid'}
                          padding="lg"
                          gap="xs"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedAspect(i)}
                        >
                          <SgDsLibraryStack align="center" gap="xs">
                            <SgDsLibraryBadge status={selectedAspect === i ? 'danger' : 'neutral'} variant={selectedAspect === i ? 'solid' : 'flat'} size="md">{item.ratio}</SgDsLibraryBadge>
                            <SgDsLibraryText as="span" variant="body-sm" weight="bold" align="center">{item.label}</SgDsLibraryText>
                            <SgDsLibraryText as="span" variant="caption" tone="tertiary" align="center">{item.sub}</SgDsLibraryText>
                          </SgDsLibraryStack>
                        </SgDsLibraryCard>
                      ))}
                    </SgDsLibraryCardGrid>
                  </SgDsLibraryStack>

                  {/* 아트 스타일 */}
                  <SgDsLibraryStack direction="column" gap="xs">
                    <SgDsLibraryStack justify="between" direction="row" align="end" gap="xs" width="auto">
                      <SgDsLibraryText as="p" variant="heading-6" weight="bold">아트 스타일 프리셋</SgDsLibraryText>
                      <SgDsLibraryText as="span" variant="caption" tone="tertiary">씬 이미지 생성 베이스</SgDsLibraryText>
                    </SgDsLibraryStack>
                    <SgDsLibraryCardGrid layout="grid" cols="3" gap="sm" shadow={false}>
                      {['애니메 소프트', '애니메 샤프', '만화 / 만화체', '시네마틱 리얼', '수채화', '파스텔 일러스트'].map((style, i) => (
                        <SgDsLibraryCard
                          key={style}
                          variant={selectedStyle === i ? 'outline' : 'solid'}
                          padding="none"
                          gap="none"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedStyle(i)}
                        >
                          <SgDsLibraryMedia
                            src="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg"
                            rounded="md"
                            aspectRatio="16 / 9"
                            backgroundPosition="center"
                            fit="cover"
                            overlay="none"
                            mask="none"
                          />
                          <SgDsLibraryStack direction="row" align="center" justify="between" padding="sm">
                            <SgDsLibraryText as="span" variant="body-sm" weight="bold">{style}</SgDsLibraryText>
                            {selectedStyle === i && (
                              <SgDsLibraryBadge status="danger" variant="subtle" size="sm" shape="pill">선택</SgDsLibraryBadge>
                            )}
                          </SgDsLibraryStack>
                        </SgDsLibraryCard>
                      ))}
                    </SgDsLibraryCardGrid>
                  </SgDsLibraryStack>

                  {/* 연령 등급 */}
                  <SgDsLibraryStack direction="column" gap="xs">
                    <SgDsLibraryStack justify="between" direction="row" align="end" gap="xs" width="auto">
                      <SgDsLibraryText as="p" variant="heading-6" weight="bold">연령 등급</SgDsLibraryText>
                      <SgDsLibraryText as="span" variant="caption" tone="tertiary">플랫폼 정책 준수를 위해 필요합니다</SgDsLibraryText>
                    </SgDsLibraryStack>
                    <SgDsLibraryStack direction="row" gap="xs" wrap={true}>
                      {['전체', '12+', '15+', '19+'].map((rating, i) => (
                        i === 0 && selectedRating === 0 ? (
                          <SgDsLibraryBadge key={rating} status="success" variant="solid" size="xl" shape="pill" style={{ cursor: 'pointer' }} onClick={() => setSelectedRating(0)}>{rating}</SgDsLibraryBadge>
                        ) : (
                          <SgDsLibraryButton key={rating} shape="pill" size="sm" variant={selectedRating === i ? 'primary' : 'outline'} onClick={() => setSelectedRating(i)}>{rating}</SgDsLibraryButton>
                        )
                      ))}
                    </SgDsLibraryStack>
                  </SgDsLibraryStack>
                </SgDsLibraryStack>

                <SgDsLibraryDivider />
                <SgDsLibraryStack as="footer" direction="row" align="center" justify="center" gap="sm">
                  <SgDsLibraryButton variant="primary" shape="pill" size="lg" trailingIcon="arrow-right">다음 단계</SgDsLibraryButton>
                </SgDsLibraryStack>
              </SgDsLibraryStack>
            </SgDsLibraryStack>
          </SgDsLibraryStack>
        </SgDsLibraryStack>
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
