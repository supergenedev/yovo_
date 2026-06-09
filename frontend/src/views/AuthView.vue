<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Stack,
  Input,
  Button,
  Text,
  Alert,
  Tabs,
  TabsList,
  Tab,
  TabsPanel,
} from '@/components'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref('login')

// Login form
const loginEmail = ref('')
const loginPassword = ref('')
const loginError = ref('')
const loginLoading = ref(false)

// Signup form
const signupEmail = ref('')
const signupPassword = ref('')
const signupNickname = ref('')
const signupError = ref('')
const signupLoading = ref(false)

async function handleLogin() {
  loginError.value = ''
  loginLoading.value = true
  try {
    await authStore.login(loginEmail.value, loginPassword.value)
    router.push('/')
  } catch (e) {
    loginError.value = e?.data?.message ?? e?.message ?? '로그인에 실패했습니다.'
  } finally {
    loginLoading.value = false
  }
}

async function handleSignup() {
  signupError.value = ''
  signupLoading.value = true
  try {
    await authStore.signup(signupEmail.value, signupPassword.value, signupNickname.value)
    router.push('/')
  } catch (e) {
    signupError.value = e?.data?.message ?? e?.message ?? '회원가입에 실패했습니다.'
  } finally {
    signupLoading.value = false
  }
}
</script>

<template>
  <Stack
    direction="column"
    align="center"
    justify="center"
    :style="{ minHeight: '100vh', width: '100%', background: 'var(--ds-color-background-default)' }"
  >
    <Stack
      direction="column"
      align="stretch"
      gap="xl"
      padding="2xl"
      :style="{
        width: '100%',
        maxWidth: '400px',
        borderRadius: 'var(--ds-radius-lg)',
        border: '1px solid var(--ds-color-border-default)',
        background: 'var(--ds-color-background-surface)',
      }"
    >
      <!-- Brand -->
      <Stack direction="column" align="center" gap="xs">
        <Text as="h1" variant="heading-2" weight="bold" :style="{ letterSpacing: '-0.02em' }">
          YOVO
        </Text>
        <Text as="p" variant="body-sm" tone="secondary">
          크리에이터와 팬이 함께 만드는 공간
        </Text>
      </Stack>

      <!-- Tabs -->
      <Tabs variant="underline" size="md">
        <TabsList label="인증">
          <Tab :selected="activeTab === 'login'" @click="activeTab = 'login'">로그인</Tab>
          <Tab :selected="activeTab === 'signup'" @click="activeTab = 'signup'">회원가입</Tab>
        </TabsList>

        <!-- Login Panel -->
        <TabsPanel :selected="activeTab === 'login'">
          <Stack direction="column" align="stretch" gap="md" :style="{ paddingTop: 'var(--ds-spacing-space-4)' }">
            <Alert
              v-if="loginError"
              status="danger"
              :message="loginError"
            />
            <Input
              v-model="loginEmail"
              type="email"
              label="이메일"
              placeholder="hello@example.com"
              labelPosition="outside"
              size="md"
            />
            <Input
              v-model="loginPassword"
              type="password"
              label="비밀번호"
              placeholder="비밀번호 입력"
              labelPosition="outside"
              size="md"
            />
            <Button
              variant="primary"
              size="md"
              label="로그인"
              :disabled="loginLoading"
              :loading="loginLoading"
              :style="{ width: '100%' }"
              @click="handleLogin"
            />
          </Stack>
        </TabsPanel>

        <!-- Signup Panel -->
        <TabsPanel :selected="activeTab === 'signup'">
          <Stack direction="column" align="stretch" gap="md" :style="{ paddingTop: 'var(--ds-spacing-space-4)' }">
            <Alert
              v-if="signupError"
              status="danger"
              :message="signupError"
            />
            <Input
              v-model="signupNickname"
              type="text"
              label="닉네임"
              placeholder="활동명을 입력하세요"
              labelPosition="outside"
              size="md"
            />
            <Input
              v-model="signupEmail"
              type="email"
              label="이메일"
              placeholder="hello@example.com"
              labelPosition="outside"
              size="md"
            />
            <Input
              v-model="signupPassword"
              type="password"
              label="비밀번호"
              placeholder="8자 이상 입력"
              labelPosition="outside"
              size="md"
            />
            <Button
              variant="primary"
              size="md"
              label="회원가입"
              :disabled="signupLoading"
              :loading="signupLoading"
              :style="{ width: '100%' }"
              @click="handleSignup"
            />
          </Stack>
        </TabsPanel>
      </Tabs>
    </Stack>
  </Stack>
</template>
