import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/lib/xyflow/index.ts',
  output: {
    dir: 'src/lib/xyflow/dist',
    format: 'es',
    sourcemap: true,
  },
  external: ['solid-js', '@xyflow/system', '@solid-primitives/map', 'classcat'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'src/lib/xyflow/dist',
      exclude: ['node_modules/**', 'src/components/**', 'src/routes/**']
    }),
    nodeResolve(),
    postcss({
      extract: true,
      modules: true,
    }),
    babel({
      extensions: ['.ts', '.tsx', '.css'],
      babelHelpers: 'bundled',
      presets: ['solid', '@babel/preset-typescript'],
      exclude: [/node_modules\//],
    }),
  ],
}; 