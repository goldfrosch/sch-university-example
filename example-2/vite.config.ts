import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "http://ec2-43-203-233-67.ap-northeast-2.compute.amazonaws.com:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/api/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
