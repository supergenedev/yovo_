import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SgDsLibraryStack,
  SgDsLibraryText,
  SgDsLibraryButton,
  SgDsLibraryInput,
  SgDsLibraryTextarea,
  SgDsLibrarySelect,
  SgDsLibraryDivider,
  SgDsLibraryCard,
  SgDsLibraryAlert,
  SgDsLibraryBadge,
  SgDsLibraryMedia,
} from '@/libraries/sg-ds-library/components'
import { useStudioStore, type CreatePostInput } from '@/stores/studio'
import { useMeStore } from '@/stores/me'
import { extractVideoFrame } from '@/lib/videoThumbnail'

interface FilePreview {
  name: string
  kind: 'image' | 'video'
  url: string          // 미리보기 objectURL ('' 이면 생성 중)
  thumbBlob?: Blob     // 동영상에서 추출한 썸네일(업로드에 포함)
}

const CONTENT_TYPES = [
  { label: '영상', value: 'video' },
  { label: '에피소드', value: 'episode' },
  { label: '이미지', value: 'image' },
  { label: '텍스트', value: 'text' },
]

const VIEW_TYPES = [
  { label: '전체 공개', value: 'everyone' },
  { label: '서포터 전용', value: 'subscriber_only' },
  { label: '구매자 전용 (유료)', value: 'buyer_only' },
]

export default function PostComposerPage() {
  const navigate = useNavigate()
  const studio = useStudioStore()
  const me = useMeStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [contentType, setContentType] = useState<CreatePostInput['content_type']>('video')
  const [viewType, setViewType] = useState<CreatePostInput['view_type']>('everyone')
  const [price, setPrice] = useState('100')
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<FilePreview[]>([])
  const [feedback, setFeedback] = useState<{ status: 'success' | 'danger' | 'info'; message: string } | null>(null)

  const creator = me.user?.creator_user

  useEffect(() => {
    if (!me.user) me.fetchMe()
  }, [])

  // 활성 크리에이터만 업로드 가능 — 그 외에는 안내 후 막는다.
  const canPost = creator?.status === 'active'

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files ?? [])
    setFiles(list)
    // 이전 미리보기 URL 정리(메모리 누수 방지)
    setPreviews((prev) => { prev.forEach((p) => p.url && URL.revokeObjectURL(p.url)); return prev })

    const next: FilePreview[] = list.map((f) => {
      const kind = f.type.startsWith('video/') ? 'video' : 'image'
      return { name: f.name, kind, url: kind === 'image' ? URL.createObjectURL(f) : '' }
    })
    setPreviews(next)

    // 동영상은 비동기로 중간 랜덤 프레임을 추출해 썸네일을 채운다
    list.forEach((f, i) => {
      if (!f.type.startsWith('video/')) return
      extractVideoFrame(f)
        .then(({ url, blob }) => {
          setPreviews((prev) => prev.map((p, idx) => (idx === i ? { ...p, url, thumbBlob: blob } : p)))
        })
        .catch(() => {
          // 추출 실패 시 미리보기는 비워두되 업로드는 그대로 진행
          setPreviews((prev) => prev.map((p, idx) => (idx === i ? { ...p, url: 'failed' } : p)))
        })
    })
  }

  async function handleSubmit(status: 'draft' | 'published') {
    setFeedback(null)
    if (!title.trim()) {
      setFeedback({ status: 'danger', message: '제목을 입력해주세요.' })
      return
    }
    try {
      // 동영상에서 추출한 썸네일을 이미지로 함께 업로드 → 피드/VIDEO 카드 썸네일로 사용
      const thumbFiles = previews
        .filter((p) => p.kind === 'video' && p.thumbBlob)
        .map((p, idx) => new File([p.thumbBlob as Blob], `thumb-${idx}.jpg`, { type: 'image/jpeg' }))

      await studio.createPost({
        title_ko: title.trim(),
        body_ko: body.trim() || undefined,
        content_type: contentType,
        view_type: viewType,
        content_price: viewType === 'buyer_only' ? Number(price) || 0 : undefined,
        status,
        media: [...files, ...thumbFiles],
      })
      setFeedback({ status: 'success', message: status === 'published' ? '포스트가 게시되었습니다!' : '임시 저장되었습니다.' })
      // 게시 직후 내 크리에이터 페이지로 이동
      setTimeout(() => navigate(creator ? `/creator/${creator.id}` : '/'), 700)
    } catch (e: any) {
      setFeedback({ status: 'danger', message: e?.data?.error ?? e?.data?.message ?? '업로드에 실패했습니다.' })
    }
  }

  return (
    <SgDsLibraryStack
      as="main"
      direction="column"
      align="center"
      justify="start"
      gap="none"
      style={{ height: '100%', width: '100%', overflow: 'auto', padding: 'var(--ds-spacing-space-4)' }}
    >
      <SgDsLibraryStack direction="column" gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        {/* 헤더 */}
        <SgDsLibraryStack direction="row" align="center" justify="between" style={{ width: '100%' }}>
          <SgDsLibraryStack direction="column" gap="xxs">
            <SgDsLibraryText as="h1" variant="heading-1" weight="bold">새 포스트</SgDsLibraryText>
            <SgDsLibraryText as="p" variant="body-sm" tone="tertiary">작품을 업로드하고 팬과 공유하세요.</SgDsLibraryText>
          </SgDsLibraryStack>
          <SgDsLibraryButton variant="soft" size="sm" leadingIcon="x" onClick={() => navigate(-1)}>닫기</SgDsLibraryButton>
        </SgDsLibraryStack>

        {feedback && <SgDsLibraryAlert status={feedback.status} message={feedback.message} />}

        {!canPost ? (
          <SgDsLibraryCard variant="outline" padding="lg" gap="md">
            <SgDsLibraryText as="p" variant="body" weight="bold">크리에이터만 포스트를 올릴 수 있어요</SgDsLibraryText>
            <SgDsLibraryText as="p" variant="body-sm" tone="tertiary">
              {creator?.status === 'pending'
                ? '크리에이터 신청이 접수되어 심사 중입니다. 운영진 승인 후 업로드할 수 있어요.'
                : '내 프로필에서 크리에이터로 전환을 신청하세요. 운영진 승인 후 활동할 수 있습니다.'}
            </SgDsLibraryText>
            <SgDsLibraryButton variant="primary" size="md" leadingIcon="user-star" onClick={() => navigate('/me')}>
              내 프로필로 이동
            </SgDsLibraryButton>
          </SgDsLibraryCard>
        ) : (
          <SgDsLibraryStack direction="column" gap="lg" style={{ width: '100%' }}>
            {/* 제목 */}
            <SgDsLibraryStack direction="column" gap="xs">
              <SgDsLibraryText as="p" variant="body" weight="bold">제목</SgDsLibraryText>
              <SgDsLibraryInput
                size="lg"
                placeholder="작품 제목을 입력하세요"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
            </SgDsLibraryStack>

            {/* 내용 */}
            <SgDsLibraryStack direction="column" gap="xs">
              <SgDsLibraryText as="p" variant="body" weight="bold">내용</SgDsLibraryText>
              <SgDsLibraryTextarea
                rows={5}
                placeholder="작품 설명을 입력하세요"
                value={body}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
              />
            </SgDsLibraryStack>

            <SgDsLibraryDivider label="분류" labelPosition="left" />

            {/* 콘텐츠 타입 */}
            <SgDsLibraryStack direction="column" gap="xs">
              <SgDsLibraryText as="p" variant="body" weight="bold">콘텐츠 타입</SgDsLibraryText>
              <SgDsLibrarySelect
                size="lg"
                options={CONTENT_TYPES}
                value={contentType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setContentType(e.target.value as CreatePostInput['content_type'])}
              />
            </SgDsLibraryStack>

            {/* 공개 범위 */}
            <SgDsLibraryStack direction="column" gap="xs">
              <SgDsLibraryText as="p" variant="body" weight="bold">공개 범위</SgDsLibraryText>
              <SgDsLibrarySelect
                size="lg"
                options={VIEW_TYPES}
                value={viewType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setViewType(e.target.value as CreatePostInput['view_type'])}
              />
            </SgDsLibraryStack>

            {/* 가격 (구매자 전용일 때만) */}
            {viewType === 'buyer_only' && (
              <SgDsLibraryStack direction="column" gap="xs">
                <SgDsLibraryStack direction="row" align="center" gap="xs">
                  <SgDsLibraryText as="p" variant="body" weight="bold">가격</SgDsLibraryText>
                  <SgDsLibraryBadge status="warning" variant="subtle" size="sm" shape="pill">코인</SgDsLibraryBadge>
                </SgDsLibraryStack>
                <SgDsLibraryInput
                  size="lg"
                  type="number"
                  placeholder="100"
                  value={price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                />
              </SgDsLibraryStack>
            )}

            <SgDsLibraryDivider label="미디어" labelPosition="left" />

            {/* 미디어 첨부 */}
            <SgDsLibraryStack direction="column" gap="xs">
              <SgDsLibraryText as="p" variant="body" weight="bold">파일 첨부</SgDsLibraryText>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleFiles}
              />
              <SgDsLibraryButton variant="outline" size="md" leadingIcon="upload" onClick={() => fileInputRef.current?.click()}>
                이미지 / 영상 선택
              </SgDsLibraryButton>
              {previews.length > 0 && (
                <SgDsLibraryStack direction="row" gap="sm" wrap={true}>
                  {previews.map((p, i) => (
                    <div key={i} style={{ position: 'relative', width: '96px', height: '96px' }}>
                      {p.url && p.url !== 'failed' ? (
                        <>
                          <SgDsLibraryMedia
                            src={p.url}
                            rounded="md"
                            aspectRatio="1 / 1"
                            fit="cover"
                            style={{ width: '96px', height: '96px' }}
                          />
                          {p.kind === 'video' && (
                            <SgDsLibraryBadge
                              status="neutral"
                              variant="solid"
                              size="sm"
                              shape="pill"
                              icon="play"
                              style={{ position: 'absolute', left: '4px', bottom: '4px' }}
                            >
                              영상
                            </SgDsLibraryBadge>
                          )}
                        </>
                      ) : (
                        <SgDsLibraryCard variant="outline" padding="sm" style={{ width: '96px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <SgDsLibraryText as="span" variant="caption" tone="tertiary" align="center">
                            {p.url === 'failed' ? p.name : '썸네일 생성 중…'}
                          </SgDsLibraryText>
                        </SgDsLibraryCard>
                      )}
                    </div>
                  ))}
                </SgDsLibraryStack>
              )}
            </SgDsLibraryStack>

            <SgDsLibraryDivider />

            {/* 액션 */}
            <SgDsLibraryStack direction="row" align="center" justify="end" gap="sm">
              <SgDsLibraryButton variant="secondary" shape="pill" size="lg" disabled={studio.submitting} onClick={() => handleSubmit('draft')}>
                임시 저장
              </SgDsLibraryButton>
              <SgDsLibraryButton variant="primary" shape="pill" size="lg" trailingIcon="arrow-up" disabled={studio.submitting} onClick={() => handleSubmit('published')}>
                {studio.submitting ? '게시 중…' : '게시하기'}
              </SgDsLibraryButton>
            </SgDsLibraryStack>
          </SgDsLibraryStack>
        )}
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
