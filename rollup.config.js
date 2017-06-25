import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'source/main.js',
  format: 'iife',
  dest: 'public/main.js',
  moduleName: 'HNSM',
  sourceMap: true,
  plugins: [
    uglify()
  ]
}
