import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: 'src-modern',
  publicDir: '../public-assets',
  base: './',

  build: {
    outDir: '../dist-modern',
    emptyOutDir: true,
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    minify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src-modern/index.html'),
      },

      output: {
        // Manual chunk splitting for better caching
        manualChunks(id) {
          if (id.includes('node_modules/bootstrap/') || id.includes('node_modules/@popperjs/core/')) {
            return 'vendor-bootstrap';
          }
          // Chart.js core + the treemap controller. chartjs-plugin-zoom (and
          // hammerjs) is left out on purpose: only the reports page uses it,
          // so it stays in that page's chunk.
          if (
            id.includes('node_modules/chart.js/') ||
            id.includes('node_modules/@kurkle/color/') ||
            id.includes('node_modules/chartjs-chart-treemap/')
          ) {
            return 'vendor-charts';
          }
          if (id.includes('node_modules/alpinejs/') || id.includes('node_modules/sweetalert2/')) {
            return 'vendor-ui';
          }
        },
        // Asset naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },

  server: {
    port: 3000,
    open: true,
    // Enable CORS for development
    cors: true,
  },

  preview: {
    port: 4173,
    open: true,
  },

  css: {
    // Enable CSS source maps in development
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'if-function'],
      },
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src-modern'),
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-icons': resolve(__dirname, 'node_modules/bootstrap-icons'),
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['bootstrap', 'alpinejs', 'chart.js', 'chartjs-chart-treemap', 'chartjs-plugin-zoom', 'sweetalert2'],
  },

  esbuild: {
    // Strip console.* and debugger statements from production bundles
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
});
