import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
        ],
      },
    }),
    dts({
      insertTypesEntry: true,
      skipDiagnostics: true, // Temporarily skip TS errors during build
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.jsx'),
      name: 'ReactWebChat',
      formats: ['es', 'umd'],
      fileName: (format, minified) => {
        if (format === 'es') {
          return minified ? 'react-web-chat.min.mjs' : 'react-web-chat.mjs';
        }
        return minified ? 'react-web-chat.min.js' : 'react-web-chat.js';
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-redux',
        'redux',
        'react-transition-group',
        'react-linkify',
        'react-markdown',
        'react-slick',
        'lodash',
        'recompose',
        'rwc-feersum-client',
        'smoothscroll-polyfill'
      ],
      output: [
        {
          format: 'umd',
          name: 'ReactWebChat',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-redux': 'ReactRedux',
            redux: 'Redux',
            'react-transition-group': 'ReactTransitionGroup',
            'react-linkify': 'Linkify',
            'react-markdown': 'ReactMarkdown',
            'react-slick': 'Slider',
            lodash: '_',
            recompose: 'Recompose',
            'rwc-feersum-client': 'FeersumClient',
            'smoothscroll-polyfill': 'smoothscroll'
          },
          minifyInternalExports: false,
        },
        {
          format: 'umd',
          name: 'ReactWebChat',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-redux': 'ReactRedux',
            redux: 'Redux',
            'react-transition-group': 'ReactTransitionGroup',
            'react-linkify': 'Linkify',
            'react-markdown': 'ReactMarkdown',
            'react-slick': 'Slider',
            lodash: '_',
            recompose: 'Recompose',
            'rwc-feersum-client': 'FeersumClient',
            'smoothscroll-polyfill': 'smoothscroll'
          },
          minifyInternalExports: true,
        },
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
        }
      ],
    },
    minify: true,
    sourcemap: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
}); 