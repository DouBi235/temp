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
  formSubmit: function (e) { //点击发布
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
      url: 'https://mp.ctbls.com/trip/Updata/yueUpdate',
      method: "POST",
      data: tempForm,
      success: function (e) {
        //console.log(e)
        var code = e.data.code
        if (code == 2) {
          wx.showModal({
            title: '提示',
            content: e.data.msg,
            cancelColor: '#666',
            confirmColor: '#21C5BD',
            success: function (e) {
              if (e.confirm) {
                that.telluser()
              }
              wx.navigateBack({
                delta: 2
              })
            }
          })
        } else if (code == 1) {
          wx.showModal({
            title: '提示',
            content: e.data.msg,
            confirmColor: '#21C5BD',
            showCancel: false,
            success() {
              wx.navigateBack({
                delta: 2
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
  telluser: function () {
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Updata/news',
      data: {
        aid: tempForm.aid,
        uid: tempForm.uid
      }
    })
  },
  onLoad: function () {
    var that = this
    var orgPic = []
    var orgCon = ''
    wx.getStorage({ //获取上个页面调取的原始信息
      key: 'originForm',
      success(e) {
        orgPic = e.data.pic
        orgCon = e.data.content
        wx.getStorage({ //获取上个页面填写的表单信息
          key: 'tempForm',
          success(e) {
            tempForm = e.data
            wx.getStorage({
              key: 'totalForm',
              success(e) { //获取之前储存的表单信息
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
              },
              fail() {
                tempForm.content = orgCon
                tempForm.pic = orgPic
                var len = orgPic.length
                if (len) {
                  that.setData({
                    'evt.content': orgCon,
                    photolist: orgPic,
                    photonum: len,
                    phitemwid: exwidth[len - 1]
                  })
                } else {
                  that.setData({
                    'evt.content': orgCon
                  })
                }
              }
            })
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