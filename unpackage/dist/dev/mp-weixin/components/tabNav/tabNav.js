"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      active: 1,
      imgflag1: true,
      imgflag2: true,
      // 存储当前的id
      id: 0,
      // 酒精图片的路径前缀
      baseUrl: "https://dianjiu.oss-cn-beijing.aliyuncs.com",
      // 存放列表数据
      list: [],
      // input框中的值
      value: "",
      bottom: false
    };
  },
  methods: {
    // 导航栏跳转
    navTo(id) {
      common_vendor.index.navigateTo({
        url: `../../components/Detail/Detail?id=${id}`
      });
    },
    // 初始化时，请求方法
    getList() {
      common_vendor.index.request({
        url: "http://118.190.158.17:8006/AopAndMyBatis2/wxview/getWineClassify?id=" + this.id,
        //仅为示例，并非真实接口地址。
        success: (res) => {
          this.list = res.data;
        }
      });
    },
    // 分类请求方法
    setList(str) {
      common_vendor.index.request({
        url: " http://118.190.158.17:8006/AopAndMyBatis2/wxview/" + str,
        success: (res) => {
          this.list = res.data;
        }
      });
    },
    changeActive(e) {
      if (e.target.nodeName == "LI") {
        this.imgflag1 = true, this.imgflag2 = true;
        this.active = e.target.getAttribute("active");
        let val = e.target.getAttribute("val");
        console.log("active值为", e.target.active);
        let str;
        switch (val) {
          case "default":
          case "sate":
            str = "getWineClassify?id=" + this.id;
            this.setList(str);
            break;
          case "sales":
            str = "getSalesClassify?id=" + this.id;
            this.setList(str);
            break;
          case "price":
            str = "getDescClassify?id=" + this.id;
            this.setList(str);
            break;
        }
      }
    },
    upArr() {
      console.log("升序");
      this.imgflag1 = false, this.imgflag2 = true;
      let str = "getDescClassify?id=" + this.id;
      this.setList(str);
    },
    downArr() {
      console.log("降序");
      this.imgflag1 = true, this.imgflag2 = false;
      let str = "getAscClassify?id=" + this.id;
      this.setList(str);
    },
    // 搜索
    search() {
      let str = "getWineClassify?name=" + this.value;
      this.setList(str);
      this.value = "";
    }
  },
  // 注意与method同级
  // navigate.vue页面接受参数，页面被加载时触发
  onLoad: function(option) {
    this.id = option.id;
    this.setList("getWineClassify?id=" + this.id);
  },
  //下拉刷新
  onPullDownRefresh() {
    console.log("下拉");
    this.getList();
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  // 上拉加载更多
  onReachBottom() {
    console.log("上拉");
    if (this.list.length >= 15) {
      this.bottom = true;
    } else {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.request({
          url: "http://118.190.158.17:8006/AopAndMyBatis2/wxview/getWineClassifys?id=" + this.id + "&count=3",
          success: (res) => {
            this.list = this.list.concat(res.data);
            console.log(res.data);
          }
        });
      }, 1e3);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "search",
      size: "30"
    }),
    b: $data.value,
    c: common_vendor.o(($event) => $data.value = $event.detail.value),
    d: common_vendor.o((...args) => $options.search && $options.search(...args)),
    e: $data.active == "1" ? 1 : "",
    f: $data.active == "2" ? 1 : "",
    g: $data.active == "3" ? 1 : "",
    h: $data.imgflag1,
    i: common_vendor.o((...args) => $options.upArr && $options.upArr(...args)),
    j: !$data.imgflag1,
    k: $data.imgflag2,
    l: common_vendor.o((...args) => $options.downArr && $options.downArr(...args)),
    m: !$data.imgflag2,
    n: $data.active == "4" ? 1 : "",
    o: common_vendor.o((...args) => $options.changeActive && $options.changeActive(...args)),
    p: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: $data.baseUrl + item.picture_url,
        b: common_vendor.t(item.commodity_name),
        c: common_vendor.t(item.commodity_price),
        d: common_vendor.t(item.commodity_sales),
        e: index,
        f: common_vendor.o(($event) => $options.navTo(item.commodity_id), index)
      };
    }),
    q: $data.bottom
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5f542320"], ["__file", "F:/web/Project/uniapp/components/tabNav/tabNav.vue"]]);
wx.createPage(MiniProgramPage);
