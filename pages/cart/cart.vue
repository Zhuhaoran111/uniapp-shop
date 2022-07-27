<template>
	<view class="cart-container" v-if="cart.length!==0">
		<!-- 1、购物车地址区域 -->
		<my-address>
		</my-address>
			
		<!-- 2、商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop"size="18"></uni-icons>
			<!-- 右侧的文本 -->
			<text class="cart-title-text">
				购物车
			</text>
		</view>
		
		
		<!-- 3、购物车数据 ,这里是把添加到购物车里面的数据传到goods组件然后进行渲染那-->
		<uni-swipe-action>
		     <block v-for="(goods, i) in cart" :key="i">
		 <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过1
		  options 属性来指定操作按钮的配置信息 -->
		         <uni-swipe-action-item 
					  :right-options="options"
					  @click="swipeActionClickHandler(goods)">
						   <my-goods 
						   :goods="goods" 
						   :show-radio="true" 
						   :show-num="true"
						   @radio-change="radioChangeHandler" 
						   @num-change="numberChangeHandler">
						   </my-goods>
		       </uni-swipe-action-item>
		   </block>
		</uni-swipe-action>
		
		<!-- 4、购物车的结算区域 -->
		<my-settle></my-settle>	
	</view>
	
	    <!-- 空白购物车区域 -->
		
	<view class="empty-cart" v-else>
			<image src="/static/cart_empty@2x.png" class="empty-image"></image>
			<text class="tip_text">空空如也</text>
	</view>	
	

	
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import {mapState,mapMutations} from 'vuex'

	export default {
		
		mixins:[badgeMix],  //混合引入，切换到每个Tabbar页面都会展示这个数字徽标
		data() {
			return {
				options:[
					{
						text:'删除',
						style:{backgroundColor:'#C00000'}
					}
				]
			};
		},
		computed:{
			...mapState('m_cart',['cart'])
		
		},
		methods:{
			//这个当你点击按钮时监听到的按钮状态radioChangeHandler中1
			...mapMutations('m_cart',['updateRadio','updateGoodsCount','removeGoodsByid']),
			//点击按钮
			radioChangeHandler(e){
				this.updateRadio(e)
			},
			
			//这是子组件要触发的,这里能得到最新的值和id,然后把值传给vuex进行持久化存储
			numberChangeHandler(e){
			  this.updateGoodsCount(e)
			},
			
			//删除购物车的功能
			swipeActionClickHandler(goods){
				//这里直接传输的是id，那边直接接这个id即可
				this.removeGoodsByid(goods.goods_id)
			}
		}
		
	}
</script>

<style lang="scss">
.cart-container{
	padding-bottom:50px  //结算也覆盖中间的数据
}
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	padding-left:5px;
	border-bottom:1px solid #efefef;
	.cart-title-text{
		font-size: 14px;
		margin-left:10px
	}
}

.empty-cart{
	display: flex;
	height: 555px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	// background-color: pink;
	.empty-image{
		width: 100px;
		height: 100px;
		
	}
	.tip_text{
		
	}
}

</style>
