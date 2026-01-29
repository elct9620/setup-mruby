import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    typescript({
      compilerOptions: {
        outDir: 'dist',
        declaration: false
      },
      sourceMap: true
    }),
    commonjs(),
    nodeResolve({
      preferBuiltins: true
    })
  ]
}
