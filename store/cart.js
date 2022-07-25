export default{
	namespaced:true,
	
	state:()=>({
		
		cart:JSON.parse(uni.getStorageSync('cart')||'[]')//转换成数组
	}),
	
	mutations:{
		// 添加购物车的函数
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
		//持久化存储
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		
		//更新勾选视图
		updateRadio(state,goods){
			//fingResault保存的是穿过来的id和添加购物车的中的id对比
			const findReaults=state.cart.find(x=>x.goods_id===goods.goods_id)
			
			if(findReaults){
				//更新对应的勾选状态1
				findReaults.goods_state=goods.goods_state
				//持久化存储带本地
				this.commit('m_cart/saveToStorage')
			}
		},
		
		//更新numBox商品数量这个组价
		updateGoodsCount(state,goods){
			const findNumResults=state.cart.find(x=>x.goods_id===goods.goods_id)
			if(findNumResults){
				//把最新商品数量进行更新
				findNumResults.goods_count=goods.goods_count
				//持久化存储本地
				this.commit('m_cart/saveToStorage')
			}
		},
		
		//移除购物车数据的函数,根据id删除商品的数据
		removeGoodsByid(state,goods){
			// filter进行过滤，把过滤好的数据存在
			//外界穿过李的数据也就是你要点击的对象，如果和购物车里面的id有不同的，也就是不和我删除的数据相等的
			//把哪些数据保存起来，保存在vuex中的state.cart数组中
			state.cart=state.cart.filter(x=>x.goods_id!==goods_id)
			
			//持久化存储本地
			this.commit('m_cart/saveToStorage')
			
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


