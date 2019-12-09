const cache = {}

// 获取主题色
const themeAction = {
  green() {
    if (!cache.chalk) {
      cache.chalk = import('./styles/theme-green/index.useable.less')
    }
    return cache.chalk
  }
}
let current = null
async function setTheme(theme) {
  if (themeAction[theme]) {
    const style = await themeAction[theme]()
    if (current) {
      current.unref()
    }
    current = style
  }
}
window.setTheme = setTheme
export default setTheme
