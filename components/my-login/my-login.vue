<template>
	<view class="login-container">
		<!-- 1、登录组件的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 2、一键登录的按钮 -->
		<button 
		type="primary" 
		class="btn-login" 	
        @click="getUserInfo"
		>一键登录</button>
		<text class="tips-text">登录后尽享更多收益</text>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex';
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['rediectInfo'])
		},
		methods:{
			...mapMutations('m_user',['updateuserInfo','updateToken','unpdateRediectInfo']),
			//用户授权获取用户的基本信息1
       getUserInfo() {
           uni.getUserProfile({
             desc: 'Wexin' ,
             success: (res) => {
				 console.log(res)
                console.log(res.userInfo)
				
				//把用户信息传给vuex
				this.updateuserInfo(res.userInfo)
				
				//获取token值
				this.geToken(res)
             },
             fail: ()=>{
               uni.$showMsg('您取消了授权')
             }
           })                
         },
		 
		async  geToken(info){
			 //获取code的值
			 const [err,res]=await uni.login().catch(err=>err)
			 console.log(res)
			 //err为true就直接返回登录失败，如果为err为null。则执行errMsg
			 if(err||res.errMsg!='login:ok') return uni.$showMsg('登录失败')
			 
			 //准备参数
			 const query={
			      code:res.code,
				  encryptedData:info.encryptedData,
				  iv:info.iv,
				  rawData:info.rawData,
				  signature:info.signature,
			 }
			 
			 const {data:loginResult}=await uni.$http.post('/api/public/v1/users/wxlogin',query)
			 console.log(loginResult)
			 if(loginResult.meta.status==200) return uni.$showMsg('登录失败')
			
			//由于后台没有token，所以模拟一个token值
				let guid = ''
				for (let i = 1; i <= 32; i++) {
				  const n = Math.floor(Math.random() * 16.0).toString(16)
				  guid += n
				}			
				loginResult.message=guid
				
				//存储token到vuex中
			 this.updateToken(loginResult.message)
			 //登录成功后调用
			 this.navigateBack()
			 
		 },
		 //登录成功的函数
		 navigateBack(){
			
			 //同时满足这两个条件
			 if(this.rediectInfo && this.rediectInfo.opneType==='switchTab'){
		
				 uni.switchTab({
				 	url:this.rediectInfo.from  ,//跳转到原来的地址
					complete:()=>{
						//把对象置为空
						this.unpdateRediectInfo(null)
					}
				 })
			 }
		 }
		 
	 
	   
	
	
	 
			
	},
}
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #F8F8F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: ' ';
      display: block;
      width: 100%;
      height: 40px;
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #C00000;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>