// pages/spread/spread.js
import {
  request as fetch
} from '../../utils/requestPromise.js';
import * as Wxuntil from '../../utils/wxUntil.js'
let app = getApp();
let scrollHeight = 0;
/** 修改 data 属性 */
const updateData = function(key, obj) {
  Object.assign(this.data[key], obj);
  this.setData({
    [key]: this.data[key]
  });
}
/** progress 最大人数 */
let maxPerson = 1000,
  maxProgress = 560,
  cacl = maxProgress / maxPerson;
/** 计算 tip 长度 */
const calcTipRpx = (person, num, w) => {
  if (person === num) {
    return w - 40
  }
  return w / num * person - 40;
}
/** 计算左侧 progress 长度 */
const calcLeftProgressRpx = num => num === 0 ? num : (num >= 500 ? maxProgress / 2.5 : num * cacl)
/** 计算右侧 progress 长度 */
const calcRightProgressRpx = num => num === 0 ? num : (num > 500 ? maxProgress / 2.3 : num * cacl)
let debounce = function(dely, action) {
  let last;
  return function() {
    clearTimeout(last);
    last = setTimeout(() => {
      action.apply(this);
    }, dely)
  }
}

const fixedOptionsConfig = {
  data: [],
  Pages: 1,
  currentPage: 1,
  loadingPage: false,
  allPage: false
}
Page({
  data: {
    yueee: '',
    imgUrl: app.gd.imgUrl,
    pageLoading: true,
    isActivity: true,
    cashLoading: false,
    /** 提现按钮loading */
    priceLoading: true,
    /** 顶部数据加载loading */
    role: '',
    okCashMoney: false,
    currentTab: 0,
    tipProgressRpx: 0,
    leftProgressRpx: 0,
    rightProgressRpx: 0,

    /* 顶部信息数据 */
    no: '',
    count: 0,
    tgzx: 0,
    V99: 0,
    reward: {},

    winHeight: "",
    isScroll: false,
    commonConfig: {
      target: 'common',
      data: [],
      Pages: 0,
      /** 总页数 */
      currentPage: 1,
      /** 页码 */
      loadingPage: false,
      allPage: false,
      url: '../spreadDetails/spreadDetails',
      msg: ''
    },
    chezhuConfig: {
      target: 'chezhu',
      data: [],
      msg: '',
      Pages: 1,
      currentPage: 1,
      url: '../spreadDetails/spreadDetails',
      loadingPage: false,
      allPage: false
    },
    weixiuchangConfig: {
      target: 'weixiuchang',
      data: [],
      Pages: 1,
      currentPage: 1,
      loadingPage: false,
      allPage: false
    },
    yunyingshangConfig: {
      target: 'yunyingshang',
      data: [],
      Pages: 1,
      currentPage: 1,
      loadingPage: false,
      allPage: false
    },
    youzhanConfig: {
      target: 'youzhan',
      data: [],
      Pages: 1,
      currentPage: 1,
      loadingPage: false,
      allPage: false
    },
    uhuiduoConfig: {
      target: 'uhuiduo',
      data: [],
      Pages: 1,
      currentPage: 1,
      loadingPage: false,
      allPage: false
    }

  },
  onShow: function() {
    this.getRole();
    this._getmoney();
  },
  onLoad: function(options) {
    this._initHeight();
    this._initchezhu();
    this._getCashMoney();
  },
  /** 获取角色,渲染页面设计 */
  getRole: function() {
    const role = new Map()
      .set(0, 'idenCommon')
      .set(1, 'idenSpread')
      .set(2, 'idenV99');
    // json文件中页面的名称；
    const pageJsonName = new Map()
      .set(0, '会员推广')
      .set(1, '推广中心')
      .set(2, 'v99')

    fetch('ubi/Popularize/getHeadInfo', 'POST', {
      uid: app.gd.uid,
    }).then(res => {
      if (res) {
        this.setData({
          priceLoading: false
        })
      }
      let {
        code,
        data: {
          V99,
          count,
          tgzx,
          detail: reward,
          per_info: _role,
          activity
        }
      } = res.data;
      // 修改页面json
      // wx.setNavigationBarTitle({
      //   title: pageJsonName.get(_role.type)
      // })
      let leftProgressRpx = calcRightProgressRpx(tgzx);
      let rightProgressRpx = calcRightProgressRpx(V99);
      /** 用户为普通用户的话 */
      this.setData({
        count,
        tgzx,
        V99,
        reward,
        role: role.get(_role.type),
        isActivity: activity,
        no: _role.type != 0 ? _role.No : 0,
        leftProgressRpx,
        rightProgressRpx,
        tipProgressRpx: calcTipRpx(count, tgzx, leftProgressRpx),
      })
    })
  },
  callto: function(e) {
    let num = (e.currentTarget.dataset.num + '');
    wx.makePhoneCall({
      phoneNumber: num,
    })
  },
  /** 获取推荐奖励列表数据 */
  _initchezhu: function(page = 1, lazyMore = false) {
    /** 该接口 正在上拉加载更多状态 */
    updateData.call(this, 'chezhuConfig', {
      loadingPage: true
    });
    fetch('ubi/Popularize/getDriectAward', 'POST', {
      uid: app.gd.uid,
      page: page
    }).then(res => {
      if (res) {
        this.setData({
          pageLoading: false
        })
      }
      this.HandleCallback('chezhuConfig', res, lazyMore);
    })
  },
  /** 获取中心奖励 */
  _initweixiuchang: function(page = 1, lazyMore = false) {
    /** 该接口 正在上拉加载更多状态 */
    updateData.call(this, 'weixiuchangConfig', {
      loadingPage: true
    });
    fetch('ubi/Popularize/csList', 'POST', {
      uid: app.gd.uid,
      page: page
    }).then(res => {
      this.HandleCallback('weixiuchangConfig', res, lazyMore);
    })
  },
  /** 获取分红 */
  _inityunyingshang: function(page = 1, lazyMore = false) {
    /** 该接口 正在上拉加载更多状态 */
    updateData.call(this, 'yunyingshangConfig', {
      loadingPage: true
    });
    fetch('ubi/Popularize/caList', 'POST', {
      uid: app.gd.uid,
      page: page
    }).then(res => {
      this.HandleCallback('yunyingshangConfig', res, lazyMore)
      // console.log(res)
    })
  },
  /** 获取培养奖励 */
  _inityouzhan: function(page = 1, lazyMore = false) {
    /** 该接口 正在上拉加载更多状态 */
    updateData.call(this, 'youzhanConfig', {
      loadingPage: true
    });
    fetch('ubi/Popularize/profitList', 'POST', {
      uid: app.gd.uid,
      page: page
    }).then(res => {
      this.HandleCallback('youzhanConfig', res, lazyMore)
      console.log(res)
    })
  },
  /** 获取普通用户推广奖励 */
  _inituhuiduo: function(page = 1, lazyMore = false) {
    /** 该接口 正在上拉加载更多状态 */
    updateData.call(this, 'uhuiduoConfig', {
      loadingPage: true
    });
    fetch('ubi/Popularize/oilList', 'POST', {
      uid: app.gd.uid,
      page: page
    }).then(res => {
      this.HandleCallback('uhuiduoConfig', res, lazyMore);
    })
  },
  /** 获取可提现金额 */
  _getCashMoney: function() {
    fetch('ubi/Popularize/getCanCashMoney', 'POST', {
      uid: app.gd.uid
    }).then(res => {
      let isCash = res.data ? true : false
      this.setData({
        okCashMoney: res.data
      })
    })
  },
  /** fetch 请求事件处理 */
  HandleCallback: function(key, result, lazyMore, ...args) {
    /** update loading is false */
    if (result) {
      updateData.call(this, key, {
        loadingPage: false
      });
    }
    let {
      data: {
        code,
        data: {
          list,
          rows
        },
        msg
      }
    } = result;

    /** First request no Data */
    if (this.data[key]['Pages'] === 1 && code === 0) {
      wx.showToast({
        title: msg,
        icon: 'none'
      });
      updateData.call(this, key, {
        data: this.data[key]['data'],
        msg
      });
      /** 此处 380rpx, 根据图片:280 + marginTop:60 + 文字 计算，后期可自动计算高度 */
      this.setData({
        winHeight: `700`
      });
      return;
    }
    if (code === 0) {
      updateData.call(this, key, {
        msg
      });
    }
    /** 如果是下拉加载更多 将获取的数据 push 原数组中 */
    if (lazyMore) {
      this.data[key]['data'].push(...list)
    } else {
      this.data[key]['data'] = list
    };

    /** 分页数目加1 */
    this.data[key]['currentPage']++;
    updateData.call(this, key, {
      data: this.data[key]['data'] || [],
      currentPage: this.data[key]['currentPage'],
      Pages: rows
    });
    // console.log(this.data[key]['currentPage'])
  },
  /** 滚动标签切换样式, 依次调用相应方法 */
  switchTab: function(e) {
    let __index = e.detail.current;
    this.setData({
      currentTab: __index
    });
    switch (__index) {
      case 0:
        // this._initRecommend(this.data.recommendConfig.);
        Object.assign(this.data.chezhuConfig, fixedOptionsConfig);
        this._initchezhu();
        break
      case 1:
        Object.assign(this.data.weixiuchangConfig, fixedOptionsConfig)
        this._initweixiuchang()
        // 根据模块数据 来改变 scrollView 的高度,暂时不加入,用户体验太大
        // if (this.data.centerConfig.data.length === 0) { this.setData({winHeight: '380'}) }
        // else { this.setData({ winHeight: scrollHeight }) }
        break
      case 2:
        Object.assign(this.data.yunyingshangConfig, fixedOptionsConfig)
        this._inityunyingshang()
        break
      case 3:
        Object.assign(this.data.youzhanConfig, fixedOptionsConfig)
        this._inityouzhan()
        break
      case 4:
        Object.assign(this.data.uhuiduoConfig, fixedOptionsConfig)
        this._inituhuiduo()
        break
    }
    this.checkCor();
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  _initHeight: function() {
    Wxuntil.screenHeight().then(res => {
      let {
        height,
        dpr
      } = res
      this.setData({
        winHeight: height * dpr - 90
      })
    })
  },
  /** 获取 固定 Dom 据顶部高度 */
  getDomToHeight: function() {
    Wxuntil.getSelectorAttr({
        property: 'top'
      }, '#tabfixed')
      .then(_top => {
        if (~~_top < 10) {
          this.setData({
            isScroll: true
          })
        } else this.setData({
          isScroll: false
        })
      })
  },
  /** 监听页面滚动，改变scroll 可滑动状态 */
  onPageScroll: debounce(100, function() {
    if (this.data.role === 'idenCommon') return;
    this.getDomToHeight()
  }),
  /** 推荐奖励，等 TabBar Scroll 上啦加载 */
  toLower: function(e) {
    let {
      target
    } = e.target.dataset;
    switch (target) {
      case 'chezhu':
        this._lazyMore('chezhuConfig')
        // this._initRecommend(this.data.recommendConfig.currentPage, true)
        break;
      case 'weixiuchang':
        this._lazyMore('weixiuchangConfig')
        break;
      case 'yunyingshang':
        this._lazyMore('yunyingshangConfig')
        break;
      case 'youzhan':
        this._lazyMore('youzhanConfig')
        break;
      case 'uhuiduo':
        this._lazyMore('uhuiduoConfig')
        break;
    }
  },
  /** 普通用户 上啦加载事件 */
  onReachBottom: function(e) {
    if (this.data.role !== 'idenCommon') return;
    this._lazyMore('chezhuConfig')
    // console.log('普通用户 上啦加载')
  },
  /** 详情页面跳转 */
  navigatorTo: function(e) {
    let {
      currentTarget: {
        dataset: {
          target,
          item
        }
      }
    } = e;
    wx.navigateTo({
      url: '../spreadDetails/spreadDetails?item=' + JSON.stringify({
        sonid: item.son_unionId,
        name: item.name,
        money: item.money,
        head_pic: item.head_pic,
        create_time: item.create_time,
        indirect: item.indirect
      }),
    })
  },
  /** 加载更多 */
  _lazyMore: function(key) {
    if (this.data[key]['loadingPage'] ||
      this.data[key]['Pages'] < this.data[key]['currentPage']
    ) {
      updateData.call(this, key, {
        allPage: true
      });
      return;
    }
    /** 执行加载更多 */
    if (key === 'chezhuConfig') this._initchezhu(this.data.chezhuConfig.currentPage, true);
    if (key === 'weixiuchangConfig') this._initweixiuchang(this.data.weixiuchangConfig.currentPage, true);
    if (key === 'yunyingshangConfig') this._inityunyingshang(this.data.yunyingshangConfig.currentPage, true);
    if (key === 'youzhanConfig') this._inityouzhan(this.data.youzhanConfig.currentPage, true);
    if (key === 'uhuiduoConfig') this._inituhuiduo(this.data.uhuiduoConfig.currentPage, true);
  },
  /** 点击提现 */
  cashBtn: function(e) {
    this.setData({
      cashLoading: true
    })

    /** 首先判断是否完善信息 */
    fetch('ubi/Popup/moneyInfo', 'POST', {
      uid: app.gd.uid
    }).then(res => {
      if (res) {
        this.setData({
          cashLoading: false
        })
      }
      let {
        code
      } = res.data
      /** 用户未完善信息 */
      if (code === 0) {
        Wxuntil.alert._showModal('', '请填写提现账户', {
          confirm: () => {
            /** 路由跳转 */
            Wxuntil.router('../tixian/tixian', {
              /** 参数格式 */
              'key': 'value'
            })
          }
        }, '去填写')
      } else {
        Wxuntil.alert._showModal('确认提现', '可提现金额 ' + this.data.yueee.balance + '元', {
          confirm: () => {

            this.setData({
              cashLoading: true
            })
            /** 提现接口 */
            fetch('ubi/Popularize/deposit', 'POST', {
              uid: app.gd.uid,
            }).then(res => {
              if (res) {
                this.setData({
                  cashLoading: false
                })
              }
              if (res.data.code === 1) {
                Wxuntil.alert._showToast({
                  title: res.data.msg
                })
                // 重新获取金额
                this._getmoney();
              } else {
                Wxuntil.alert._showToast({
                  title: res.data.msg
                })
              }
              console.log(res);
            })
          }
        })
      }
    })
  },
  // 获取累计收入和可提现金额
  _getmoney: function() {
    fetch('ubi/Popularize/ceshi', 'POST', {
      uid: app.gd.uid,
    }).then(res => {
      this.setData({
        yueee: res.data
      })
    });
  },
})