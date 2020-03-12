//import includePaths from 'rollup-plugin-includepaths';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
//import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';
import strip from 'rollup-plugin-strip';

import pkg from './package.json';
import sizes from './rollup-plugins/sizes-plugin';

const input = 'src/library/SlideToggle.js';
const name = 'ReactSlideToggle';

let includePathOptions = {
  include: {},
  paths: ['./', 'src'],
  external: [],
  extensions: ['.js', '.jsx', '.scss', '.json', '.html'],
};

let isEs5 = process.env.ES5 === 'true';
let isEs6 = process.env.ES6 === 'true';
isEs5 && console.log('*** ES5 ***');
isEs6 && console.log('*** ES2015 ***');

export default {
  external: ['react', 'react-dom'],

  input,

  output: [
    isEs5 && {
      file: pkg.cjs,
      format: 'cjs',
      sourcemap: true,
    },
    (isEs5 || isEs6 ) && {
      file: isEs5 ? pkg.main : pkg['module'],
      format: 'umd',
      name: name,
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
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
    strip({
      debugger: true,
      functions: ['console.log', 'debug.trace'],
      sourceMap: true
    }),
    url(),
    svgr(),
    resolve(),
    babel({
      babelrc: true,
      presets: [
        isEs6 && [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              node: '6.5' /* ES2015 compilation target */
            }
          }
        ]
      ].filter(Boolean),
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
