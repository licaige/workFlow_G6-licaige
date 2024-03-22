import baseConf from './rollup.config.base'

const conf = entry => ({
  ...baseConf,
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./test-lib/${entry.name}.js`,
    format,
    name: 'DateGenerator',
  })),
  plugins: [
    ...baseConf.plugins,
  ],
})

export default conf({
  name: 'index.ts',
  filename: './src/index.ts',
  formats: ['umd'],
})
