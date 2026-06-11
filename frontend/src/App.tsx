import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/layouts/AppLayout'
import AuthPage from '@/pages/AuthPage'
import MainPage from '@/pages/MainPage'
import HomePage from '@/pages/HomePage'
import VideoMainPage from '@/pages/VideoMainPage'
import VideoPage from '@/pages/VideoPage'
import CreatorPage from '@/pages/CreatorPage'
import CreatorProfilePage from '@/pages/CreatorProfilePage'
import LibraryPage from '@/pages/LibraryPage'
import NotificationPage from '@/pages/NotificationPage'
import CreatePage from '@/pages/CreatePage'
import DmPage from '@/pages/DmPage'
import MePage from '@/pages/MePage'
import TwoColumnGuide from '@/pages/guide/TwoColumnGuide'
import ThreeColumnGuide from '@/pages/guide/ThreeColumnGuide'

// 로그인하지 않으면 /auth로 보낸다 (Vue 라우터 가드와 동일한 정책)
function RequireAuth() {
  const token = useAuthStore((s) => s.token)
  if (!token) return <Navigate to="/auth" replace />
  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<RequireAuth />}>
          {/* 네비게이션(사이드바)은 AppLayout에서 단 한 번만 렌더된다.
              페이지 컴포넌트는 절대 자체 사이드바/탭바를 렌더하지 않는다. */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/video" element={<VideoMainPage />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/creator" element={<CreatorPage />} />
            <Route path="/creator/:id" element={<CreatorProfilePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/dm" element={<DmPage />} />
            <Route path="/me" element={<MePage />} />
          </Route>
          <Route path="/guide/2col" element={<TwoColumnGuide />} />
          <Route path="/guide/3col" element={<ThreeColumnGuide />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
