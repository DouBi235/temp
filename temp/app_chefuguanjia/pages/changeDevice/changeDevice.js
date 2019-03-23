// pages/bindDevice/bindDevice.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: app.gd.imgUrl,
        num: 0,
        num2: 0,
        status: 1,
        showBtn: 0,
        deviceStatus: 0, //0 未绑定，1 运行中，2 异常，3休眠
        deviceCode: '',
        disabled: true,
        fristM: '',
        text: '',
        shopName: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getText()
        this.isBinding();
        //  没有传参为 show 和shopName的跳转
        // this.setData({
        //   show:options.show,
        //   shopName: options.shopName
        // })
    },
    getText: function() {
        let that = this;
        wx.request({
            url: app.gd.globalUrl + 'ubi/getText',
            data: {
                uid: app.gd.uid
            },
            method: 'POST',
            success: function(res) {
                that.setData({
                    aText: res.data.aText,
                })
            },
        })
    },
    isBinding: function() {
        let that = this;
        wx.request({
            url: app.gd.globalUrl + 'ubi/isBinding',
            data: {
                uid: app.gd.uid
            },
            method: 'POST',
            success: function(res) {
                // code	0 未绑定 1绑定  status1 运行中 0 关闭中
                if (res.data.code == 1) {
                    that.setData({
                        deviceCode: res.data.data.OBDID
                    })
                }
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    code: function() {
        var that = this;
        wx.scanCode({
            scanType: ['qrCode', 'barCode'],
            success: (res) => {
                that.setData({
                    num2: res.result
                })
                if ((res.result + '').length == 12) {
                    that.setData({
                        disabled: false
                    })
                } else {
                    that.setData({
                        disabled: true
                    })
                }
            }
        })
    },
    change: function() {
        var that = this;
        that.setData({
            showBtn: 1
        })
    },
    changeBtn: function() {
        let that = this;
        wx.request({
            url: app.gd.globalUrl + 'ubi/upBinding',
            data: {
                uid: app.gd.uid,
                obdid: that.data.num2,
                km: that.data.fristM
            },
            method: 'POST',
            success: function(res) {
                console.log("点击确认更换 设备", res)
                if (res.data.code == 1) {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                        confirmText: '确定',
                        confirmColor: '#09bb07',
                        success: function(res) {
                            wx.navigateBack({
                                delta: 1,
                            })
                        },
                    })
                } else if (res.data.code == 0) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1500,
                    })
                }
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    formInput: function(e) { //设备号
        var that = this;
        that.setData({
            num: e.detail.value
        })
       
    },
    formInput2: function(e) { //新设备号
        var that = this;
        that.setData({
            num2: e.detail.value
        })
        if ((e.detail.value + '').length == 12) {
            that.setData({
                disabled: false
            })
        } else {
            that.setData({
                disabled: true
            })
        }
       
    },
    formInput3: function(e) {
        var that = this;
        that.setData({
            fristM: e.detail.value
        })
        if ((that.data.num2 + '').length == 12 && that.data.fristM != '') {
            that.setData({
                disabled: false
            })
        } else {
            that.setData({
                disabled: true
            })
        }
       
    }, 
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})