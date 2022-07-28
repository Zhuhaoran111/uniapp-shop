export default{
   namespaced:true,
   
	state:()=>({
		//外界来找这个值address，然后转换为数组或对象1
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
	     token: uni.getStorageSync('token') || '',
		//用户的信息
		userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}'),
		
	    //重定向的Object对象
		rediectInfo:null
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
		},
		
		//存储用户信息1
		updateuserInfo(state,userinfo){
			state.userinfo=userinfo;
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		
		//保存token值
		updateToken(state,token){
			state.token=token
			this.commit('m_user/saveToekenStorage')
		},
		saveToekenStorage(state){
			uni.setStorageSync('token',state.token)
		},
		
		//返回购物车页面
		unpdateRediectInfo(state,info){
			state.rediectInfo=info;
			console.log(state.rediectInfo);
		}
	},
	
}