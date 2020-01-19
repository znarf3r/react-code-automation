import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import builtins from 'builtin-modules'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...builtins,
  ],
  plugins: [
    resolve(),
    commonjs({
      include: ['node_modules/**', `${__dirname}/src/**/*`],
    }),
    typescript({
      typescript: require('typescript'),
    }),
  ],
  output: {
    sourcemap: false,
    file: pkg.main,
    format: 'cjs',
  },
}
