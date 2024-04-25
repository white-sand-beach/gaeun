import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "오늘잡슈",
        short_name: "오늘잡슈",
        start_url: "/",
        display: "standalone",
        theme_color: "#FFAF38",
        icons: [
          {
            src: "/icons/size-16.png",
            sizes: "16x16"
          },
          {
            src: "/icons/size-16.png",
            sizes: "48x48"
          },
          {
            src: "/icons/size-16.png",
            sizes: "72x72"
          },
          {
            src: "/icons/size-16.png",
            sizes: "128x128"
          },
          {
            src: "/icons/size-16.png",
            sizes: "144x144"
          },
          {
            src: "/icons/size-16.png",
            sizes: "152x152"
          },
          {
            src: "/icons/size-16.png",
            sizes: "192x192",
            purpose: "maskable"
          },
          {
            src: "/icons/size-16.png",
            sizes: "512x512",
            purpose: "maskable"
          },
        ]
      }
    })
  ],
  server: {
    port: 5174
  }
})
