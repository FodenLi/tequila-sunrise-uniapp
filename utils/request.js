//定义全局公共的访问基础路径
const baseUrl = "http://localhost:8808"
//封装函数
function request(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			method: options.method || "GET",
			data: options.data || {},
			header: {
				token: uni.getStorageSync('token') || ""
			},
			success(res) {
				resolve(res.data)
			},
			fail() {
				reject("请求失败！")
			}
		})
	})
}

module.exports = request;