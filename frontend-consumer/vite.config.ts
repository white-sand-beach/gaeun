import million from "million/compiler";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [million.vite({ auto: true }), react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
});
