import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/workbench-tokens.css'
import './libraries/sg-ds-library/components/sg-ds-library.css'
import './styles/app.css'

// sg-ds-library의 Icon은 이 전역 맵에서 아이콘 이름 → SVG URL을 해석한다.
// Proxy로 모든 이름을 /icons/{name}.svg 로 매핑한다 (vite 플러그인이 lucide-static 제공).
;(globalThis as Record<string, unknown>).__WORKBENCH_DEFAULT_ICON_SOURCES__ = new Proxy(
  {},
  {
    get: (_target, name) => (typeof name === 'string' ? `/icons/${name}.svg` : undefined),
    has: () => true,
  },
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
