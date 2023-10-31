// 1. 引入vue 和 vuex
// 页面路径：store/index.js
import { createStore } from 'vuex'

// 3. 导入对象
const store = createStore({
	// 定义state仓库，用于存储数据
	state: {
		// 存储整个购物车列表
		List:[],
		// 存储加入购物车的单个数据
		item:"呱呱呱",

	},
	// 定义getters,用于计算state的数据，类似计算属性
	getters: {},
	// 定义mutations,用于操作state中的数据
	mutations: {
		// 向购物车中添加商品
		addList(state,item){
			let flag1 = true
			// 向购物车列表中添加商品
			item["flag"] = false
			item["num"] = 1
			state.List.forEach(li=>{
				if(li.commodity_id == item.commodity_id){
					li.num ++
					flag1 = false
					return flag1
				}
			})
			if(flag1){
				state.List.push(item)
			}
			
			// for(let i=0,len= state.List.length;i<len;i++){
				
			// }
			// console.log(item)
			// state.List.push(item)
		},

	},
	// 定义actions，用于异步调用mutation中的方法
	actions: {},
	// 定义模块化使用
	modules: {}
})

// 4. 默认导出 store
export default store

