<template>
	<view>
		<!-- 选择收货地址和盒子1 -->
		<block  v-if="JSON.stringify(address)==='{}'">
			<view class="address-choose-box">
				<button 
				type="primary" 
				size="mini" 
				class="addressBorder"
				@click="chooseAddress"
				>请选择收货地址</button>
			</view>
			<image src="/static/cart_border@2x.png" class="address-border"></image>
		</block>
		
		
		<!-- 渲染收货信息的盒子 -->
	<block v-else>
		<!-- @click="chooseAddress"这是重新选择获得收获地址 -->
				  <view class="address-info-box"  @click="chooseAddress">
				<view class="row1">
					<view class="row1-left">
						<view class="username">收货人:{{address.userName}}</view>
					</view>
					<view class="row1-right">
						<view class="phone">电话:{{address.telNumber}}</view>
						<uni-icons type="arrowright" size="16"></uni-icons>
					</view>
				</view>
				  	<view class="row2">
				  		<view class="row2-left">收货地址:</view>
				  		<view class="row2-right">
							{{addstr}}
				  		</view>
				  	</view>
				  </view>
	</block>
		
		
	</view>
</template>

<script>
	import{mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
		return {
			// address:{	
			// }
		   };
		},
	
		methods:{
			...mapMutations('m_user',['updateAddress']),
	    async chooseAddress(){
	    		const [err,succ]=await uni.chooseAddress().catch(err=>err)
	    		if(err===null && succ.errMsg==='chooseAddress:ok'){
					//这个往vuex里面进行存储
	    			this.updateAddress(succ)
	    		}
	    }
	},
	computed:{
		...mapState('m_user',['address']),
		...mapGetters('m_user',['addstr']),
	}
}
</script>

<style lang="scss">
	.address-choose-box{
		height:90px;
		display: flex;
		justify-content: center;
		align-items: center;
			.addressBorder{	
			}
		
		}
		.address-border{
			display: block;
			width: 100%;
			height:5px;
		}
		
		.address-info-box{
			font-size:12px;
			height: 90px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding:0 5px;
			.row1{
				display: flex;
				justify-content: space-between;
				.row1-right{
					display: flex;
					justify-content: space-between;
				}
			}
			.row2{
				display: flex;
				align-items: center;
				margin-top:10px;
				
				.row2-left{
					white-space: nowrap;
					
				}
				
			}
		}

	
</style>