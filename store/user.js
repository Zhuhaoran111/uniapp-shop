export default{
   namespaced:true,
   
	state:()=>({
		//外界来找这个值address，然后转换为数组或对象1
		address:JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	
	getters:{
		//这是渲染地址区域
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	},
	
	mutations:{
		//更新收货地址
		updateAddress(state,address){
			state.address=address
			
		this.commit('m_user/saveAddressToStorage')  //在vuex里面调用
		},
		//持久化存储地址
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	
}