import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { createRequire } from 'module';
import replace from '@rollup/plugin-replace';
import fs from 'fs';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const input = 'src/index.jsx';
const extensions = ['.js', '.jsx'];

// Get NODE_ENV from environment or default to production
const NODE_ENV = process.env.NODE_ENV || 'production';

// Enable sourcemaps only in development
const generateSourceMaps = NODE_ENV === 'development';

// External dependencies - only React and ReactDOM
const external = [
  'react',
  'react-dom'
];

// Plugin to handle .scss imports (makes them no-ops)
const ignoreScssImports = {
  name: 'ignore-scss-imports',
  resolveId(source) {
    if (source.endsWith('.scss')) {
      return source;
    }
    return null;
  },
  load(id) {
    if (id.endsWith('.scss')) {
      return '';
    }
    return null;
  }
};

// Shared plugins for all builds
const basePlugins = [
  ignoreScssImports,
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  resolve({ 
    extensions,
    browser: true,
    mainFields: ['browser', 'module', 'main']
  }),
  commonjs({
    include: /node_modules/,
    transformMixedEsModules: true
  }),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions,
    presets: [
      ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
      ['@babel/preset-react', { runtime: 'automatic' }]
    ]
  })
];

// Create directory structure
fs.mkdirSync('es', { recursive: true });
fs.mkdirSync('lib', { recursive: true });
fs.mkdirSync('umd', { recursive: true });

export default [
  // ESM build
  {
    input,
    output: {
      file: 'es/index.js',
      format: 'esm',
      sourcemap: generateSourceMaps,
      exports: 'named'
    },
    external,
    plugins: basePlugins
  },
  // CommonJS build
  {
    input,
    output: {
      file: 'lib/index.js',
      format: 'cjs',
      sourcemap: generateSourceMaps,
      exports: 'named'
    },
    external,
    plugins: basePlugins
  },
  // UMD build
  {
    input,
    output: {
      file: 'umd/react-web-chat.min.js',
      format: 'umd',
      name: 'ReactWebChat',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      },
      sourcemap: generateSourceMaps
    },
    external,
    plugins: [
      ...basePlugins,
      terser()
    ]
  }
]; 