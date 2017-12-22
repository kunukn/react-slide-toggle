import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
// import postcss from 'rollup-plugin-postcss'
// import filesize from 'rollup-plugin-filesize'
import { minify } from 'uglify-es'
import pkg from './package.json'

const entry = './src/library/ReactSlideToggle/index.js';
const name = 'ReactSlideToggle';
const env = process.env.NODE_ENV

const plugins = [
  //postcss(),
  babel({ exclude: '**/node_modules/**' }),
  commonjs(),
  resolve({ browser: true }),
  //filesize(),
];

export default [

//   {
// 	input: entry,
// 	external: [ 'eases' ],
//     output: { file: pkg.main, format: 'cjs' },
//     name: 'ReactSlideToggle',
//     plugins: [
// 	  babel({ exclude: '**/node_modules/**' }),
//       commonjs({
//         exclude: 'node_modules/**',
// 	  }),	  
//       resolve(),
//     ],
//   },


  // UMD and ES versions.
  {
    input: entry,
    external: [ 'react' ],
    globals: { 'react': 'React' },
    output: [
      { file: pkg.browser, format: 'umd', name: name},
	  { file: pkg.module, format: 'es', name: name },
    ],
    plugins: plugins.concat([
      replace({ 'process.env.NODE_ENV': JSON.stringify(env) })
    ]),
  },

  //Browser minified version.
  {
    input: entry,
    external: [ 'react' ],
    globals: { 'react': 'React' },
    output: { file: pkg.unpkg, format: 'umd' },
    name: name,
    plugins: plugins.concat([
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      }, minify),
    ]),
  }
];
