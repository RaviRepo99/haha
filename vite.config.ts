import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import VitePluginSitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: 'https://ccrcitclub.digital',
      dynamicRoutes: [
        '/',
        '/team',
        '/events',
        '/join',
        // Event detail pages will be added dynamically if needed
      ],
      exclude: ['/404'],
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild', // Use esbuild for faster builds
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React dependencies
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Animation library
          'framer-motion': ['framer-motion'],
          // Markdown rendering
          'markdown': ['react-markdown', 'remark-gfm'],
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false, // Faster builds
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react'], // Don't bundle lucide-react in dependencies
  },
})

