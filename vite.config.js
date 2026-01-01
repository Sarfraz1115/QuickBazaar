import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      // 🔥 Auto update SW when new build is available
      registerType: "autoUpdate",

      // 🔥 Force new SW to take control immediately
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },

      // 🔥 PWA behaviour
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "masked-icon.svg",
      ],

      manifest: {
        name: "QuickKirana",
        short_name: "QuickKirana",
        description: "Your Online Grocery Store",
        theme_color: "#2e7d32",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/icons/192icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/512icon.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/512icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      // 🔥 Dev mode me SW disable (warna headache hota hai)
      devOptions: {
        enabled: false,
      },
    }),
  ],

  // Optional but recommended
  server: {
    port: 5173,
  },

  build: {
    sourcemap: false,
  },
});
