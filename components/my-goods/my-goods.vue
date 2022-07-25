<template>
	<view class="goods-item">	
	
	 <!-- 商品左侧图片区域1 -->
	       <view class="goods-item-left" >
			   <!-- 具名插槽的方式按需插入左侧的勾选按钮1-->
         <!-- <radio slot="购物车页面"  checked color="#c00000"></radio> -->
             <radio 
			 @click="radioClickHandler" 
			 v-if="showRadio" 
			 :checked="goods.goods_state" 
			 color="#c00000"></radio>
			 
	             <image :src="goods.goods_small_logo || defaultPic"
	      class="goods-pic"></image>
	    </view>
	<!-- 商品右侧信息区域 -->
	     <view class="goods-item-right">
	<!-- 商品标题 -->
	         <view class="goods-name">{{goods.goods_name}}
		     </view>
	         <view class="goods-info-box">
	            <!-- 商品价格 -->
	             <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				 
				 <!-- 商品的数量 -->
				 <uni-number-box 
				 :min="1" 
				 :value="goods.goods_count" 
				 v-if="showNum" 
				 @change="numChangeHandler"></uni-number-box> 
				 <!-- 另change事件绑定一个事件，当数量值改变的的时候，就会调用次函数 -->
	         </view>
	     </view>
	    </view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				//默认情况下不会展示radio组件1
				default:false
			},
			//是否展示右侧的增加Number组件
			showNum:{
				type:Boolean,
				default:false
			}
		},
		
		methods:{
			
			//cart类似父组件，my_goods类似子组件，子组件传父组件通过自定义事件，在父组件中通过@绑定一个自定义组件
			//名称，子组件通过$emit触发这个事件，并把参数传过去，即可，父组件接收到数据并通过vuex传过去
			//然后通过vuex来判断有没有在购物车里面找到你点击哪个按钮的id，如果找到了，把vuex里面的状态值给改了
			//状态值改了后然后做持久化存储本地le
			radioClickHandler(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			
			/*  
			思路：
			1.因为我们商品的数量是绑定在子组件中的，也就是复用组件本组件，所以当点击改变商品数量时触发 @change="numChangeHandler"
			2.触发numChangeHandler函数会把最新的数量值带进来，这时要把值传给父组件，因为值子组件传父组件，父组件绑定一个自定义事件@num-change="numberChange"
			3.而子组件就要想办法触发这个自定义组件并把值传过去this.$emit('num-change',{})
			4父组件接收到值后,就要把值传给vuex，这时@num-change="numberChange"已经触发了numberChange这个函数，并通过this.updateGoodsCount(e)把值传给vuex
			5.然后通过vuex来判断有没有在购物车里面找到你点击哪个商品的id，如果找到了，把vuex里面的数量值给改了，状态值改了后然后做持久化存储本地le
			6.做完本地存储后，
			
			*/			
			//监听到了numBox组件变化事件,value就是改完后面的值
			numChangeHandler(value){
				console.log('aaa')
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:+value
				})
			}
			
		},
		
		
		data() {
			return {
				// 默认的空图片
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		filters: {
		// 把数字处理为带两位小数点的数字
		tofixed(num) {
		return Number(num).toFixed(2)
		  }
		}
	}
</script>

<style lang="scss">
.goods-item{
	
	display: flex;
	padding:10px 5px;
	border-bootom:1px solid #f0f0f0;
	
	.goods-item-left{
		margin-right:5px;
		display: flex;
		align-items: center;
         justify-content: center;
		.goods-pic{
			width:100px;
			height:100px;
			display: block;
		}
	}
	.goods-item-right{
		display: flex;
		flex:1;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
			}
		.goods-info-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-price{
			color:#C00000;
			font-size:17px
				}
			}
			
		
	}
}
</style>