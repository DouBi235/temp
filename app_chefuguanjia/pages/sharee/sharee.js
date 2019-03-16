// pages/sharee/sharee.js
import { config} from '../../utils/config.js';
const app = getApp(),
    url = getApp().gd.globalUrl;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: app.gd.imgUrl,
      zhimoney: config.zhimoney,
      bangmoney: config.bangmoney,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) { 
    },
    chaxun: function(e) {
        wx.request({
            url: url + 'ubi/plateSel/ifCanSelect',
            data: {
                uid: app.gd.uid,
                type: 1
                // type : 小程序类型：1-UBI管家，2-邦保养中的
            },
            method: 'POST',
            success: function(res) {
                if (res.data.code == 0) {
                    //用户未完善信息
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                        confirmText: '确定',
                        confirmColor: '#09bb07',
                        success: function(res) {
                            if (res.confirm) {
                                // dai---  点击确认后跳转到完善信息
                                wx.showToast({
                                    title: '应跳转到完善信息页',
                                    icon: 'none',
                                    duration: 1500,
                                })
                            }
                        },
                    })
                } else if (res.data.code == 1) {
                    // 可以查询 无查询历史 跳转到查询页
                    let data = JSON.stringify(res.data);
                    wx.navigateTo({
                        url: '../searchw/searchw?data=' + data,
                    })
                } else if (res.data.code == 2) {
                    // 有查询历史，且有违章记录后端将各项数据返回
                    let data = JSON.stringify(res.data);
                    wx.navigateTo({
                        url: '../breachRecord/breachRecord?data=' + data,
                    })
                } else if (res.data.code == 3) {
                    // 有查询历史，但当前wu违章记录
                    let data = JSON.stringify(res.data);
                    wx.navigateTo({
                        url: '../breachRecord/breachRecord?data=' + data,
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1500,
                    })
                }
            },
        })
    },
    /**
     * 
     */
    onShare: function(e) {
        let url = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: '../' + url + '/' + url,
        })
    }, 
})