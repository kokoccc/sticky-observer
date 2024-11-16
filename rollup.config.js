import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const NAME = 'StickyObserver'
const FILE_NAME = 'sticky-observer'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${FILE_NAME}.cjs.js`,
      format: 'cjs', // CommonJS
    },
    {
      file: `dist/${FILE_NAME}.esm.js`,
      format: 'es', // ES Modules
    },
    {
      file: `dist/${FILE_NAME}.umd.js`,
      format: 'umd', // Universal Module Definition
      name: NAME, // Global variable for browser
    },
    {
      file: `dist/${FILE_NAME}.umd.min.js`,
      format: 'umd',
      name: NAME,
      plugins: [terser()],
    },
  ],
  plugins: [typescript()],
}
