import { defineConfig } from 'tsup'

export default defineConfig({
    format: ['esm', 'cjs'], // Output formats for CommonJS and ESM modules
    minify: true, // Whether to minify output
    clean: true, // Clean the output directory before building
    outDir: 'dist', // Output directory
    external: ['react', 'react-dom'],
    entry: ['./src/index.ts'],
    splitting: false,
})
