import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://homeassistant.local:8123',
        changeOrigin: true,
      }
    }
  },
  build: {
    lib: {
      entry: 'src/family-calendar.ts',
      formats: ['es'],
      name: 'FamilyCalendar',
      fileName: 'family-calendar',
    },
    outDir: 'custom_components/calendar_service_ext/www',
    emptyOutDir: true,
    minify: true, 
    rollupOptions: {
      external: [], 
    }
  }
})