// pages/breachRecord/breachRecord.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageData: '',
        plate1: '',
        plate2: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let data = JSON.parse(options.data);
        this.setData({
            pageData: data.data,
            plate1: data.data.plateNumber.substring(0,2),
            plate2: data.data.plateNumber.substring(2,7),
        })
        wx.showModal({
            title: '提示',
            content: data.msg,
            showCancel: false, 
            confirmText: '我知道了',
            confirmColor: '#09bb07', 
        })
    },
    navSearch: function(){
        wx.navigateTo({
            url: '../searchw/searchw', 
        })
    }, 
})