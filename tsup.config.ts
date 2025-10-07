import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts'
  ],
  outDir: 'dist',
  format: ['esm'],
  dts: false,
  clean: true,
});
