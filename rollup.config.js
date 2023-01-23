// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { swc } from 'rollup-plugin-swc3';

export default {
	input: 'src/index.ts',
	output: {
		dir: 'dist',
		format: 'esm',
	},
	plugins: [
		typescript(),
		swc({
			jsc: {
				minify: {
					compress: {
						unused: true,
					},
					mangle: true,
				},
			},
		}),
	],
};
