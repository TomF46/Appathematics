import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  base: `/Appathematics/`,
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Appathematics',
        short_name: 'Appathematics',
        description: "Appathematics a quick fire maths game..",
        theme_color: '#219ff4',
        icons: [
          {
            src: '/Appathematics/img/icons/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/Appathematics/img/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/Appathematics/img/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/Appathematics/img/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/Appathematics/img/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/Appathematics/img/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/Appathematics/img/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/Appathematics/img/icons/icon-284x284.png',
            sizes: '284x284',
            type: 'image/png'
          },
          {
            src: '/Appathematics/img/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/Appathematics/img/icons/maskable_icon_x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: "maskable"
          },
          {
            src: '/Appathematics/img/icons/maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: "maskable"
          },
          {
            src: '/Appathematics/img/icons/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: "maskable"
          },
        ]
      }
    })
  ],
})
