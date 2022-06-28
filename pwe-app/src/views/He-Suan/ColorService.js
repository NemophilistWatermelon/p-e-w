class ColorService {
  constructor () {
  }

  /**
   * 颜色对象
   * @param colorConfig
   */
  saveLocation(colorConfig) {
    var s = JSON.stringify(colorConfig)
    window.localStorage.setItem('colorConfig', s)
  }

  /**
   * 获取保存本地的颜色对象值
   * @returns {{}|any}
   */
  getColorByLocal() {
    var c = window.localStorage.getItem('colorConfig')
    if (c) {
      return JSON.parse(c)
    }
    return {}
  }
}

export default ColorService
