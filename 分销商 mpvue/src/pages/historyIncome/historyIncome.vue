<template>
  <div class="indexPage">
    <div class="bg-blue indexheadbg fcsbfs">
      <view class="section">
        <picker
          mode="date"
          :value="showData"
          start="2015年09月"
          end="2017年09月"
          fields="month"
          @change="bindDateChange"
        >
          <view class="picker">
            {{showData}}
            <img src="../../../static/images/xiala.png" alt>
          </view>
        </picker>
      </view>
      <p class="labelj">
        <span class="value">{{yuan}}</span>元
      </p>
    </div>
    <empty-show text="暂无奖励记录" v-if="gongyingList.length == 0"></empty-show>
    <supply-list :list="gongyingList" @detail="getdet" v-else></supply-list>
  </div>
</template>

<script>
import emptyShow from "@/components/empty";
import supplyList from "@/components/supplyList";
export default {
  data() {
    return {
      current: "tab1",
      date: "2015-09",
      yuan: 0,
      gongyingList: [], // 列表
      gongyingpage: 1, // 当前页
      gongyingrows: 1, // 总页数
      gongyingcount: "" // 总条数
    };
  },
  computed: {
    showData() {
      return (
        this.date.substring(0, 4) + "年" + this.date.substring(5, 7) + "月"
      );
    },
    senddate() {
      return this.date.replace("-", "");
    }
  },
  components: {
    emptyShow,
    supplyList
  },
  methods: {
    // picker 选择改变
    bindDateChange(e) {
      this.date = e.mp.detail.value;
      this.initdata();
    },
    getFilterData() {
      if (this.gongyingpage > this.gongyingrows) {
        wx.showToast({
          title: "暂无更多",
          icon: "none",
          duration: 1500
        });
        return;
      }
      this.$fly
        .request({
          method: "post",
          url: "/fx/Info/facSupply",
          body: {
            page: this.gongyingpage,
            time: this.senddate
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.gongyingList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.gongyingList = li;
            this.gongyingpage++;
            this.gongyingrows = res.data.rows;
            this.gongyingcount = res.data.count;
            this.yuan = res.data.num;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 供应详情
    getdet(data) {
      if (data.status == 1) {
        wx.navigateTo({
          url: "../orderDet/main?id=" + data.id
        });
      } else if (data.status == 2) {
        wx.navigateTo({
          // auditDet  接受参数 status 0未审核    1通过     2 驳回
          url: "../auditDet/main?id=" + data.id + "&status=" + 1
        });
      }
    },
    initdata() {
      this.gongyingpage = 1;
      this.getFilterData();
    }
  },
  created() {},
  onShow() {
    this.initdata();
  },
  onReachBottom() {
    this.getFilterData();
  }
};
</script>

<style lang="scss" scoped>
.indexPage {
  min-height: 100vh;
  min-width: 100vw;
  background: #f5f5fa;
  padding-top: 100px;
  .indexheadbg {
    position: fixed;
    top: 0;
    width: 375px;
    height: 100px;
    padding: 10px 15px 20px;
    background: #1ea0ff;
    .section {
      .picker {
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        display: flex;
        align-items: center;
        img {
          margin-left: 4px;
          width: 18px;
          height: 18px;
        }
      }
    }
    .labelj {
      font-size: 12px;
      font-weight: 400;
      color: #fff;
      line-height: 17px;
    }
    .value {
      font-size: 30px;
      font-weight: 700;
      line-height: 34px;
      margin-right: 5px;
    }
  }
}
</style>
 