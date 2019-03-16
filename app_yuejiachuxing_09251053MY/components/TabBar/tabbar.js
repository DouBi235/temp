const app = getApp()
Component({
  properties: {
    curtab: {
      type: String,
      value: ''
    }
  },
  methods: {
    tabtap: function (e) {
      const tab = this.properties.curtab
      const to = e.currentTarget.dataset.to
      if (tab == to) { return; }
      const islogin = app.globalData.uid
      if (!islogin) {
        wx.showModal({
          title: '提示',
          content: '您还没有登录',
          showCancel: false,
          confirmColor: '#21C5BD'
        })
        return;
      }
      switch (to) {
        case 'home': wx.redirectTo({
          url: '/pages/index/index'
        }); break;
        case 'publish': wx.redirectTo({
          url: '/pages/publish/form'
        }); break;
        case 'mine': wx.redirectTo({
          url: '/pages/person/mine'
        }); break;
      }
    }
  }
})
