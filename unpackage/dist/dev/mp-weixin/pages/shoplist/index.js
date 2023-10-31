"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // vuex仓库中的数据
      list: [],
      flag1: false,
      // 选中个数
      chooseNum: 0,
      //总价
      // price:2000,
      // 酒精图片的路径前缀
      baseUrl: "https://dianjiu.oss-cn-beijing.aliyuncs.com"
    };
  },
  watch: {
    chooseNum: {
      deep: true,
      handler(newVal, oldVal) {
        if (this.chooseNum == this.list.length && this.chooseNum != 0) {
          console.log("相等了");
          this.flag1 = true;
        } else {
          this.flag1 = false;
          console.log("不等");
        }
      }
      // immediate:true
    }
  },
  computed: {
    price() {
      let all = 0;
      this.list.forEach((item) => {
        if (item.flag) {
          all += item.commodity_price * item.num;
        }
      });
      return all;
    }
  },
  methods: {
    del(item) {
      if (confirm("确定删除该商品吗？")) {
        this.list = this.list.filter((li) => li.commodity_id != item.commodity_id);
      } else {
        alert("已取消删除");
      }
    },
    allchoose() {
      this.flag1 = !this.flag1;
      if (this.flag1) {
        this.chooseNum = this.list.length;
        console.log(this.chooseNum);
      } else {
        this.chooseNum = 0;
        console.log(this.chooseNum);
      }
      this.list.forEach((item) => {
        item.flag = this.flag1;
      });
    },
    itemchoose(item) {
      item.flag = !item.flag;
      if (item.flag) {
        this.chooseNum += 1;
      } else {
        this.chooseNum -= 1;
      }
      console.log(this.chooseNum);
    },
    // 导航栏跳转
    navTo() {
      common_vendor.index.switchTab({
        url: "../../pages/index/index"
      });
    },
    // 减少数量
    reduce(item) {
      if (item.num <= 1) {
        if (confirm("确定删除该商品吗？")) {
          this.list = this.list.filter((li) => li.commodity_id != item.commodity_id);
        }
      } else {
        item.num--;
      }
    },
    // 添加数量
    add(item) {
      if (item.num >= 9) {
        alert("商品达到最大数量");
      } else {
        item.num++;
      }
    }
  },
  onLoad: function(option) {
    this.list = this.$store.state.List;
    console.log(this.list);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.list.length
  }, !$data.list.length ? {
    b: common_vendor.o((...args) => $options.navTo && $options.navTo(...args))
  } : {}, {
    c: $data.list.length
  }, $data.list.length ? {
    d: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.flag,
        b: common_vendor.o(($event) => $options.itemchoose(item), index),
        c: $data.baseUrl + item.picture_url,
        d: common_vendor.t(item.commodity_name),
        e: common_vendor.t(item.commodity_price * item.num),
        f: common_vendor.o(($event) => $options.del(item), index),
        g: common_vendor.o(($event) => $options.reduce(item), index),
        h: common_vendor.t(item.num),
        i: common_vendor.o(($event) => $options.add(item), index),
        j: index
      };
    }),
    e: $data.flag1,
    f: common_vendor.o((...args) => $options.allchoose && $options.allchoose(...args)),
    g: common_vendor.t($options.price)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-54fa9ca4"], ["__file", "F:/web/Project/uniapp/pages/shoplist/index.vue"]]);
wx.createPage(MiniProgramPage);
