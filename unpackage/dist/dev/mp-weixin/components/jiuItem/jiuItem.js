"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "jiuItem",
  props: ["id"],
  data() {
    return {
      // 酒精
      jiu: [],
      // 酒精图片的路径前缀
      baseUrl: "https://dianjiu.oss-cn-beijing.aliyuncs.com"
    };
  },
  created() {
    common_vendor.index.request({
      url: "http://118.190.158.17:8006/AopAndMyBatis2/wxview/getWineClassify?id=" + this.id,
      //仅为示例，并非真实接口地址。
      success: (res) => {
        this.jiu = res.data.reverse().slice(0, 4);
        console.log(res.data);
      }
    });
  },
  methods: {
    // 导航栏跳转
    navTo(id) {
      common_vendor.index.navigateTo({
        url: `../../components/Detail/Detail?id=${id}`
      });
    },
    toNav() {
      common_vendor.index.navigateTo({
        url: "../../components/tabNav/tabNav?id=" + this.id
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.toNav && $options.toNav(...args)),
    b: common_vendor.o((...args) => $options.toNav && $options.toNav(...args)),
    c: common_vendor.f($data.jiu, (item, index, i0) => {
      return {
        a: $data.baseUrl + item.picture_url,
        b: common_vendor.t(item.commodity_name),
        c: common_vendor.t(item.commodity_price),
        d: index,
        e: common_vendor.o(($event) => $options.navTo(item.commodity_id), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cd969742"], ["__file", "F:/web/Project/uniapp/components/jiuItem/jiuItem.vue"]]);
wx.createComponent(Component);
