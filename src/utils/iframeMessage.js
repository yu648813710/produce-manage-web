/**
 * @name sendIframeMassage 给子iframe发送data
 * @param windowSelf Object window对象
 * @param href string 子级iframe的链接
 * @param data any 传递的data
 * */
function sendIframeMassage (windowSelf, data, href) {
  windowSelf.parent.postMessage(data, href)
}

/**
 * @name receiveIframeMassage  接受子iframe发送data
 * @param living 一个vue实例
 * */
function receiveIframeMassage (living) {
  window.addEventListener('message', function (e) {
    let data = e.data
    living.parentData = data
  })
}

export { sendIframeMassage, receiveIframeMassage }
