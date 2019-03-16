/** url 参数转换 */
const qs = {
  stringify: (path, query = {}) => {
    let url = ''
    path = path.lastIndexOf('?') > 0 ? path.substr(0, path.length - 1) : path
    if (Object.keys(query).length === 0) return path
    for (let key in query) {
      url += `&${key}=${query[key]}`
    }
    return path + url.replace('&', '?')
  },
  parse: (query) => {
    let obj = {}
    query.match(/([^?=&]+)(=([^&]*))/g).map(item => {
      obj[item.substr(0, item.indexOf('='))] = item.substr(item.indexOf('=') + 1, item.length)
    })
    return obj
  }
}

/**
 * 获取 selector 元素属性信息
 * @param {String} property 需要获取的属性, 当传入 {} 空对象时， 返回所有属性
 * @param  {...any} args 
 */
export let getSelectorAttr = ({ property: ARG_property = {} }, ...args) => {
  /** if have the Property */
  if (Object.keys(ARG_property).length !== 0) {
    const perty = ['height', 'width', 'top', 'left', 'right', 'bottom', 'dataset', 'id'].indexOf(ARG_property)
    if (perty < 0) throw new Error('first Arguments 请输入相应的属性值 { property: height, width, top, left, right, bottom, dataset, id }')
  }
  if (args.length === 0) console.warn('未传入任何 ID 元素,无法获取对应属性')
  return new Promise(resolve => {
    let result = [];
    let _selarr = [...new Set(args)].map(el => wx.createSelectorQuery().select(el).boundingClientRect())
    let _length = _selarr.length
    _selarr.forEach((_selec, _i) => {
      _selec.exec(res => {
        try {
          if (Object.keys(ARG_property).length !== 0) result.push(res[0][ARG_property])
          /** Dont have the Property , Return all Property */
          else result.push(res[0])
        } catch (err) {
          console.warn('getSelectorHeight 参数中 可能传入不存在的 id 元素,请检查')
        }
        if (_i === _length - 1) resolve(result.length === 1 ? result[0] : result)
      })
    })
  })
}

/**
 * 获取屏幕属性信息
 * 返回属性单位值 为 PX, 可根据返回的 dpr 自行改变 相应数值
 */
export let screenHeight = () => {
  return new Promise(resolve => {
    wx.getSystemInfo({
      success: res => {
        let { windowWidth: width, windowHeight: height } = res
        let dpr = (750 / width)
        /** 使用 取整 为题比较大 */
        let $dpr = ~~(750 / width)
        resolve({ height, width, dpr })
      }
    })
  })
}
/**
 * 路由跳转
 * @param {String} ARG_path 跳转地址
 * @param {Object} ARG_query 跳转参数
 * @param {...any} suc 判断是否传入 成功 回调函数 或者 延迟跳转
 */
export let router = (ARG_path, ARG_query = {}, suc = '') => {
  let success,
    delay = 100
  if (!ARG_path) throw new Error('ARG_path: 请传入 path')

  if (typeof suc === 'function') success = suc
  else if (typeof suc === 'number') delay = suc
  let _path = qs.stringify(ARG_path, ARG_query)
  setTimeout(() => {
    console.log(_path)
    wx.navigateTo({ url: _path, success: _ => success && success(_) })
  }, delay)
}
/** 本地缓存处理, 全部为 同步处理， 异步处理自行调用 wx API */
export let localstorage = {
  _get: key => wx.getStorageSync(key),
  _set: (key, value) => wx.setStorageSync(key, typeof value === 'object' ? JSON.stringify(value) : value),
  _remove: key => wx.removeStorageSync(key),
  _clear: _ => wx.clearStorageSync()
}
/** wx : 弱提示 */
export let alert = {
  _showToast: function ({ title = '', icon = 'none', duration = 3000 } = {}) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
    })
  },
  _showModal: function (title, content, { confirm, cancel = '' }, ...arg) {
    let [ confirmText ] = arg;
    wx.showModal({
      title: title,
      content: content,
      confirmText: confirmText || '确认',
      success: res => {
        if (res.confirm) { confirm && confirm() }
        if (res.cancel) { cancel && cancel() }
      }
    })
  }
}