import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // 개발 환경에서 자동으로 service-worker 생성해줌
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "빨리드셔-사장님",
        short_name: "빨리드셔-사장님",
        display: "standalone",
        theme_color: "#FFAF38",
        icons: [
          {
            src: "/icons/size-16.png",
            type: "image/png",
            sizes: "16x16"
          },
          {
            src: "/icons/size-48.png",
            type: "image/png",
            sizes: "48x48"
          },
          {
            src: "/icons/size-72.png",
            type: "image/png",
            sizes: "72x72"
          },
          {
            src: "/icons/size-128.png",
            type: "image/png",
            sizes: "128x128"
          },
          {
            src: "/icons/size-144.png",
            type: "image/png",
            sizes: "144x144"
          },
          {
            src: "/icons/size-152.png",
            type: "image/png",
            sizes: "152x152"
          },
          {
            src: "/icons/size-192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable"
          },
          {
            src: "/icons/size-512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
          },
        ]
      }
    })
  ],
  server: {
    port: 5174,
    host: "0.0.0.0",
  },
})
