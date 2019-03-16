// pages/make/make.js 
const app = getApp();
const date = new Date()
const years = [date.getFullYear()]
const months = []
const days = []
const hours = []
const minutes = []
var thisMon = date.getMonth() + 1;
var thisDay = date.getDate();

// card city
const card_city = ["京", "津", "沪", "渝", "蒙", "桂", "藏", "宁", "新", "冀", "豫", "鲁", "辽", "黑", "吉", "甘", "青", "苏", "鄂", "湘", "赣", "浙", "粤", "云", "闽", "琼", "晋", "川", "陕", "贵", "皖"];
const card_zimu = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// for (let i = 2017; i <= date.getFullYear(); i++) {
//   years.push(i)
// }


var totalDay = mGetDate(date.getFullYear(), thisMon);

function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate(); 
}

// if (0 <= thisMon && thisMon < 10) {
//   thisMon = "0" + (thisMon);
// } else {
//   thisMon = (thisMon);
// }
// if (0 <= thisDay && thisDay < 10) {
//   thisDay = "0" + thisDay;
// }
for (let i = date.getMonth() + 1; i <= 12; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  months.push(k)
}
// 给天加数据，小于10的 加0
for (let i = 1; i <= totalDay; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  days.push(k)
}

// 给小时加数据，小于10的 加0
for (let i = 0; i <= 23; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  hours.push(k)
}
// 给分钟加数据，小于10的 加0
for (let i = 0; i <= 59; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  minutes.push(k)
}

Page({
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: thisMon,
    days: days,
    day: thisDay,
    value: [thisMon , thisDay , 0, 0],
    hours: hours,
    hour: "00",
    minutes: minutes,
    minute: "00",
    multiIndex: [0, 0],
    multiArray: [[],[]],
    xiaoquArr: [],
    classArr: [],
    specid: '', // 商品Id
    errorText: '',

    appointor:'',        // 用来提交的预约人
    phonenum:'',         // 用来提交的手机号码
    defaultOne: '',      // 用来提交的车系
    defaultTwo: '',      // 用来提交的车型
    submitFormatT: '',   // 用来提交的预约时间 
    carCity: [],         // 车牌地址
    carCityIndex: 0,
    carZimu: [],         // 车牌字母
    carZimuIndex: 0,
    carStr: '',           // 车牌后尾号
    
    makedata:{name: '',phone: '',y_time: '',carclass: '',cartype: '',uid: '',plate: ''},
    strdata:''
    
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      strdata: options.strdata,
      carCity: card_city,
      carZimu: card_zimu
    });
    wx.request({
      url: app.globalData.globalUrl + '/st/user/userInfo',
      data: { uid: app.globalData.uid},
      success: function (res) {
        console.log("name phone res:", res.data)
        var name = res.data.data.name;
        var phone = res.data.data.phone; 
        that.setData({
          appointor: name,
          phonenum: phone
        })
      }
    })
    wx.request({
      url: app.globalData.globalUrl + '/st/order/menu',
      success: function (res) {
        console.log("res", res.data)
        var xiaoquList = res.data;
        var xiaoquArr = xiaoquList.map(item => {
          return item.name;
        }); 
        that.setData({
          multiArray: [xiaoquArr, []],
          xiaoquList: xiaoquList,
          xiaoquArr: xiaoquArr
        })
        var default_xiaoqu_id = xiaoquList[0]['id'];
        if (default_xiaoqu_id) {
          that.searchColTwo(default_xiaoqu_id)
        }
      }
    })
  },
  onReady: function () {
    console.log(this.data.strdata);
  },
  bindChange: function (e) { 
    const val = e.detail.value;
    var that = this;
    this.setData({
      month: that.data.months[val[0]],
      day: that.data.days[val[1]],
      hour: that.data.hours[val[2]],
      minute: that.data.minutes[val[3]],
    })
    var changeTotalDay = mGetDate(that.data.year, that.data.month);
    
    var changeDate = [];
    for (let i = 1; i <= changeTotalDay; i++) {
      var k = i;
      if (0 <= i && i < 10) {
        k = "0" + i
      }
      changeDate.push(k)
    }
    this.setData({
      days: changeDate
    })
    this.submitTime()
  }, 
  bindMultiPickerColumnChange: function (e) {
    // 车系车型 列的滑动修改
    var that = this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    if (!e.detail.column) {
      that.searchColTwo(e.detail.value + 1)
    }
  },
  bindMultiPickerChange: function (e) {
    // 车系车型 picker 的提交
    var that = this;
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      multiIndex: e.detail.value,
      defaultOne: that.data.xiaoquArr[that.data.multiIndex[0]],
      defaultTwo: that.data.classArr[that.data.multiIndex[1]]
    })
    console.log('picker发送选择改变，携带值为', that.data.defaultOne, that.data.defaultTwo);   
  },
  searchColTwo: function(colOneId) {
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + '/st/order/type',
      data: {
        id: colOneId
      },
      success: function (res) {
        console.log("请求第二条数据", res.data)
        var classList = res.data;
        var classArr = classList.map(item => {
          return item.type;
        })
        var xiaoquArr = that.data.xiaoquArr;
        that.setData({
          multiArray: [xiaoquArr, classArr],
          classArr: classArr,
          classList: classList
        })
      }
    })
  },
  submitTime: function(t) {
    var that = this;
    var format = that.data.year + '-' + that.data.month + '-' + that.data.day + ' ' + that.data.hour + ':' + that.data.minute + ':' + "00";
    // if (this.data.month == date.getMonth()+1){
    //   console.log("000");
    //   this.setData({
    //     days: 0
    //   })
    // }
    console.log( "提交的时间是：",format )
    this.setData({
      submitFormatT: format
    }) 
  },
  submitAppointment: function() {
    var that = this; 
    // Date.parse(new Date())
    // Date.parse(new Date("2014-08-01 10:54:50"))
    if (Date.parse(new Date(that.data.submitFormatT)) < Date.parse(new Date())) {
      wx.showToast({
        title: '预约时间不能小于当前时间',
        icon: 'none',
      })
      return false;
    }
    // 拼接用户填写的车牌号
    var _plate = this.data.carCity[this.data.carCityIndex] + this.data.carZimu[this.data.carZimuIndex] + this.data.carStr;
    var thismake = this.data.makedata;
    thismake.name = this.data.appointor;
    thismake.phone = this.data.phonenum;
    thismake.y_time = this.data.submitFormatT;
    thismake.carclass = this.data.defaultOne;
    thismake.cartype = this.data.defaultTwo;
    thismake.plate = _plate;
    thismake.specid = this.data.specid;
    // thismake.carclass = that.data.multiIndex[0];
    // thismake.cartype = that.data.multiIndex[1];
    thismake.uid = app.globalData.uid;
    this.setData({
      makedata: thismake
    });
    // var str1 = that.data.strdata;
    // var str2 = JSON.stringify(that.data.makedata);
    // var str = str1 + str2;
    // var jsonstr = str.replace(/}{/, ',');
    // var jsonobj = JSON.parse(jsonstr);
    var objData = Object.assign({}, this.data.makedata, {
      specid: JSON.parse(this.data.strdata).id,
      number: JSON.parse(this.data.strdata).sum,
      sid: JSON.parse(this.data.strdata).sid,
      cid: JSON.parse(this.data.strdata).cid
    })
    wx.showLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/order/appoint',  
      data: objData,
      method: "POST",
      success: function (res) { 
        wx.hideLoading() 
        console.log(res)
        var msg = res.data.msg;
        if (res.data.code == 1) {
          wx.showToast({
            title: msg,
            duration: 1500,
          })
          var indext = setTimeout(function () {
            wx.navigateTo({
              url: '../orderAll/orderAll',
            })
            clearTimeout(indext)
          }, 1500);
        } else {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 1500,
          })
        }
      } 
    })
  },
  inputcar: function (e) {
    let c = e.detail.value.toUpperCase();
    c.length < 5
      ? this.setData({ errorText: '5位的车牌号' })
      : this.setData({  errorText: '' })
    this.setData({ carStr: c })
  },
  inputname: function(e) {
    this.setData({ appointor: e.detail.value })
    console.log(e.detail.value)
  },
  inputtel: function (e) {
    this.setData({ phonenum: e.detail.value })
    console.log(e.detail.value)
  },
  inputcarId: function (e) {
    this.setData({ carId: e.detail.value })
    console.log(e.detail.value)
  },
  // 用户选择车牌城市
  changeCity: function (e) {
    let { value } = e.detail;
    let { target } = e.target.dataset;
    target === 'city'
      ? this.setData({ carCityIndex: value })
      : this.setData({ carZimuIndex: value })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})