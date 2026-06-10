import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SgDsLibraryStack,
  SgDsLibraryInput,
  SgDsLibraryButton,
  SgDsLibraryText,
  SgDsLibraryAlert,
  SgDsLibraryTabs,
  SgDsLibraryTabsList,
  SgDsLibraryTab,
  SgDsLibraryTabsPanel,
} from '@/libraries/sg-ds-library/components'
import { useAuthStore } from '@/stores/auth'

export default function AuthPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const signup = useAuthStore((s) => s.signup)

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupNickname, setSignupNickname] = useState('')
  const [signupError, setSignupError] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    try {
      await login(loginEmail, loginPassword)
      navigate('/')
    } catch (err: any) {
      setLoginError(err?.data?.message ?? err?.message ?? '로그인에 실패했습니다.')
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleSignup(e: FormEvent) {
    e.preventDefault()
    setSignupError('')
    setSignupLoading(true)
    try {
      await signup(signupEmail, signupPassword, signupNickname)
      navigate('/')
    } catch (err: any) {
      setSignupError(err?.data?.message ?? err?.message ?? '회원가입에 실패했습니다.')
    } finally {
      setSignupLoading(false)
    }
  }

  return (
    <SgDsLibraryStack
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: '100vh', width: '100%' }}
    >
      <SgDsLibraryStack
        direction="column"
        align="stretch"
        gap="xl"
        padding="2xl"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '16px',
          border: '1px solid var(--ds-token-sg-ds-library-semantic-color-border-default, #e2e8f0)',
          background: 'var(--ds-token-sg-ds-library-semantic-color-surface-card)',
        }}
      >
        <SgDsLibraryStack direction="column" align="center" gap="xs">
          <SgDsLibraryText as="h1" variant="heading-2" weight="bold" style={{ letterSpacing: '-0.02em' }}>
            YOVO
          </SgDsLibraryText>
          <SgDsLibraryText as="p" variant="body-sm" tone="secondary">
            크리에이터와 팬이 함께 만드는 공간
          </SgDsLibraryText>
        </SgDsLibraryStack>

        <SgDsLibraryTabs variant="underline" size="md">
          <SgDsLibraryTabsList label="인증">
            <SgDsLibraryTab selected={activeTab === 'login'} onClick={() => setActiveTab('login')}>
              로그인
            </SgDsLibraryTab>
            <SgDsLibraryTab selected={activeTab === 'signup'} onClick={() => setActiveTab('signup')}>
              회원가입
            </SgDsLibraryTab>
          </SgDsLibraryTabsList>

          <SgDsLibraryTabsPanel selected={activeTab === 'login'}>
            <form onSubmit={handleLogin}>
              <SgDsLibraryStack direction="column" align="stretch" gap="md" style={{ paddingTop: 'var(--ds-spacing-space-4)' }}>
                {loginError && <SgDsLibraryAlert status="danger" message={loginError} />}
                <SgDsLibraryInput
                  type="email"
                  label="이메일"
                  placeholder="hello@example.com"
                  labelPosition="outside"
                  size="md"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <SgDsLibraryInput
                  type="password"
                  label="비밀번호"
                  placeholder="비밀번호 입력"
                  labelPosition="outside"
                  size="md"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <SgDsLibraryButton type="submit" variant="primary" size="md" label={loginLoading ? '로그인 중…' : '로그인'} disabled={loginLoading} />
              </SgDsLibraryStack>
            </form>
          </SgDsLibraryTabsPanel>

          <SgDsLibraryTabsPanel selected={activeTab === 'signup'}>
            <form onSubmit={handleSignup}>
              <SgDsLibraryStack direction="column" align="stretch" gap="md" style={{ paddingTop: 'var(--ds-spacing-space-4)' }}>
                {signupError && <SgDsLibraryAlert status="danger" message={signupError} />}
                <SgDsLibraryInput
                  type="text"
                  label="닉네임"
                  placeholder="닉네임 입력"
                  labelPosition="outside"
                  size="md"
                  value={signupNickname}
                  onChange={(e) => setSignupNickname(e.target.value)}
                />
                <SgDsLibraryInput
                  type="email"
                  label="이메일"
                  placeholder="hello@example.com"
                  labelPosition="outside"
                  size="md"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                <SgDsLibraryInput
                  type="password"
                  label="비밀번호"
                  placeholder="6자 이상"
                  labelPosition="outside"
                  size="md"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <SgDsLibraryButton type="submit" variant="primary" size="md" label={signupLoading ? '가입 중…' : '회원가입'} disabled={signupLoading} />
              </SgDsLibraryStack>
            </form>
          </SgDsLibraryTabsPanel>
        </SgDsLibraryTabs>
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
