import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { defineConfig } from 'rollup';
import { readFileSync } from 'fs';

// Use `import` for the JSON file reading
const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
);

const globals = {
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
  'smoothscroll-polyfill': 'smoothscroll',
  'react/jsx-runtime': 'jsxRuntime'
};

export default defineConfig([
  {
    input: 'src/index.jsx',
    output: [
      {
        file: 'umd/react-web-chat.js',
        format: 'umd',
        name: 'ReactWebChat',
        globals,
        sourcemap: true,
        exports: 'named'
      },
      {
        file: 'umd/react-web-chat.min.js',
        format: 'umd',
        name: 'ReactWebChat',
        globals,
        plugins: [terser()],
        sourcemap: true,
        exports: 'named'
      },
      {
        file: 'dist/es/react-web-chat.js',
        format: 'es',
        sourcemap: true,
        exports: 'named',
        inlineDynamicImports: true
      },
      {
        file: 'dist/lib/react-web-chat.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist',
        sourceMap: true,
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: ['@babel/preset-react'],
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
        ],
      }),
      postcss({
        extract: 'umd/main.css',      // Place the CSS output in 'umd/main.css'
        minimize: true,               // Minify the CSS
        sourceMap: true,              // Enable source maps for CSS
        plugins: [
          require('autoprefixer')(),  // Optionally add autoprefixer
        ],
      }),
    ],
    external: Object.keys(globals),
  },
]);
