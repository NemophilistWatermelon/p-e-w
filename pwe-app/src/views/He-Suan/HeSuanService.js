class HeSuanService {
  constructor () {
  }

  /**
   * 获取时间戳
   * @returns {number}
   * @private
   */
  _getNowDate () {
    return new Date().getTime()
  }

  // 缓存自己做的核酸上报时间
  cacheTime (time) {
    window.localStorage.setItem('HeSuanTime', time)
  }

  getTime () {
    return window.localStorage.getItem('HeSuanTime') || ''
  }

  /**
   * @param startTime 做核酸的开始上报时间
   */
  startAndNow (startTime) {
    if (!startTime) throw new Error('startTime is null')
    if (new Date(startTime) === 'Invalid Date') throw new Error('startTime does time type')
    const startDate = Number(new Date(startTime))
    const nowDate = Number(this._getNowDate())
    // console.log(startDate, nowDate, '结果', nowDate - startDate, '结果毫秒数')
    // console.log((nowDate - startDate) / 1000 / 60 / 60, '小时')
    // console.log((nowDate - startDate) / 1000 / 60 % 60, '分钟')
    var h = (nowDate - startDate) / 1000 / 60 / 60
    var f = (nowDate - startDate) / 1000 / 60 % 60
    return Number(Math.floor(h)) + '.' + Number(parseInt(Math.floor(f)))
  }
}

export default HeSuanService
