const date = new Date() //获取系统日期
const years = []
const months = []
const days = []
const hours = []
const bigMonth = [1, 3, 5, 7, 8, 10, 12]
const curmonth = date.getMonth()
const curday = date.getDate() - 1
const curhour = date.getHours()
//将日期分开写入对应数组
//年
for (let i = date.getFullYear(); i <= date.getFullYear() + 1; i++) {
  years.push(i)
}
//月
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
//日
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
//小时
for (let i = 0; i < 24; i++) {
  hours.push(i)
}
const app = getApp()
Page({
  data: {
    years: years, //数组[今年,明年]
    months: months, //数组1到12
    days: days, //数组1到31
    hours: hours, //数组0到23
    value: [0, curmonth, curday], //当天的日期
    bmvalue: [0, curmonth, curday, curhour], //精确到小时
    revalue: '', //字符串，选择器改变后的日期
    bmrevalue: '',
    hidop: true,
    hided: true,
    hidbm: true,
    disbtn: false,
    optime: '',
    edtime: '',
    bmtime: '',
    cartype: '',
    evt: {}
  },
  hidate: function () { //隐藏所有自定义选择器
    this.setData({
      hidop: true,
      hided: true,
      hidbm: true
    })
  },
  alertopt: function () { //弹出出发日期选择器
    var val = this.data.value
    var month = val[1] + 1
    var day = val[2] + 1
    this.setData({
      hidop: false,
      revalue: [
        date.getFullYear(),
        (month > 9) ? month : ('0' + month),
        (day > 9) ? day : ('0' + day)
      ].join('-')
    })
  },
  alertedt: function () { //弹出回来日期选择器
    var val = this.data.value
    var month = val[1] + 1
    var day = val[2] + 1
    this.setData({
      hided: false,
      revalue: [
        date.getFullYear(),
        (month > 9) ? month : ('0' + month),
        (day > 9) ? day : ('0' + day)
      ].join('-')
    })
  },
  alertbmt: function () { //弹出报名截止时间选择器
    var val = this.data.bmvalue
    var month = val[1] + 1
    var day = val[2] + 1
    var hour = val[3]
    this.setData({
      hidbm: false,
      bmrevalue: [
        date.getFullYear(),
        (month > 9) ? month : ('0' + month),
        (day > 9) ? day : ('0' + day)
      ].join('-') + ' ' + hour + '点'
    })
  },
  setopt: function () { //确定报名截止时间
    this.setData({
      optime: this.data.revalue,
      hidop: true
    })
  },
  setedt: function () { //确定回来时间
    this.setData({
      edtime: this.data.revalue,
      hided: true
    })
  },
  setbmt: function () { //确定回来时间
    this.setData({
      bmtime: this.data.bmrevalue,
      hidbm: true
    })
  },
  disbtn: function () { //滑动时禁用按钮，防止BUG
    this.setData({
      disbtn: true
    })
  },
  formSubmit: function (e) {
    var that = this
    var data = this.data
    var form = e.detail.value
    form.begin_place = form.begin_place.replace(/\s+/g, "")
    if (!form.active_name || !form.active_route || !form.begin_place || !form.people_num || !data.optime || !data.edtime || !data.bmtime || !data.cartype) {
      wx.showModal({
        title: '提示',
        content: '信息尚未填写完整，请检查',
        showCancel: false,
        confirmColor: '#21C5BD'
      })
      return;
    }
    if (parseInt(form.people_num) != form.people_num || form.people_num == 0) {
      wx.showModal({
        title: '提示',
        content: '可约人数必须是整数，且不能为0',
        showCancel: false,
        confirmColor: '#21C5BD'
      })
      return;
    }
    // if (form.people_num > 5) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '最多可约5人',
    //     showCancel: false,
    //     confirmColor: '#21C5BD'
    //   })
    //   return;
    // }
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    var obj = {
      aid: that.data.evt.id,
      uid: app.globalData.uid, //用户id
      title: form.active_name, //活动标题
      path: form.active_route, //活动路线
      number: form.people_num,//可参加人数
      deadline: data.bmtime,	 //报名截至时间
      start_time: data.optime, //活动开始时间
      end_time: data.edtime,   //活动结束时间
      motorcycle: data.cartype,//车型
      thronheim: form.begin_place,//始发地
    }
    wx.setStorage({
      key: 'tempForm',
      data: obj,
      success() {
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/publish/reset2',
        })
      }
    })
  },
  //判断元素是否在一个数组
  contains: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  },
  setDays: function (day) {
    const temp = [];
    for (let i = 1; i <= day; i++) {
      temp.push(i)
    }
    this.setData({
      days: temp
    })
  },
  //日期选择器改变触发事件
  bindChange: function (e) { //出发时间，回来时间公用
    const val = e.detail.value;
    //判断月的天数
    const setYear = this.data.years[val[0]]
    const setMonth = this.data.months[val[1]]
    const setDay = this.data.days[val[2]]
    // console.log(setYear + '年' + setMonth + '月' + setDay + '日');
    if (setMonth === 2) {
      if (setYear % 4 === 0 && setYear % 100 !== 0) {
        // console.log('闰年')
        this.setDays(29)
      } else {
        // console.log('非闰年')
        this.setDays(28)
      }
    } else {
      if (this.contains(bigMonth, setMonth)) {
        this.setDays(31)
      } else {
        this.setDays(30)
      }
    }
    this.setData({
      disbtn: false,
      value: val,
      revalue: [
        setYear,
        (setMonth > 9) ? setMonth : ('0' + setMonth),
        (setDay > 9) ? setDay : ('0' + setDay)
      ].join('-')
    })
  },
  timeChange: function (e) { //报名截止时间专用
    const val = e.detail.value;
    //判断月的天数
    const setYear = this.data.years[val[0]]
    const setMonth = this.data.months[val[1]]
    const setDay = this.data.days[val[2]]
    const setHour = this.data.hours[val[3]]
    if (setMonth === 2) {
      if (setYear % 4 === 0 && setYear % 100 !== 0) {
        // console.log('闰年')
        this.setDays(29)
      } else {
        // console.log('非闰年')
        this.setDays(28)
      }
    } else {
      if (this.contains(bigMonth, setMonth)) {
        this.setDays(31)
      } else {
        this.setDays(30)
      }
    }
    this.setData({
      disbtn: false,
      bmvalue: val,
      bmrevalue: [
        setYear,
        (setMonth > 9) ? setMonth : ('0' + setMonth),
        (setDay > 9) ? setDay : ('0' + setDay)
      ].join('-') + ' ' + setHour + '点'
    })
  },
  tomycar: function () { //前往我的汽车页面
    wx.navigateTo({
      url: '/pages/mine/car?from=publish'
    })
  },
  onShow: function () {
    var that = this
    wx.getStorage({ //判断是否已经选择汽车
      key: 'selectcar',
      success: function (res) {
        if (res.data) {
          that.setData({
            cartype: res.data
          })
        }
      }
    })
  },
  onLoad: function (opt) {
    var that = this
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    wx.request({
      url: 'https://mp.ctbls.com/trip/Updata/actlist?aid=' + opt.aid,
      success(e) {
        var data = e.data[0]
        data.deadline = (data.deadline.split(" ")[0]) + " " + (data.deadline.split(" ")[1].split(":")[0]) + "点";
        that.setData({
          evt: data,
          optime: data.start_time,
          edtime: data.end_time,
          bmtime: data.deadline,
          cartype: data.motorcycle
        })
        wx.setStorage({
          key: 'originForm',
          data: data,
          success() {
            wx.hideLoading()
          }
        })
      }
    })
  },
  onUnload: function () {
    wx.removeStorage({
      key: 'selectcar'
    })
    wx.removeStorage({
      key: 'tempForm'
    })
    wx.removeStorage({
      key: 'totalForm'
    })
    wx.removeStorage({
      key: 'originForm'
    })
  }
})