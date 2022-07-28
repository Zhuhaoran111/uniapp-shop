<template>
	<view class="my-userinfo-container">
	<!-- 	头像和昵称区域 -->
		   <view class="top-box">
		   	<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{userinfo.nickName}}</view>
		   </view>
		   
		<!-- 面板区域 -->
		   <view class="panel-list">
		   	<!-- 第一个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>9</text>
						<text>收藏的店商品</text>
					</view>
					<view class="panel-item">
						<text>20</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>80</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二个个面板 -->
			<view class="panel">
				<view class="panel-title">我的订单</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			
			
			
			<!-- 第三个面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
			
			
			
		   </view>
		   
		   
	</view>
</template>

<script>
	
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['userinfo']),
		},
		methods:{
			...mapMutations('m_user',['updateAddress','updateuserInfo','updateToken']),
			async logout(){
				const [err,succ]=await uni.showModal({
					title:'提示',
					content:'确认退出登录吗'
				}).catch(err=>err)
				
				//用户确认退出登录，把地址，用户信息全部清理
				if(succ && succ.confirm){
					this.updateAddress({})
					this.updateuserInfo({})
					this.updateToken('')
				}
			}
		}
	}
</script>

<style lang="scss">
.my-userinfo-container{
	height: 100%;
	background-color: #F4F4F4;
	
	.top-box{
		display: flex;
		flex-direction: column;  //设置了数轴
		justify-content: center; //这个变成垂直对齐了
		align-items: center;    //这个变成水平对齐了
		height: 200px;
		background-color: #C00000;
		.avatar{
			width:90px;
			height:90px;
			border-radius:45px;
			border:2px solid #fff;
			box-shadow:0px 1px 5px black;
		}
		.nickname{
			font-size: 16px;
			color:#fff;
			font-weight: bold;
			margin-top:10px
		}
	}
}

.panel-list{
	padding:0 10px;
	position: relative;
	top:-10px;
	.panel{
		background-color: white;
		border-radius: 3px;
		margin-bottom: 8px;//中间有缝隙的操作
		
		.panel-title{
			//自己写的方式
			// padding:10px 8px;
			// border-bottom:1px solid #cccccc
			line-height: 45px;
			padding-left:10px;
			font-size: 15px;
			border:1px solid #f4f4f4
		}
		
		.panel-body{
		   display: flex;
		   justify-content: space-between;
		   padding:0 6px;
		   .panel-item{
			   display: flex;
			   flex-direction: column;
			   justify-content: center;
			   align-items: center;
			   font-size: 14px;
			   padding:10px 0;
			   
			 
			 .icon{
			 		width: 35px;
			 		height:35px;
			      }
			   
		   }
		}
	}
}
.panel-list-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 15px;
	padding:0 10px;
	line-height: 45px;
}


 



</style>