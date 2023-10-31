"use strict";
const common_vendor = require("../../common/vendor.js");
const jiuItem = () => "../../components/jiuItem/jiuItem.js";
const _sfc_main = {
  data() {
    return {
      swiperImg: [
        "/static/lunbotu/banner1.jpg",
        "/static/lunbotu/banner2.jpg",
        "/static/lunbotu/banner3.jpg",
        "/static/lunbotu/banner4.jpg"
      ],
      // 是否显示面板指示点
      indicatorDots: true,
      // 是否自动切换
      autoplay: true,
      // 自动切换时间间隔
      interval: 3e3,
      // 滑动动画时长
      duration: 800,
      // 中间导航跳转
      tabberList: [
        {
          "title": "啤酒",
          "icon": "/static/navWine/pijiu.png"
        },
        {
          "title": "白酒",
          "icon": "/static/navWine/baijiu.png"
        },
        {
          "title": "红酒",
          "icon": "/static/navWine/hongjiu.png"
        },
        {
          "title": "洋酒",
          "icon": "/static/navWine/yangjiu.png"
        },
        {
          "title": "全部",
          "icon": "/static/navWine/all.png"
        }
      ]
    };
  },
  components: {
    jiuItem
  },
  methods: {
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
  methods: {}
};
if (!Array) {
  const _easycom_jiuItem2 = common_vendor.resolveComponent("jiuItem");
  _easycom_jiuItem2();
}
const _easycom_jiuItem = () => "../../components/jiuItem/jiuItem.js";
if (!Math) {
  _easycom_jiuItem();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperImg, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: $data.indicatorDots,
    c: $data.autoplay,
    d: $data.interval,
    e: $data.duration,
    f: common_vendor.f($data.tabberList, (tabber, index, i0) => {
      return {
        a: tabber.icon,
        b: common_vendor.t(tabber.title),
        c: "../../components/tabNav/tabNav?id=" + (index + 1),
        d: index
      };
    }),
    g: common_vendor.p({
      id: "1"
    }),
    h: common_vendor.p({
      id: "2"
    }),
    i: common_vendor.p({
      id: "3"
    }),
    j: common_vendor.p({
      id: "4"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/web/Project/uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
