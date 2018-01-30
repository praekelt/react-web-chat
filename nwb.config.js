module.exports = {
  type: 'react-component',
  npm: {
    cjs: false,
    esModules: false,
    umd: {
      global: 'ReactWebChat',
      externals: {
        react: 'React',
      }
    }
  }
}
