import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'source/sw.js',
  format: 'iife',
  dest: 'public/sw.js',
  sourceMap: true,
  plugins: [
    uglify()
  ]
}
