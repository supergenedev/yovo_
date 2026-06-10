import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

// lucide-static의 SVG를 /icons/{name}.svg 경로로 제공한다.
// sg-ds-library의 Icon 컴포넌트는 런타임에 이 URL을 fetch해 인라인 렌더링한다.
function lucideIcons(): Plugin {
  const iconsDir = fileURLToPath(new URL('./node_modules/lucide-static/icons', import.meta.url))
  return {
    name: 'lucide-icons',
    configureServer(server) {
      server.middlewares.use('/icons', (req, res, next) => {
        const name = (req.url ?? '').split('?')[0].replace(/^\//, '')
        if (!/^[a-z0-9-]+\.svg$/.test(name)) return next()
        fs.readFile(path.join(iconsDir, name), (err, data) => {
          if (err) return next()
          res.setHeader('Content-Type', 'image/svg+xml')
          res.setHeader('Cache-Control', 'public, max-age=86400')
          res.end(data)
        })
      })
    },
    closeBundle() {
      const out = fileURLToPath(new URL('./dist/icons', import.meta.url))
      if (!fs.existsSync(iconsDir)) return
      fs.mkdirSync(out, { recursive: true })
      for (const f of fs.readdirSync(iconsDir)) {
        if (f.endsWith('.svg')) fs.copyFileSync(path.join(iconsDir, f), path.join(out, f))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), lucideIcons()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
