const plugins = [
  [
    'import',
    { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }
  ],
  '@vue/babel-plugin-transform-vue-jsx'
]
let VUE_APP_EXCUTION = process.env.VUE_APP_EXCUTION

if (VUE_APP_EXCUTION !== 'fn') {
  plugins.push('transform-remove-console', 'transform-remove-debugger')
}
module.exports = {
  presets: ['@vue/app'],
  plugins: plugins
}
