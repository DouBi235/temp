// pages/productDet/productDet.js
const WxParse = require('../../utils/wxParse/wxParse.js');
const app = getApp();
let spec1_arr = [];
let spec2_arr = [];
// 相同项遍历
function arrayUnique2(arr, name) {
  let key = '';
  let retult = [];
  for (key in arr) {
    retult.push(arr[key][name]);
  }
  return [...new Set(retult)];
}
// 查找出对应spec1 所有的spec2的值
function spec1To2 (allArr, arr, spec1) {
  return allArr.filter(res => res.spec1 === spec1)
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, // 默认 产品详情显示
    layerVisible: false,
    productId:'', // 产品ID
    productData: [], // 产品数据
    productShop: {}, // 商铺信息
    evaluate:'',
    proNum: 1,  //  微调里的数量
    
    ifselect: false,  // 是否选择商品 
    selectthis: 0,  // spec1的选项 选择细分的 index  如果 == index 则显示样式
    selectthis1: -1, // spec2 的选项index

    buyInfo: { sid: '', cid: '', sum: '', id: '' } // 确认购买的对象
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    that.setData({
      productId: options.id
    })
    wx.showLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/main/goodsDetail',
      data: {
        uid: app.globalData.uid,
        id: that.data.productId
      },
      success: function (res) {
        wx.hideLoading();
        // 获取商品信息
        let { goods, shop } = res.data.data;
        spec1_arr = arrayUnique2(goods.proDet, 'spec1');
        spec2_arr = arrayUnique2(goods.proDet, 'spec2');
        goods['spec1'] = spec1_arr;
        goods['spec2'] = spec1To2(goods.proDet, spec1_arr, spec1_arr[0]);
        console.log(goods);
        // 解析富文本产品详情
        try {
          WxParse.wxParse('details', 'html', goods.product.detail, that, 5);
        } catch (err) {
          console.log(err);
        }
        // 如果只有一种规格，默认选择第一个商品
        if (goods.specId[1] == null || goods.specId[1] == 0) {
          // 默认初始化商品
          Object.assign(that.data.buyInfo, {
            sid: goods.product.sid,
            cid: goods.product.id,
            id: goods['spec2'][0].spec_id,
            sum: that.data.proNum,
            spec1: goods['spec1'][0] || ''
          })
        }
        console.log(that.data.buyInfo);
        // console.log(d);
        that.setData({
          productData: goods,
          productShop: shop,
          colorData: spec1_arr,
          sizeData: spec2_arr,
          buyInfo: that.data.buyInfo
        })
        // console.log(that.data.productData);
      },
      complete: function () {
        wx.hideLoading();
      }
    });
    that.evaluateFn(that.data.productId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 弹出产品规格信息选择数量
  moveUpFn: function () { 
    // this.animation.translateY(-500).step()
    this.setData({
      ifselect:true,
      layerVisible: true
    })
  },
  moveDownFn: function () {
    // this.animation.translateY(500).step()
    this.setData({
      ifselect: false,
      layerVisible: false
    })
  },
  prevent: function(){  
    // 别删
  },
  toBuyPage: function () {
    var that = this;
    console.log(this.data.buyInfo);
    // 该商品是否为服务类商品
    if (this.data.productData.product.mold === 1) {
      Object.assign(this.data.buyInfo, {
        sid: this.data.productData.product.sid,
        cid: this.data.productData.product.id,
        id: this.data.productData.spec2[0].spec_id
      })
      this.setData({
        buyInfo: this.data.buyInfo
      })
    } else {
      // 未选择商品 提示用户
      if (this.data.buyInfo.id === '') {
        wx.showToast({
          title: '请选择商品规格!',
          icon: 'none'
        })
        return;
      }
    }
    // var thedata = this.data.this.productuctData; 
    // this.data.buyInfo['sum'] = this.data.proNum;
    console.log(this.data.buyInfo);
    this.data.buyInfo.cid = this.data.productData.product.id;
    this.data.buyInfo.sid = this.data.productData.product.sid;
    // var thebuy = this.data.buyData;
    // this.data.setData({
    //   buyInfo: thebuy
    // })
    var strdata = JSON.stringify(this.data.buyInfo);
    // console.log(strdata)
    that.moveDownFn();
    wx.navigateTo({
      url: '../make/make?strdata=' + strdata,
    })
  },
  callToShop: function() {
    var that = this;
    // console.log("callToShop Fn")
    var phoneNum = this.data.productShop.serphone; 
    wx.makePhoneCall({
      phoneNumber: phoneNum
    })
  },
  evaluateFn: function(id) {
    var that = this;
    wx.showLoading();
    wx.request({
      url: app.globalData.globalUrl + '/st/main/getEvaluate',
      data: {
        uid: app.globalData.uid,
        id: id
      },
      success: function (res) {
        wx.hideLoading();
        // console.log("产品评价", res)
        that.setData({
          evaluate: res.data.data
        })
        // console.log("页面保存的产品评价",that.data.evaluate);
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  reduceNum: function() {
    // console.log("reduceNum");
    var that = this;
    if (that.data.proNum == 1){
      return false;
    }
    var currentNum = that.data.proNum - 1;
    Object.assign(this.data.buyInfo, {
      sum: currentNum
    })
    that.setData({
      proNum: currentNum,
      buyInfo: this.data.buyInfo
    })
  },
  addNum: function() {
    // console.log("addNum");
    var that = this;
    var currentNum = that.data.proNum + 1;
    Object.assign(this.data.buyInfo, {
      sum: currentNum
    })
    that.setData({
      proNum: currentNum,
      buyInfo: this.data.buyInfo
    }) 
  },
  // spec1: 点击tab选项添加样式
  selectpro: function(e) {
    console.log(this.data.productData);
    var index = e.currentTarget.dataset.index;
    var value = e.currentTarget.dataset.value;
    var obj = e.currentTarget.dataset.obj;

    this.data.productData['spec2'] = spec1To2(this.data.productData.proDet, spec1_arr, value);
    // 应急处理方法: 商品只有一种规格
    if (this.data.productData.specId[1] == null) {
      Object.assign(this.data.buyInfo, {
        sid: this.data.productData.product.sid,
        cid: this.data.productData.product.id,
        id: this.data.productData.spec2[0].spec_id,
        spec1: value
      })
      this.setData({
        buyInfo: this.data.buyInfo
      })
    };
    this.setData({
      selectthis: index,
      productData: this.data.productData
    })
  },
  // spec2: tab点击
  selectpro1: function (e) {
    var index = e.currentTarget.dataset.index;
    var item = e.currentTarget.dataset.obj; // 商品对象 
    var buyinfo = Object.assign({}, this.data.buyInfo, {
      id: item.spec_id,
      spec1: item.spec1,
      spec2: item.spec2,
      sum: this.data.proNum
    })
    this.setData({
      selectthis1: index,
      buyInfo: buyinfo
    })
  },
  // tab 切换
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  }
})