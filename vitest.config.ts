import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Reine Rechenlogik - kein DOM noetig, und ohne ist es ehrlicher:
    // Was hier faellt, faellt an der Logik und nicht an einer Attrappe.
    environment: 'node',
    // Die Module sind frei von globalem Zustand; eigene Prozesse je Datei
    // kosten hier mehr Zeit als sie an Sicherheit bringen.
    isolate: false,
    include: ['tests/js/**/*.test.ts'],
    setupFiles: ['tests/js/setup.ts'],
  },
});
