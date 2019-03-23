// pages/faultWarning/faultWarning.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        warnTip: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        if (prevPage.data.deviceStatus == 0) {
            this.getWarning();
            // wx.showModal({
            //     title: '提示',
            //     content: '您还未绑定设备，请先绑定设备',
            //     showCancel: true,
            //     confirmText: '去绑定',
            //     confirmColor: '#09bb07',
            //     success: function(res) {
            //         if (res.confirm) {
            //             wx.redirectTo({
            //                 url: '../bindDevice/bindDevice',
            //             })
            //         } else if (res.cancel) {
            //             console.log('用户点击取消')
            //         }
            //     },
            // })
        } else {
            this.getWarning();
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    getWarning: function() {
        let that = this;
        wx.showLoading()
        wx.request({
            url: app.gd.globalUrl + 'ubi/Collision/collRem',
            data: {
                uid: app.gd.uid
            },
            method: 'POST',
            success: function(res) {
                wx.hideLoading()
                console.log("碰撞提醒页面： ", res)
                if (res.data.code == 1) {
                    that.setData({
                        warnTip: res.data.data
                    })
                } else if (res.data.code == 0) {
                    that.setData({
                        warnTip: []
                    })
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1500,
                    })
                }
            },
        })
    },
    ignoreBtn: function(e) {
        console.log(e)
        let that = this,
            id = e.currentTarget.dataset.id;
        wx.request({
            url: app.gd.globalUrl + 'ubi/Remind/crashLose',
            data: {
                uid: app.gd.uid,
                flag: id
            },
            method: 'POST',
            success: function(res) {
                console.log("故障预警页面： ", res)
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1500,
                })
                that.getWarning();
            },
        })
    }
})