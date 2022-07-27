<template>
	<view class="my-settle-contain">
		<!-- 全选 -->
          <label class="radio" @click="changeAllState">
          	<radio color="#C00000" :checked="isFullCheck"/><text>全选</text>
          </label>
		  
		  <!-- 合计 -->
		  <view class="amount-box">
		  	合计:<text  class="amount">￥{{checkGoodsAmount}}</text>
		  </view>
		  
		  <!-- 结算按钮 -->
		  <view class="btn-settle">
		  	结算({{checkedCount}})
		  </view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkGoodsAmount']),
			
			
			//判断购物车的总数量是否相等，如果相等返回true，否则返回false
			isFullCheck(){
				return this.total===this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState(){
				//这个把全选的最新状态返回给updateAllGoodsState
			     this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
.my-settle-contain{
	position: fixed;
	bottom:0;
	left:0;
	width: 100%;
	height:50px;
	background-color:white;
	display:flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left:5px;
	
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color:#C00000;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color:#C00000;
		height:50px;
		color:white;
		line-height:50px;
		padding : 0 10px;
		min-width: 100px;
	    text-align: center; //普通居中方式
	}
}
</style>