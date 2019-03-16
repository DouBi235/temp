const app = getApp()
Page({
  data: {
    list: [],
    bname: '',
    tname: '',
    plate: '',
    brandList: [],
    brandIndex: [],
    typeList: [],
    typeIndex: [],
    pickerList: [],
    pickerIndex: [0, 0],
    showaddcar: false,
    frompublish: false
  },
  addcar: function (e) {
    var that = this
    const val = e.detail.value
    if (val.plate && val.brand && val.type) {
      var obj = {
        uid: app.globalData.uid,
        plate: val.plate,
        brand: val.brand,
        type: val.type
      }
      wx.request({
        url: 'https://mp.ctbls.com/trip/Personal/addCar',
        method: 'POST',
        data: obj,
        success: function (e) {
          //console.log(obj)
          if (e.data.code) {
            if (that.data.frompublish) {
              that.setData({
                showaddcar: false
              })
              that.initcar()
              that.selectcar(val.type)
            } else {
              that.setData({
                bname: '',
                tname: '',
                plate: ''
              })
              that.initcar()
            }
          } else {
            wx.showModal({
              title: '提示',
              content: e.data.msg,
              showCancel: false,
              confirmColor: '#21C5BD'
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请将车辆信息填写完整',
        showCancel: false,
        confirmColor: '#21C5BD'
      })
    }
  },
  delcar: function (e) {
    if (this.data.frompublish) { return; }
    var id = e.currentTarget.id
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除此汽车吗',
      cancelColor: '#666',
      confirmColor: '#21C5BD',
      success(e) {
        if (e.confirm) {
          wx.request({
            url: 'https://mp.ctbls.com/trip/Personal/car_del?id=' + id,
            success(e) {
              wx.showToast({
                title: e.data.msg,
                icon: 'none',
                mask: true,
                success() {
                  if (e.data.code) {
                    that.initcar()
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  initcar: function () {
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Activity/myCar',
      data: { uid: app.globalData.uid },
      success: function (e) {
        if (e.data.code) {
          that.setData({
            list: e.data.data
          })
        } else {
          that.setData({
            list: [],
            showaddcar: true
          })
          wx.showModal({
            title: '提示',
            content: '您尚未添加我的汽车，请添加',
            showCancel: false,
            confirmColor: '#21C5BD'
          })
        }
      }
    })
  },
  selectcar: function (e) {
    if (!this.data.frompublish) { return; }
    if (e.type) {
      wx.setStorage({
        key: 'selectcar',
        data: e.currentTarget.dataset.ct,
        success: function () {
          wx.navigateBack()
        }
      })
    } else {
      wx.setStorage({
        key: 'selectcar',
        data: e,
        success: function () {
          wx.navigateBack()
        }
      })
    }
  },
  pickerChange: function (e) { //车型选择器确定时
    var val = e.detail.value
    var bname = this.data.brandList[val[0]]
    var tname = this.data.typeList[val[1]]
    //console.log(bname, tname)
    this.setData({
      bname: bname,
      tname: tname
    })
  },
  innerChange: function (e) { //车型选择器滑动时
    var initdata = {
      pickerIndex: this.data.pickerIndex
    };
    initdata.pickerIndex[e.detail.column] = e.detail.value;
    if (e.detail.column === 0) {
      const bid = this.data.brandIndex[initdata.pickerIndex[0]]
      this.getType(bid)
    }
    this.setData(initdata)
  },
  onLoad: function (options) {
    if (options.from) {
      this.setData({ frompublish: true })
    } else {
      this.setData({ showaddcar: true })
    }
    this.getBrand()
    this.initcar()
  },
  getType: function (bid) { //获取某品牌车型列表
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Personal/type?id=' + bid,
      success: function (res) {
        const list = res.data
        var typeList = []
        var typeIndex = []
        for (let i = 0; i < list.length; i++) {
          typeIndex[i] = list[i].t_id
          typeList[i] = list[i].type
        }
        //console.log(typeIndex, typeList)
        that.setData({
          typeIndex: typeIndex,
          typeList: typeList,
          'pickerList[1]': typeList
        })
      }
    })
  },
  getBrand: function () { //获取汽车品牌列表
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Personal/menu',
      success: function (res) {
        const list = res.data
        var brandList = []
        var brandIndex = []
        for (let i = 0; i < list.length; i++) {
          brandIndex[i] = list[i].id
          brandList[i] = list[i].name
        }
        //console.log(brandIndex, brandList)
        that.setData({
          brandIndex: brandIndex,
          brandList: brandList,
          'pickerList[0]': brandList
        })
        that.getType(brandIndex[0])
      }
    })
  }
})