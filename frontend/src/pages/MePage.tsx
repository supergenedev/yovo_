import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SgDsLibraryStack,
  SgDsLibraryText,
  SgDsLibraryCard,
  SgDsLibraryInput,
  SgDsLibraryTextarea,
  SgDsLibraryButton,
  SgDsLibraryAlert,
  SgDsLibraryAvatar,
  SgDsLibraryBadge,
  SgDsLibraryStat,
  SgDsLibraryStatList,
  SgDsLibraryDivider,
} from '@/libraries/sg-ds-library/components'
import { useMeStore } from '@/stores/me'

export default function MePage() {
  const navigate = useNavigate()
  const me = useMeStore()

  const [nickname, setNickname] = useState('')
  const [username, setUsername] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ status: 'success' | 'danger'; message: string } | null>(null)
  const [applying, setApplying] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    me.fetchMe()
    me.fetchCoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 서버 값 도착 시 폼 초기화 (편집 중에는 덮어쓰지 않도록 최초 1회만)
  const initialized = useRef(false)
  useEffect(() => {
    if (me.user && !initialized.current) {
      initialized.current = true
      setNickname(me.user.nickname ?? '')
      setUsername(me.user.username ?? '')
      setIntroduction(me.user.introduction ?? '')
    }
  }, [me.user])

  async function handleSave() {
    setSaving(true)
    setFeedback(null)
    try {
      await me.updateMe({ nickname, username, introduction })
      setFeedback({ status: 'success', message: '프로필이 저장되었습니다.' })
    } catch (e: any) {
      setFeedback({ status: 'danger', message: e?.data?.message ?? '저장에 실패했습니다.' })
    } finally {
      setSaving(false)
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFeedback(null)
    try {
      await me.uploadProfileImage(file)
      setFeedback({ status: 'success', message: '프로필 사진이 변경되었습니다.' })
    } catch {
      setFeedback({ status: 'danger', message: '사진 업로드에 실패했습니다.' })
    } finally {
      e.target.value = ''
    }
  }

  async function handleApplyCreator() {
    setApplying(true)
    setFeedback(null)
    try {
      await me.applyCreator()
      setFeedback({ status: 'success', message: '크리에이터 신청이 접수되었습니다. 승인 후 활동할 수 있어요.' })
    } catch (e: any) {
      setFeedback({ status: 'danger', message: e?.data?.message ?? '신청에 실패했습니다.' })
    } finally {
      setApplying(false)
    }
  }

  const creator = me.user?.creator_user
  const getInitials = (name?: string | null) => (name ? name.trim().slice(0, 2).toUpperCase() : 'ME')

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }} data-wb-bg-token="surface-page">
      <SgDsLibraryStack
        direction="column"
        gap="xl"
        style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--ds-spacing-space-8) var(--ds-spacing-space-6)' }}
      >
        <SgDsLibraryText as="h1" variant="heading-2" weight="bold">내 프로필</SgDsLibraryText>

        {feedback && <SgDsLibraryAlert status={feedback.status} message={feedback.message} />}

        {/* 프로필 헤더: 아바타 + 코인/팔로잉 요약 */}
        <SgDsLibraryCard variant="outline" padding="lg">
          <SgDsLibraryStack direction="row" align="center" gap="lg" wrap={true}>
            <SgDsLibraryStack direction="column" align="center" gap="sm" style={{ width: 'auto' }}>
              <SgDsLibraryAvatar
                size="xl"
                src={me.user?.profile_image ?? undefined}
                initials={getInitials(me.user?.nickname)}
                tone="brand"
                alt={me.user?.nickname ?? ''}
              />
              <SgDsLibraryButton variant="ghost" size="sm" leadingIcon="camera" onClick={() => fileInputRef.current?.click()}>
                사진 변경
              </SgDsLibraryButton>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            </SgDsLibraryStack>

            <SgDsLibraryStack direction="column" gap="sm" style={{ flex: '1 1 0%', minWidth: '240px' }}>
              <SgDsLibraryStack direction="row" align="center" gap="sm">
                <SgDsLibraryText as="h2" variant="heading-3" weight="bold">{me.user?.nickname ?? ''}</SgDsLibraryText>
                {creator?.status === 'active' && <SgDsLibraryBadge status="success" variant="subtle">크리에이터</SgDsLibraryBadge>}
                {creator?.status === 'pending' && <SgDsLibraryBadge status="warning" variant="subtle">크리에이터 심사 중</SgDsLibraryBadge>}
              </SgDsLibraryStack>
              <SgDsLibraryText as="p" variant="body-sm" tone="secondary">
                {me.user?.username ? `@${me.user.username}` : '유저명 미설정'}
              </SgDsLibraryText>
              <SgDsLibraryStatList size="sm" style={{ width: 'fit-content' }}>
                <SgDsLibraryStat icon="gem" value={String(me.coin ?? 0)} label="코인" />
                <SgDsLibraryStat icon="users" value={String(me.user?.followings_count ?? 0)} label="팔로잉" />
              </SgDsLibraryStatList>
            </SgDsLibraryStack>
          </SgDsLibraryStack>
        </SgDsLibraryCard>

        {/* 프로필 수정 */}
        <SgDsLibraryCard variant="outline" padding="lg">
          <SgDsLibraryStack direction="column" gap="md">
            <SgDsLibraryText as="h3" variant="heading-4" weight="semibold">프로필 수정</SgDsLibraryText>
            <SgDsLibraryInput
              label="닉네임"
              labelPosition="outside"
              size="md"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임"
            />
            <SgDsLibraryInput
              label="유저명"
              labelPosition="outside"
              size="md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="영문 소문자/숫자 (프로필 URL에 사용)"
              description="@아이디 형태로 표시됩니다"
            />
            <SgDsLibraryStack direction="column" gap="xs">
              <SgDsLibraryText as="label" variant="body-sm" weight="medium">소개</SgDsLibraryText>
              <SgDsLibraryTextarea
                size="md"
                rows={4}
                maxLength={1000}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="자기소개를 입력하세요"
              />
            </SgDsLibraryStack>
            <SgDsLibraryStack direction="row" justify="end">
              <SgDsLibraryButton variant="primary" size="md" onClick={handleSave} disabled={saving || !nickname.trim()}>
                {saving ? '저장 중…' : '저장'}
              </SgDsLibraryButton>
            </SgDsLibraryStack>
          </SgDsLibraryStack>
        </SgDsLibraryCard>

        {/* 크리에이터 */}
        <SgDsLibraryCard variant="outline" padding="lg">
          <SgDsLibraryStack direction="column" gap="md">
            <SgDsLibraryText as="h3" variant="heading-4" weight="semibold">크리에이터</SgDsLibraryText>
            {!creator && (
              <>
                <SgDsLibraryText as="p" variant="body-sm" tone="secondary">
                  작품을 올리고 팬과 소통하려면 크리에이터로 전환하세요. 운영진 승인 후 활동할 수 있습니다.
                </SgDsLibraryText>
                <SgDsLibraryStack direction="row">
                  <SgDsLibraryButton variant="primary" size="md" leadingIcon="user-star" onClick={handleApplyCreator} disabled={applying}>
                    {applying ? '신청 중…' : '크리에이터 신청'}
                  </SgDsLibraryButton>
                </SgDsLibraryStack>
              </>
            )}
            {creator?.status === 'pending' && (
              <SgDsLibraryAlert status="info" message="크리에이터 신청이 접수되어 심사 중입니다. 승인되면 알려드릴게요." />
            )}
            {creator?.status === 'active' && (
              <SgDsLibraryStack direction="row" align="center" gap="sm" wrap={true}>
                <SgDsLibraryText as="p" variant="body-sm" tone="secondary" style={{ flex: '1 1 0%' }}>
                  크리에이터로 활동 중입니다.
                </SgDsLibraryText>
                <SgDsLibraryButton variant="primary" size="sm" leadingIcon="square-pen" onClick={() => navigate('/studio/new')}>
                  새 포스트
                </SgDsLibraryButton>
                <SgDsLibraryButton variant="soft" size="sm" trailingIcon="chevron-right" onClick={() => navigate(`/creator/${creator.id}`)}>
                  내 크리에이터 프로필
                </SgDsLibraryButton>
              </SgDsLibraryStack>
            )}
            {creator?.status === 'inactive' && (
              <SgDsLibraryAlert status="warning" message="크리에이터 활동이 비활성화된 상태입니다. 고객센터에 문의하세요." />
            )}
          </SgDsLibraryStack>
        </SgDsLibraryCard>

        <SgDsLibraryDivider />
        <SgDsLibraryText as="p" variant="caption" tone="tertiary" style={{ textAlign: 'center' }}>
          코인 충전은 결제 연동 후 제공될 예정입니다.
        </SgDsLibraryText>
      </SgDsLibraryStack>
    </div>
  )
}
