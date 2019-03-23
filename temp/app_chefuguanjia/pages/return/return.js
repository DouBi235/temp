const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: app.gd.imgUrl,
        status: 0,
        shenhe: 0,
        uid: '',
        CarownerData: {},
        notUpload: 0
    }, 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    skipUpload: function() { //如果用户没有上传保单,进行上传
        // wx.navigateTo({
        //   url: '../upload/upload?uid=' + this.data.uid,
        // })
        wx.request({ 
            url: app.gd.globalUrl + 'ubi/Refund/IfEqnum',
            data: {
                u_id: app.gd.uid,
                unionId: app.gd.unionId
            },
            method: 'GET',
            success: (res) => {
                console.log(res)
                if (res.data.code == 1) {
                    wx.navigateTo({
                        url: '../upload/upload?uid=' + this.data.uid,
                    })
                } else if (res.data.code == 0) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1500,
                    })
                }
            },
            fail: (res) => {},
            complete: (res) => {},
        })
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
        if (app.gd.uid === '') {
            wx.showModal({
                title: '提示',
                content: '未登录成功',
                showCancel: false,
                success: e => {
                    if (e) {
                        wx.switchTab({
                            url: '../index/index',
                        })
                    }
                }
            })
        } else {
            this.setData({
                uid: app.gd.uid
            })
            this.Policydata()
        }
    },
    Policydata() {
        wx.request({
            url: app.gd.globalUrl + 'ubi/Refund/policyList',
            method: 'POST',
            data: {
                uid: this.data.uid,
                unionId: app.gd.unionId
            },
            success: res => {
                console.log(res)
                if (res.data.code == 1) {
                    this.setData({
                        CarownerData: res.data.data,
                        notUpload: 0
                    })
                } else {
                    this.setData({
                        notUpload: 1
                    })
                }
            }
        })
    },
    SeeDetails() { //驳回跳转到详情页
        wx.navigateTo({
            url: '../RejectDetails/RejectDetails?uid=' + this.data.uid + '&pid=' + this.data.CarownerData.pid,
        })
    },
    JumpPolicy() { //如果保单过期了,让用户重新上传保单
        wx.navigateTo({
            url: '../upload/upload?uid=' + this.data.uid,
        })
    },
    JumpIndex() { //如果用户未激活OBD或者设备离线,让用户激活绑定设备
        wx.switchTab({
            url: '../index/index',
        })
    },
    againSubmit() { //如果用户保单审核未通过,让用户重新提交审核
        wx.navigateTo({
            url: '../upload/upload?uid=' + this.data.uid,
        })
    },
    //车主信息
    CarownerInformation() {
        wx.request({
            url: app.gd.globalUrl + 'ubi/Refund/plateDetail',
            data: {
                uid: this.data.uid
            },
            success: res => {

            }
        })
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