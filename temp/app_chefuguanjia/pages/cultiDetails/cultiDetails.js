// pages/cultiDetails/cultiDetails.js
import { request as fetch } from '../../utils/requestPromise.js';
var app = getApp(),
    urlHeader = app.gd.globalUrl;
Page({
  data: {
    pageLoading: true,
    type: 5,
    dataList: [], /** 二维数组 */
    dataMoney: 0,
    noData: false,
    msg: ''
  },
  onLoad: function (options) {
    // if (options.type === '4') {
    //   wx.setNavigationBarTitle({
    //     title: '培养推广中心详情',
    //   })
    // } else {
    //   wx.setNavigationBarTitle({
    //     title: '培养V99奖励',
    //   })
    // }
    this.setData({ type: options.type })
    this._initData(options.id, options.type, options.son_id)
  },
  _initData: function (id, type, sonid) {
    //fetch('ubi/Popularize/cultivateAwardDetail', 'POST', {
    fetch('ubi/Popularize/getIndirectAward', 'POST', {
      uid: app.gd.uid,
      type: type,
      id: id,
      son_unionId: sonid
    }).then(res => {
      if (res.data.code === 0) {this.setData({ noData: true, msg: res.data.msg })}
      let { count, list, money, num: group } = res.data.data
      let groupNum = Math.ceil(count / group)
      let result = []
 
      for (let i = 0; i < groupNum; i++) {
        result.push(list.slice( i * group, (i + 1) * group ))
      }
      if (result) { this.setData({ pageLoading: false }) }
      this.setData({ dataList: result, dataMoney: money.substr(0, money.length - 1) })
      console.log(result)
    })
  }
})