# YOVO Frontend (React)

React 19 + TypeScript + Vite 기반 프론트엔드.

## 스택
- **UI**: sg-ds-library (src/libraries/ — NEW SG Design System Test에서 복사한 React 컴포넌트)
- **라우팅**: react-router-dom v7 — 사이드바는 `src/layouts/AppLayout.tsx`에서 단 한 번만 렌더되고 페이지는 `<Outlet/>`으로 전환된다. 페이지 컴포넌트에 네비게이션을 넣지 말 것.
- **상태**: zustand (src/stores/) — Rails API 계약 포함
- **API**: src/lib/api.ts (ofetch, JWT Bearer, 401 시 토큰 폐기)

## 주의사항
- `sg-ds-library.css`의 모든 규칙은 `.sg-ds-library-scope` 자손 셀렉터로 스코프됨 → `index.html`의 `<body class="sg-ds-library-scope">`가 필수.
- 아이콘은 lucide-static을 `/icons/{name}.svg`로 서빙 (vite.config.ts의 lucideIcons 플러그인). 전역 맵은 `src/main.tsx`의 Proxy.
- Stack 컴포넌트는 기본 `width: 100%` — flex row 안에서 보조 영역에는 `width: 'auto'`를 명시할 것.

## 실행
```bash
npm install
npm run dev        # http://localhost:5173 (백엔드 프록시: localhost:3000)
npm run build      # dist/ (아이콘 포함)
npm run typecheck  # 라이브러리 자체의 기존 타입 오류는 무시, src/pages·stores·layouts 기준 0 유지
```

테스트 계정: `fan@seed.yovo.dev` / `Password1!` (backend db/seeds)
