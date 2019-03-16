// pages/searchw/searchw.js
const app = getApp(),
  url = app.gd.globalUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    proList: ["京", "津", "沪", "渝", "蒙", "桂", "藏", "宁", "新", "冀", "豫", "鲁", "辽", "黑", "吉", "甘", "青", "苏", "鄂", "湘", "赣", "浙", "粤", "云", "闽", "琼", "晋", "川", "陕", "贵", "皖"],
    proId: 0,
    a_zList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    a_zId: 0,
    PlateInfo: {
      city: ''
    },
    plateValue: '',
    // 车牌号
    plate: '',
    // 车身架号
    vin: '',
    // 发动机号
    engine: '',
    // 帮助图片
    helpImg: ""
  },
  // bindPickerChange1(e) {
  //   console.log(e)
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   let prefix = this.data.proList[e.detail.value] + this.data.a_zList[this.data.a_zId];
  //   let plate = this.data.plateValue;
  //   this.setData({
  //     proId: e.detail.value,
  //     plate: prefix + plate,
  //   })
  //   this.getPlateInfo();
  // },
  // bindPickerChange2(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   let prefix = this.data.proList[this.data.proId] + this.data.a_zList[e.detail.value];
  //   let plate = this.data.plateValue;
  //   this.setData({
  //     a_zId: e.detail.value,
  //     plate: prefix + plate,
  //   })
  //   this.getPlateInfo();
  // },
  // getPlateInfo: function() {
  //   wx.request({
  //     url: url + 'ubi/plateSel/getPlateInfo',
  //     data: {
  //       pro: this.data.proList[this.data.proId],
  //       ci: this.data.a_zList[this.data.a_zId]
  //     },
  //     header: {},
  //     method: 'POST',
  //     success: (res) => {
  //       if (res.data.code == 1) {
  //         this.setData({
  //           PlateInfo: res.data.data
  //         })
  //       } else {
  //         this.setData({
  //           PlateInfo: {
  //             city: ''
  //           }
  //         })
  //         wx.showToast({
  //           title: res.data.msg,
  //           icon: 'none',
  //           duration: 1500,
  //         })
  //       }
  //     },
  //     fail: (res) => {},
  //   })
  // },
  // viewImg: function() {
  //   this.setData({
  //     helpImg: app.gd.imgUrl + "/helpEg.png"
  //   })
  // },
  // hideImg: function() {
  //   this.setData({
  //     helpImg: ""
  //   })
  // },
  // submitSearch: function() {
  //   wx.showLoading()
  //   wx.request({
  //     url: url + 'ubi/plateSel/selViolations',
  //     data: {
  //       plateNumber: this.data.plate,
  //       vin: this.data.vin,
  //       engineNo: this.data.engine, 
  //       carType: '02',
  //       city: this.data.PlateInfo.city,
  //       unionId: app.gd.unionId,
  //     },
  //     method: 'POST',
  //     success: (res) => {
  //       wx.hideLoading()
  //       if (res.data.code == 1) {
  //         let data = JSON.stringify(res.data);
  //         wx.navigateTo({
  //           url: '../breachRecord/breachRecord?data=' + data,
  //         })
  //       } else {
  //         wx.showToast({
  //           title: res.data.msg,
  //           icon: 'none',
  //           duration: 1500,
  //         })
  //       }
  //     },
  //   })
  // },
  // plateInput: function(e) {
  //   let plate = e.detail.value;
  //   if (/[\u4E00-\u9FA5]/g.test(plate)) {
  //     wx.showToast({
  //       title: '不允许输入汉字',
  //       icon: 'none',
  //       duration: 1500,
  //     })
  //     let pd = this.data.plateValue
  //     this.setData({
  //       plateValue: pd
  //     })
  //   } else if (plate.length > 5) {
  //     wx.showToast({
  //       title: '长度超出限制',
  //       icon: 'none',
  //       duration: 1500,
  //     })
  //     let pd = this.data.plateValue
  //     this.setData({
  //       plateValue: pd
  //     })
  //   } else {
  //     let prefix = this.data.proList[this.data.proId] + this.data.a_zList[this.data.a_zId];
  //     this.setData({
  //       plate: prefix + plate,
  //       plateValue: plate
  //     })
  //   }
  // },
  // vinInput: function(e) {
  //   this.setData({
  //     vin: e.detail.value
  //   })
  // },
  // engineInput: function(e) {
  //   this.setData({
  //     engine: e.detail.value
  //   })
  // }, 
  // onLoad: function(options) {
  //   this.getPlateInfo();
  //   console.log(options)
  // },

})