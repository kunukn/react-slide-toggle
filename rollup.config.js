import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import pkg from './package.json';

var entry = './src/library/ReactSlideToggle/index.js';

export default [
	// browser-friendly UMD build
	{
        entry: entry,
        external: ['eases','react'],
		dest: pkg.browser,
		format: 'umd',
		moduleName: 'ReactSlideToggle',
		plugins: [
            // eslint({
            //     exclude: [
            //       'src/index.*',
            //       'src/demo/**',
            //     ]
            //   }),
            babel({
                exclude: ['node_modules/**'],
                runtimeHelpers: true,
			}),
            resolve(), // so Rollup can find `eases`
			commonjs(), // so Rollup can convert `eases` to an ES module			
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// the `targets` option which can specify `dest` and `format`)
	// {
	// 	entry: entry,
	// 	external: ['eases','React'],
	// 	targets: [
	// 		{ dest: pkg.main, format: 'cjs' },
	// 		{ dest: pkg.module, format: 'es' }
	// 	],
	// 	plugins: [
	// 		babel({
	// 			exclude: ['node_modules/**']
	// 		})
	// 	]
	// }
];