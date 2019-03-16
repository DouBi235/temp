// pages/directDet/directDet.js
import { request as fetch } from '../../utils/requestPromise.js'; 
var app = getApp(),
    urlHeader = app.gd.globalUrl;

Page({
  data: {
    imgUrl: app.gd.imgUrl,
    spreadDetails: {}, /** 推广人信息 */
    spreadList: [], /** 推广数组 */
    msg: '',
    pageLoading: true
  },
  onLoad: function (options) {
    console.log("options",options)
    let _options = JSON.parse(options.item)  
    this.setData({ spreadDetails: _options, target: '' })
    this._initSpreadData(_options.sonid)
  },
  /** 推广详情数据 */
  _initSpreadData: function (sonid) {
    fetch('ubi/Popularize/getIndirectAward', 'POST', {
      son_unionId: sonid
    }).then(res => {
      if (res) this.setData({ pageLoading: false })
      if (res.data.code === 0) {
        this.setData({ msg: res.data.msg })
        return;
      }
      this.setData({ spreadList: res.data.data.list })
      console.log(res)
    })
  }
})