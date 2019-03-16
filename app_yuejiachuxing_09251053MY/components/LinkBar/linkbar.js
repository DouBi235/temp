Component({
  properties: {
    hasmask: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    nolink: function (e) {
      wx.navigateTo({
        url: '/pages/nolink/nolink'
      })
    }
  }
})
