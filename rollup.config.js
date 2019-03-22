import includePaths from 'rollup-plugin-includepaths';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
//import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';
import sizes from './rollup-plugins/sizes-plugin';

const input = 'src/library/ReactSlideToggle/SlideToggle.js';
const name = 'ReactSlideToggle';

let includePathOptions = {
  include: {},
  paths: ['./', 'src'],
  external: [],
  extensions: ['.js', '.jsx', '.scss', '.json', '.html'],
};

export default {
  external: ['react', 'react-dom'],

  input,

  output: [
    1 && {
      file: pkg.cjs,
      format: 'cjs',
      sourcemap: true,
    },
    1 && {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    0 && {
      file: pkg.iife,
      format: 'iife',
      name: name,
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    1 && {
      file: pkg.main,
      format: 'umd',
      name: name,
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ].filter(Boolean),
  plugins: [
    //scss(),
    postcss({
      plugins: [],
      minimize: true,
    }),
    external({
      includeDependencies: false,
    }),
    url(),
    svgr(),
    resolve(),
    babel({
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        'transform-react-remove-prop-types',
      ],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser({
      compress: { drop_console: true },
    }),
    sizes({
      getSize: (size, gzip, filename) => {
        console.log('minified', size, filename);
        console.log('gzip minified', gzip);
      },
    }),
  ],
};
