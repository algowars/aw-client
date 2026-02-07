import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['projects/web/src/**/*.{spec,test}.{ts,tsx}'],
    exclude: [
      '**/types/**',
      '**/constants/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
    ],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      include: ['projects/web/src/**'],
      exclude: [
        '**/types/**',
        '**/constants/**',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },
    },
  },
});
