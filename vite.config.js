import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "QuickKirana",
        short_name: "QuickKirana",
        description: "Your Online Grocery Store",
        theme_color: "#2e7d32",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/192icon.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/512icon.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
