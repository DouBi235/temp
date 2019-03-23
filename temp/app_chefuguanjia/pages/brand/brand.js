var app = getApp(),
  urlHeader = app.gd.globalUrl;
Page({
  data: {
    az: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

  },
  onLoad: function (options) {
    var that = this;
    //获取汽车品牌
    wx.showLoading({
      title: '数据加载中',
    });
    wx.request({
      url: urlHeader + 'ubi/Home/getBrand',
      success:  (res)=> { 
        if (res.data.code == 1) {
          var arr = res.data.data;
          // console.log(arr);
          var az = that.data.az, signA = [], signB = [], signC = [], signD = [], signE = [], signF = [],
          signG=[],signH=[],signI=[],signJ=[],signK=[],signL=[],signM=[],signN=[],signO=[],signP=[],signQ=[],
          signR=[],signS=[],signT=[],signU=[],signV=[],signW=[],signX=[],signY=[],signZ=[];
          for (var k = 0; k < az.length; k++) {
            az[k] = az[k].toLowerCase();
            // console.log(az[k]);
          }
          for (var i = 0; i < arr.length; i++) {
            arr[i].abbr = arr[i].abbr.substring(0, 1);
            // console.log(arr[i]);
            if (arr[i].abbr === 'a') {
              signA.push(arr[i]);
              that.setData({
                signA: signA
              });
            }
            if (arr[i].abbr === 'b') {
              signB.push(arr[i]);
              that.setData({
                signB: signB
              });
            }
            if (arr[i].abbr === 'c') {
              signC.push(arr[i]);
              that.setData({
                signC: signC
              });
            }
            if (arr[i].abbr === 'd') {
              signD.push(arr[i]);
              that.setData({
                signD: signD
              });
            }
            if (arr[i].abbr === 'e') {
              signE.push(arr[i]);
              that.setData({
                signE: signE
              });
            }
            if (arr[i].abbr === 'f') {
              signF.push(arr[i]);
              that.setData({
                signF: signF
              });
            }
            if (arr[i].abbr === 'g') {
              signG.push(arr[i]);
              that.setData({
                signG: signG
              });
            }
            if (arr[i].abbr === 'h') {
              signH.push(arr[i]);
              that.setData({
                signH: signH
              });
            }
            if (arr[i].abbr === 'i') {
              signI.push(arr[i]);
              that.setData({
                signI: signI
              });
            }
            if (arr[i].abbr === 'j') {
              signJ.push(arr[i]);
              that.setData({
                signJ: signJ
              });
            }
            if (arr[i].abbr === 'k') {
              signK.push(arr[i]);
              that.setData({
                signK: signK
              });
            }
            if (arr[i].abbr === 'l') {
              signL.push(arr[i]);
              that.setData({
                signL: signL
              });
            }
            if (arr[i].abbr === 'm') {
              signM.push(arr[i]);
              that.setData({
                signM: signM
              });
            }
            if (arr[i].abbr === 'n') {
              signN.push(arr[i]);
              that.setData({
                signN: signN
              });
            }
            if (arr[i].abbr === 'o') {
              signO.push(arr[i]);
              that.setData({
                signO: signO
              });
            }
            if (arr[i].abbr === 'p') {
              signP.push(arr[i]);
              that.setData({
                signP: signP
              });
            }
            if (arr[i].abbr === 'q') {
              signQ.push(arr[i]);
              that.setData({
                signQ: signQ
              });
            }
            if (arr[i].abbr === 'r') {
              signR.push(arr[i]);
              that.setData({
                signR: signR
              });
            }
            if (arr[i].abbr === 's') {
              signS.push(arr[i]);
              that.setData({
                signS: signS
              });
            }
            if (arr[i].abbr === 't') {
              signT.push(arr[i]);
              that.setData({
                signT: signT
              });
            }
            if (arr[i].abbr === 'u') {
              signU.push(arr[i]);
              that.setData({
                signU: signU
              });
            }
            if (arr[i].abbr === 'v') {
              signV.push(arr[i]);
              that.setData({
                signV: signV
              });
            }
            if (arr[i].abbr === 'w') {
              signW.push(arr[i]);
              that.setData({
                signW: signW
              });
            }
            if (arr[i].abbr === 'x') {
              signX.push(arr[i]);
              that.setData({
                signX: signX
              });
            }
            if (arr[i].abbr === 'y') {
              signY.push(arr[i]);
              that.setData({
                signY: signY
              });
            }
            if (arr[i].abbr === 'z') {
              signZ.push(arr[i]);
              that.setData({
                signZ: signZ
              });
            }
          }
          wx.hideLoading();
        }
        if(res.data.code==0){
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel:false
          })
        }
      }
    })
  },
  onShow: function () {

  },
  sideClick: function (e) {
    var that = this;
    that.setData({ toview: e.currentTarget.dataset.id });
  },
  onReachBottom: function () {
 
  },
  skip:function(e){
    var that=this,
    b_id=e.currentTarget.dataset.id,
    name=e.currentTarget.dataset.name;
    wx.setStorage({
      key: 'brand_id',
      data: b_id,
    });
    wx.setStorage({
      key: 'brand_name',
      data: name,
    })
    wx.navigateBack({
      delta:1
    })
  }
})