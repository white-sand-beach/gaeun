import million from "million/compiler";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    million.vite({ auto: true }),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // 개발 환경에서 자동으로 service-worker 생성해줌
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "가은-가운데서 은혜를 베풀다",
        short_name: "가은-나눔",
        description: "가운데서 은혜를 베풀다",
        display: "standalone",
        theme_color: "#FFAF38",
        icons: [
          {
            src: "/icons/main-icon-16.png",
            sizes: "16x16",
          },
          {
            src: "/icons/main-icon-48.png",
            sizes: "48x48",
          },
          {
            src: "/icons/main-icon-72.png",
            sizes: "72x72",
          },
          {
            src: "/icons/main-icon-128.png",
            sizes: "128x128",
          },
          {
            src: "/icons/main-icon-144.png",
            sizes: "144x144",
          },
          {
            src: "/icons/main-icon-152.png",
            sizes: "152x152",
          },
          {
            src: "/icons/main-icon-192.png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/icons/main-icon-512.png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    host: "0.0.0.0",
    open: "/consumer/login",
  },
});
