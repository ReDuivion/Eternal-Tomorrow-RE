import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        sourcemap: true,
      },
      devOptions: {
        enabled: true,
        /* other options */
      },
      manifest: {
        name: "Letter For Tomorrow",
        short_name: "L4T",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icons/gambar.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "icons/gambar.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        display: "standalone",
        scope: "/",
        start_url: "/",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
