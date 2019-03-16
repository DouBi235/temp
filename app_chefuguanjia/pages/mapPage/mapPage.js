// pages/mapPage/mapPage.js
const app = getApp();
let util = require('../../utils/utilb.js');
let imgUrl = app.gd.imgUrl;
let myDate = new Date();
let location = util.bMapTransQQMap;
let Lat = util.bMapTransQQMapLat;
let lng = util.bMapTransQQMapLng;
let nowYY = myDate.getFullYear();
let nowMM = myDate.getMonth() + 1;
let nowDD = myDate.getDate();
let globalUrl = app.gd.globalUrl;
let nowDate = nowYY + '-' + nowMM + '-' + nowDD;
// let beforeOne = util.getBeforeDate(nowDate, 1);
// let getAftenDate = util.getAftenDate(nowDate, 1);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    latitude: 38.304249,
    longitude: 116.767122,
    polyline: [{
      points: [],
      arrowLine: true,
      color: '#1EA0FF',
      width: 5,
      fillColor: true
    }],
    height: 80,
    markers: [],
    viewContent: '',
    nowDate: nowDate,
    dateStart: nowDate,
    dateEnd: nowDate,
    show: false,
    lookDetail: false,
    rotate: 180,
    padding: 0,
    protect: 2,
  },
  onLoad: function(options) {
    this.setData({
      protect: options.is_protect
    })
    // this._getProtect();
  },
  onShow: function() {
    this.getPolyline(this.data.dateStart, this.data.dateEnd);
    this.getMarkers(this.data.dateStart, this.data.dateEnd);
  },
  //展开详情
  unfold: function() {
    this.setData({
      height: 496
    })
  },
  //显示轨迹 
  showTrajectory: function() {
    this.getPolyline(this.data.dateStart, this.data.dateEnd);
    this.getMarkers(this.data.dateStart, this.data.dateEnd);
  },
  hideBottom: function() {
    this.setData({
      show: false,
      height: 248,
      lookDetail: true
    })
  },
  hideBubble: function(e) {
    this.setData({
      viewContent: 0
    })
  },
  regionChange: function(e) {
    console.log(e)
  },
  showBubble: function(e) {
    let markerId = e.markerId;
    let li = this.data.markers;
    for (let i = 0; li.length; i++) {
      if (markerId == li[i].id) {
        this.setData({
          viewContent: li[i]
        })
        break;
      }
    }
  },
  onReady: function(e) {
    // this.mapCtx = wx.createMapContext('myMap');

  },
  bindstartChange(e) { //获取当前的时间
    this.setData({
      ['markers']: [],
      iconPath: ''
    })
    this.setData({
      dateStart: e.detail.value,
      dateEnd: e.detail.value,
    })
    this.getPolyline(this.data.dateStart, this.data.dateEnd);
    this.getMarkers(this.data.dateStart, this.data.dateEnd);
  },
  fold: function() {
    if (this.data.height == 280) {
      this.setData({
        height: 80,
        rotate: 180,
        padding: 0
      })
    } else {
      this.setData({
        height: 280,
        rotate: 0,
        padding: 30
      })
    }

  },
  getPolyline: function(begin, end) {
    wx.showLoading()
    wx.request({
      url: globalUrl + "ubi/Location/cbUser",
      data: {
        begintime: begin + '%2000:00:01',
        endtime: end + '%2023:59:59',
        uid: app.gd.uid,
        type: 2
      },
      method: 'GET',
      success: (res) => {
        var d = [];
        let z = {};
        if (res.data.code == 1) {
          for (let i = 0; i < res.data.data.length; i++) {
            z = location(res.data.data[i].longitude, res.data.data[i].latitude)

            d.push(z)
          }

          this.setData({
            ['polyline[0].points']: d,
            latitude: d[0].latitude,
            longitude: d[1].longitude,
          })
        } else {
          this.setData({
            ['polyline[0].points']: [],
            latitude: {},
            longitude: {},
          })
        }
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },
  getMarkers: function(begin, end) {
    wx.showLoading();
    wx.request({
      url: globalUrl + 'ubi/Location/mainRem',
      data: {
        begintime: begin,
        endtime: end,
        uid: app.gd.uid,
        type: 2
      },
      method: 'GET',
      success: (res) => {
        var markers = [];
        if (res.data.code == 1) {
          this.setData({
            mainRem: res.data.data.Rows
          })
          var len = res.data.data.Rows.length;
          for (var i = 0; i < len; i++) {
            let str = res.data.data.Rows[i]._alarmdescription.indexOf("点火");
            var content = res.data.data.Rows[i]._alarmdescription.split('|');
            var time = res.data.data.Rows[i]._indate.split(' ');
            var marker = {
              iconPath: str == 0 ? imgUrl + '/play.png' : imgUrl + '/end.png',
              action: '这是起点',
              status: str,
              id: i,
              latitude: Lat(res.data.data.Rows[i]._baidulng, res.data.data.Rows[i]._baidulat),
              longitude: lng(res.data.data.Rows[i]._baidulng, res.data.data.Rows[i]._baidulat),
              width: 40,
              height: 40,
              callout: {
                content: time[1] + content[1],
                fontSize: 14,
                color: '#ffffff',
                bgColor: '#000000',
                padding: 8,
                borderRadius: 4,
                boxShadow: '4px 8px 16px 0 rgba(0)'

              }
            }
            markers.push(marker);
          }
          console.log('有没有啊有没有', markers)
          this.setData({
            markers: markers
          })
          if (markers.length > 0) {
            this.setData({
              show: true,
              lookDetail: false
            })
          } else {
            this.setData({
              show: false,
              lookDetail: false
            })
          }
        } else {

        }
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },
  _getProtect: function() {
    wx.request({
      url: globalUrl + 'ubi/Remind/getProtect',
      data: {
        uid: app.gd.uid
      },
      method: 'post',
      success: (res) => {
        console.log(res);
        if (res.statusCode == 200) {
          this.setData({
            protect: res.data
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  is_protect: function(e) {
    wx.request({
      url: globalUrl + 'ubi/Remind/is_protect',
      data: {
        uid: app.gd.uid,
        is_protect: e.currentTarget.dataset.pro
      },
      method: 'post',
      success: (res) => {
        console.log(res);
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: '',
            duration: 1500,
          })
          this._getProtect();
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})