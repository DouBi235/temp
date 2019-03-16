var pagey1 = 1,
    pagey2 = 1;
const app = getApp(),
    urlHeader = app.gd.globalUrl;
Page({
    data: {
        imgUrl: app.gd.imgUrl,
        listy1: [],
        rowsy1: 1,
        listy2: [],
        rowsy2: 1,
        three: '',
        currentTab: 0
    },
    onLoad: function(options) {
        let that = this;
    },
    onShow: function(e) {
        let that = this;
        pagey1 = 1;
        pagey2 = 1;
        this.getThree();
        this.getDriectAward();
        this.centerAward();
    },
    getThree: function(e) {
        let that = this;
        wx.request({
            url: urlHeader + 'ubi/Popularize/getTM',
            data: {
                // uid: 19,
                uid: app.gd.uid
            },
            method: 'POST',
            success: function(res) {
                that.setData({
                    three: res.data.data
                })
            }
        })
    },
    getDriectAward: function(e) {
        var that = this;
        if (that.data.rowsy1 < pagey1) {
            wx.showToast({
                title: '暂无更多',
                icon: 'none',
                duration: 1500
            })
            return false;
        }
        wx.showLoading()
        wx.request({
            url: urlHeader + 'ubi/Popularize/getDriectAward',
            data: {
                // uid: 19,
                uid: app.gd.uid,
                page: pagey1
            },
            method: 'POST',
            success: function(res) {
                if (res.data.code == 1) {
                    var thatlist = [];
                    var list = res.data.data.list;
                    var resrows = res.data.data.rows;
                    for (var i = 0; i < list.length; i++) {
                        thatlist.push(list[i]);
                    }
                    that.setData({
                        listy1: thatlist,
                        rowsy1: resrows
                    })
                    pagey1++;
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    })
                }
            },
            complete: function() {
                wx.hideLoading() 
            }
        })
    },
    uppery1: function() {
        this.getDriectAward();
    },
    lowery1: function() {
        this.getDriectAward();
    },
    centerAward: function(e) {
        var that = this;
        if (that.data.rowsy2 < pagey2) {
            wx.showToast({
                title: '暂无更多',
                icon: 'none',
                duration: 1500
            })
            return false;
        }
        wx.showLoading()
        wx.request({
            url: urlHeader + 'ubi/Popularize/centerAward',
            data: {
                // uid: 19,
                uid: app.gd.uid,
                page: pagey2
            },
            method: 'POST',
            success: function(res) {
                if (res.data.code == 1) {
                    var thatlist = that.data.listy2
                    var list = res.data.data.list;
                    var resrows = res.data.data.rows;
                    for (var i = 0; i < list.length; i++) {
                        thatlist.push(list[i]);
                    }
                    that.setData({
                        listy2: thatlist,
                        rowsy2: resrows
                    })
                    pagey2++;
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    })
                }
            },
            complete: function() {
                wx.hideLoading()
            }
        })
    },
    uppery2: function() {
        this.centerAward();
    },
    lowery2: function() {
        this.centerAward();
    },
    navToDet: function(e) {
        let id = e.currentTarget.dataset.item.son_unionId,
            item = JSON.stringify(e.currentTarget.dataset.item);
        wx.navigateTo({
            url: '../directDet/directDet?id=' + id + '&item=' + item,
        })
    },
    // 滚动切换标签样式
    switchTab: function(e) {
        var current = e.detail.current,
            that = this;
        this.setData({
            currentTab: current
        });
        that.setData({
            listy1: [],
            listy2: [],
        })
        if (current == 0) {
            pagey1 = 1
            that.getDriectAward();
        } else if (current == 1) {
            pagey2 = 1
            that.centerAward();
        }
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
})