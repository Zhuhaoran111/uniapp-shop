export default{
	namespaced:true,
	
	state:()=>({
		
		cart:JSON.parse(uni.getStorageSync('cart')||'[]')//转换成数组
	}),
	
	mutations:{
		addToCart(state,goods){
			const findReaults=state.cart.find((x)=>x.goods_id===goods.goods_id)
			console.log(findReaults)
			/* 如果在发现state.goods里面没有这个商品对象时，把这个对象push进去 */
			if(!findReaults){
				state.cart.push(goods)
			}else{
				findReaults.goods_count++
			}
			
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		}
	},
	getters:{
		//统计购物车中商品的数量
		total(state){
			let c = 0
			// 循环统计商品的数量，累加到变量 c 中
		   //goods是每个item项
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		}
	},
}


