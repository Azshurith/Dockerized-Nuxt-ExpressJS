import tailwindcss from "@tailwindcss/vite";

// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: 'src/',
  ssr: true,
  css: ['@/assets/css/main.css'],
  runtimeConfig: {
    public: {
      port: Number(process.env.NUXT_PORT) || 3000,
      express: Number(process.env.EXPRESS_PORT) || 4000
    }
  },
  devServer: {
    port: Number(process.env.NUXT_PORT) || 3000
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
