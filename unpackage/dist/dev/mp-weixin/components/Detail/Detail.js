"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "Detail",
  data() {
    return {
      // 记录当前商品的id
      id: 0,
      // 记录当前的商品
      item: {},
      // 轮播图数组
      imgArr: [],
      // 展示详情数组
      imgArr2: [],
      // 是否显示面板指示点
      indicatorDots: true,
      // 是否自动切换
      autoplay: true,
      // 自动切换时间间隔
      interval: 2e3,
      // 滑动动画时长
      duration: 800,
      // 酒精图片的路径前缀
      baseUrl: "https://dianjiu.oss-cn-beijing.aliyuncs.com"
    };
  },
  methods: {
    // 向vuex仓库中添加东西
    addList() {
      this.$store.commit("addList", this.item);
      common_vendor.index.showToast({
        title: "加购成功",
        //将值设置为 success 或者直接不用写icon这个参数
        icon: "success",
        //显示持续时间为 2秒
        duration: 2e3
      });
      console.log(this.$store.state.item);
    },
    // 导航栏跳转
    navTo() {
      common_vendor.index.switchTab({
        url: "../../pages/shoplist/index"
      });
    },
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots;
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      this.interval = e.target.value;
    },
    durationChange(e) {
      this.duration = e.target.value;
    }
  },
  onLoad: function(option) {
    this.id = option.id;
    common_vendor.index.request({
      url: "http://118.190.158.17:8006/AopAndMyBatis2/wxview/getOneWine?id=" + this.id,
      success: (res) => {
        this.item = res.data;
        console.log(res.data);
        this.imgArr = res.data.imgDetail;
        this.imgArr2 = res.data.slideDetail;
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.imgArr, (item, index, i0) => {
      return {
        a: $data.baseUrl + item.url,
        b: index
      };
    }),
    b: $data.indicatorDots,
    c: $data.autoplay,
    d: $data.interval,
    e: $data.duration,
    f: common_vendor.t($data.item.commodity_price),
    g: common_vendor.t($data.item.commodity_sales),
    h: common_vendor.f($data.imgArr2, (item, index, i0) => {
      return {
        a: index,
        b: $data.baseUrl + item.url
      };
    }),
    i: common_vendor.o((...args) => $options.addList && $options.addList(...args)),
    j: common_vendor.o((...args) => $options.navTo && $options.navTo(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a9a45c52"], ["__file", "F:/web/Project/uniapp/components/Detail/Detail.vue"]]);
wx.createPage(MiniProgramPage);
