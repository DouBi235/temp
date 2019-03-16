// pages/mileage/mileage.js
const app = getApp();
let intervalRequest;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: app.gd.imgUrl,
        detail: [{
            num: 0,
            money: 0,
            date: '2018-08-08'
        }],
        pageData: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        if (prevPage.data.deviceStatus == 0) {
            wx.showModal({
                title: '提示',
                content: '您还未绑定设备，请先绑定设备',
                showCancel: true,
                confirmText: '去绑定',
                confirmColor: '#09bb07',
                success: function(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '../bindDevice/bindDevice',
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                },
            })
        } else {
            this.getMileage();
        }
        intervalRequest = setInterval(() => {
            this.getMileage();
        }, 1000 * 60 * 5)
    },
    onUnload: function() {
        clearInterval(intervalRequest);
    },
    getMileage: function() {
        let that = this;
        wx.request({
            url: app.gd.globalUrl + 'ubi/getMileage',
            data: {
                uid: app.gd.uid
            },
            method: 'POST',
            success: function(res) {
                console.log("行驶里程", res)
                if (res.data.code == 1) {
                    that.setData({
                        pageData: res.data.data
                    })
                } else if (res.data.code == 0) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1500,
                    })
                }
            },
        })
    }
})