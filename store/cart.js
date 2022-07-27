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
		removeGoodsByid(state,goods_id){
			// filter进行过滤，把过滤好的数据存在
			//外界穿过李的数据也就是你要点击的对象，如果和购物车里面的id有不同的，也就是不和我删除的数据相等的
			//把哪些数据保存起来，保存在vuex中的state.cart数组中
			state.cart=state.cart.filter(x=>x.goods_id!==goods_id)
			
			//持久化存储本地
			this.commit('m_cart/saveToStorage')
			
		},
		
		//这这是对全选控制单个选项，控制勾选状态
		updateAllGoodsState(state,newState){
			state.cart.forEach(x=>x.goods_state=newState)
			//持久化存储本地
			this.commit('m_cart/saveToStorage')
		},
		
	},
	getters:{
		//统计购物车中所有商品的总数量
		total(state){
			// let c = 0
			// // 循环统计商品的数量，累加到变量 c 中
		 //   //goods是每个item项
			// state.cart.forEach(goods => c += goods.goods_count)
			// return c
			//0只是初始值，首次渲染,这里用reduce进行累加
			return state.cart.reduce((total,item)=>total += item.goods_count,0)
		},
		//计算购物车的勾选数量
		checkedCount(state){
			// state.cart.filter(x=>x.goods_state)这是把已经勾选的过滤出来,reduce进行累加
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=> total+=item.goods_count,0)
		},
		
		//为已经勾选的商品进行总价格合计
		checkGoodsAmount(state){
			//返回一个新的已经勾选的数组,然后进行数量和价格的累加,最后进行两位小数
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total += item.goods_count * item.goods_price,0).toFixed(2)
		}
	},
}


