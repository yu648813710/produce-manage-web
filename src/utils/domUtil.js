export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}
/**
 * methods: compareArr
 * description: 对象类数组去重
 * params: array2 父数组
 *         array1 子数组
 * */
export default {
  compareArr (array2, array1) {
    let result = [];
    for (let i = 0; i < array2.length; i++) {
      let obj = array2[i];
      let num = obj.value;
      let isExist = false;
      for (let j = 0; j < array1.length; j++) {
        let aj = array1[j];
        let n = aj.value;
        if (n == num) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        result.push(obj);
      }
    }
    return result
  },
  /**
   * methods: swapItems
   * description: 列表上下移动
   * params: arr 原数组
   *         index1 移动前位置
   *         index2 移动后位置
   * */
  swapItems (arr, index1, index2, direction) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  },
  /**
   * methods: formDate
   * description: 毫秒转为标准格式时分秒
   * params: date 时间戳
   * */
  formDate (date) {
    let split = ['-', ':']
    let thisDate = new Date(date);
    let year = thisDate.getFullYear();
    let mon = thisDate.getMonth() + 1;
    let day = thisDate.getDate();
    let hh = thisDate.getHours();
    let mm = thisDate.getMinutes();
    let ss = thisDate.getSeconds();
    let newDate = year + split[0] + this.addZero(mon) + split[0] + this.addZero(day) + " "
    console.log(newDate)
    return newDate;
  },
  addZero (data) {
    if (data < 10) {
      return '0' + data
    }
    return data
  },
  /**
   * methods: sortByKey
   * description: 对象类数组排序（正序）
   * params: array 需要排序的数组
   *         key: 排序依据
   * */
  sortByKey (array, key) {
    return array.sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}

export const domTitle = '农业大脑'
