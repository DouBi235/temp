// pages/pingxing.js 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    liang: {
      type: Number,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    liang:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    qian: function(e) {
      let id = Number(e.currentTarget.id) + 1;
      console.log(id, this.data.liang, 'qian', e)
      this.triggerEvent('uppdata',{liang: id},{opt: 321})
      this.setData({
        liang: id
      })
    },
    hou: function(e) {
      let id = Number(e.currentTarget.id) + 1,
        liang = Number(this.data.liang);
      console.log(id, liang, 'hou', e)
      this.triggerEvent('uppdata', { liang: id + liang})
      this.setData({
        liang: id + liang
      })
    },
  }
})