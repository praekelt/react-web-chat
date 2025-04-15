import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';
import { createRequire } from 'module';
import replace from '@rollup/plugin-replace';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const input = 'src/index.jsx';
const extensions = ['.js', '.jsx'];

// Get NODE_ENV from environment or default to production
const NODE_ENV = process.env.NODE_ENV || 'production';

// External dependencies
const external = [
  'react',
  'react-dom',
  'react-redux',
  'redux',
  'redux-thunk',
  'redux-logger',
  'classnames',
  'emoji-mart',
  'prop-types'
];

export default [
  // ESM build
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    },
    external,
    plugins: [
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
      }),
      scss({
        output: 'dist/style.css',
        outputStyle: 'compressed'
      })
    ]
  },
  // UMD build
  {
    input,
    output: {
      file: pkg.main,
      format: 'umd',
      name: 'ReactWebChat',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-redux': 'ReactRedux',
        redux: 'Redux',
        'redux-thunk': 'ReduxThunk',
        'redux-logger': 'ReduxLogger',
        classnames: 'classNames',
        'emoji-mart': 'EmojiMart',
        'prop-types': 'PropTypes'
      },
      sourcemap: true
    },
    external: external,
    plugins: [
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
      }),
      terser(),
      scss({
        output: 'dist/style.css',
        outputStyle: 'compressed'
      })
    ]
  }
]; 