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
      manifest: {
        name: "가은",
        short_name: "가은",
        description: "가운데서 은혜를 베풀다",
        display: "standalone",
        theme_color: "#FFAF38",
        icons: [
          {
            src: "/icons/size-16.png",
            type: "image/png",
            sizes: "16x16",
          },
          {
            src: "/icons/size-48.png",
            type: "image/png",
            sizes: "48x48",
          },
          {
            src: "/icons/size-72.png",
            type: "image/png",
            sizes: "72x72",
          },
          {
            src: "/icons/size-128.png",
            type: "image/png",
            sizes: "128x128",
          },
          {
            src: "/icons/main-icon-144.png",
            type: "image/png",
            sizes: "144x144",
          },
          {
            src: "/icons/size-152.png",
            type: "image/png",
            sizes: "152x152",
          },
          {
            src: "/icons/main-icon-192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable"
          },
          {
            src: "/icons/main-icon-512.png",
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
    open: "/seller",
    host: "0.0.0.0",
  },
});