import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/family-calendar.ts',
      formats: ['es'],
      name: 'FamilyCalendar',
      fileName: 'family-calendar',
    },
    minify: true, 
    rollupOptions: {
      external: [], 
    }
  }
})