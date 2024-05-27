import { defineConfig } from 'tsup'

export default defineConfig({
    format: ['cjs', 'esm'], // Output formats for CommonJS and ESM modules
    minify: false, // Whether to minify output
    clean: true, // Clean the output directory before building
    outDir: 'lib', // Output directory
    external: ['react', 'react-dom'],
    entry: ['./src/index.ts'],
    treeshake: true,
    splitting: false,
})
