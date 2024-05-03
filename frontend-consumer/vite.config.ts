import million from "million/compiler";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // 개발 환경에서 자동으로 service-worker 생성해줌
      // devOptions: {
      //   enabled: true,
      // },
      manifest: {
        name: "오늘잡슈",
        short_name: "오늘잡슈",
        description: "음식 당일 소진 장려 플랫폼",
        start_url: "/consumer",
        display: "standalone",
        theme_color: "#ffaf38",
        icons: [
          {
            src: "/icons/size-16.png",
            sizes: "16x16",
          },
          {
            src: "/icons/size-48.png",
            sizes: "48x48",
          },
          {
            src: "/icons/size-72.png",
            sizes: "72x72",
          },
          {
            src: "/icons/size-128.png",
            sizes: "128x128",
          },
          {
            src: "/icons/size-144.png",
            sizes: "144x144",
          },
          {
            src: "/icons/size-152.png",
            sizes: "152x152",
          },
          {
            src: "/icons/size-192.png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/icons/size-512.png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
