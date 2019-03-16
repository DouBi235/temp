var tempForm = {}
var imgback = []
var ibindex = 0
const exwidth = [690, 344, 228, 170, 136, 112]
Page({
  data: {
    photolist: [],
    photonum: 0,
    phitemwid: 0,
    evt: {}
  },
  selectphoto: function () { //选择照片
    var that = this
    wx.chooseImage({
      count: 6,
      success: function (res) {
        wx.showLoading({
          title: '请稍候',
          mask: true
        })
        that.upphoto(res.tempFilePaths)
      }
    })
  },
  upphoto: function (path) { //上传照片，path是一个数组
    //console.log(path)
    var that = this
    var len = path.length
    wx.uploadFile({
      url: 'https://mp.ctbls.com/trip/Activity/image',
      filePath: path[ibindex],
      name: 'image',
      success: function (res) {
        if (res.statusCode == 413) {
          wx.hideLoading()
          wx.showToast({
            title: '图片体积过大',
            icon: 'none'
          })
          imgback = []
          ibindex = 0
          return;
        }
        var data = JSON.parse(res.data)
        imgback[ibindex] = data
        //console.log(imgback)
        ibindex++
        if (ibindex < len) {
          that.upphoto(path)
        } else {
          wx.hideLoading()
          that.setData({
            photolist: imgback,
            photonum: len,
            phitemwid: exwidth[len - 1]
          })
          tempForm.pic = imgback
          imgback = []
          ibindex = 0
        }
      }
    })
  },
  otherinput: function (e) {
    var val = e.detail.value
    tempForm.content = val
  },
  formSubmit: function (e) {
    var that = this
    var photolist = this.data.photolist
    var other = e.detail.value.other
    if (!other) {
      wx.showModal({
        title: '提示',
        content: '请填写行程简介',
        showCancel: false,
        confirmColor: '#21C5BD'
      })
      return;
    }
    tempForm.content = other
    tempForm.pic = photolist
    //console.log(tempForm); return;
    wx.request({
      url: 'https://mp.ctbls.com/trip/Activity/activity',
      method: "POST",
      data: tempForm,
      success: function (e) {
        //console.log(e)
        if (e.data.code) {
          wx.showModal({
            title: '提示',
            content: e.data.msg,
            showCancel: false,
            confirmColor: '#21C5BD',
            success: function () {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }
          })
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
  },
  onLoad: function () { //两种情况，1.第一次到此页面，2.返回上一页面后第二次进入
    var that = this
    wx.getStorage({ //获取上个页面填写的表单信息
      key: 'tempForm',
      success: function (res) {
        tempForm = res.data
        wx.getStorage({ //若第2种情况，获取之前储存的表单信息
          key: 'totalForm',
          success(e) { //成功表明是第2种情况
            var temp = e.data
            var con = temp.content
            if (con) {
              tempForm.content = con
              that.setData({
                'evt.content': con
              })
            }
            var pic = temp.pic
            if (pic) {
              var len = pic.length
              if (len) {
                tempForm.pic = pic
                that.setData({
                  photolist: pic,
                  photonum: len,
                  phitemwid: exwidth[len - 1]
                })
              }
            }
          }
        })
      }
    })
  },
  onUnload: function () { //储存此页面的表单信息
    wx.setStorage({
      key: 'totalForm',
      data: tempForm
    })
  }
})