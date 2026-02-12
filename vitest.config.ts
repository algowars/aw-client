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
        '**/environments/**',
        'app.config.ts',
        'app.routes.ts',
        'index.html',
        'main.ts',
        'theme.ts',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
