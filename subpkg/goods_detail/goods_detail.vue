<template>
	<view v-if=goods_info.goods_price class="goods_detail-container">
			<!-- 1、轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)" ></image>
			</swiper-item>
		</swiper>
		
		<!-- 2、商品的参数信息区域 1-->
		<view class="goods-info-box">
			<!-- 商品的价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			
			<!-- 商品信息的主体区域 -->
			<view class="goods-info-body">
				<!-- 商品的名字 -->
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray" ></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			
			<!-- 运费 -->
			  <view class="yf">
			  	快递:免运费
			  </view>
		</view>
		
		<!-- 3、富文本区域 :nodes是把html结构转换-->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		
		<!-- 4、商品底部导航区域 1-->
		<view class="goods_nav">
			<uni-goods-nav 
			:fill="true"  
			:options="options" 
			:buttonGroup="buttonGroup"  
			@click="onClick" 
			@buttonClick="buttonClick" />
		</view>
	</view>
</template>


<script>
import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				  options: [ {
							icon: 'shop',
							text: '店铺',
							
							infoBackgroundColor:'#007aff',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 0
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ],
				
				goods_info: {},// 商品详情对象1
			};
		},
		
		watch:{
			total:{
				handler(newValue){
				const findReaults=this.options.find(x=>x.text==='购物车')
					if(findReaults){
						findReaults.info=newValue
					}
				},
				//开启深度监视，页面初次渲染就执行这个函数
				immediate:true
			}
		
		},
		
		computed:{
			// 前面是模块名称，后面是模块里面的值1
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart', ['total']),

		},
		
	
		
		onLoad(options) {	
		const goods_id = options.goods_id// 获取商品 Id	1
		 this.getGoodsDetail(goods_id)// 调用请求商品详情数据的方法
		},
		
		methods:{
			
			...mapMutations('m_cart',['addToCart']),
			
	
			async getGoodsDetail(goods_id){
		    const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
			if (res.meta.status !== 200) return uni.$showMsg()
			// 为 data 中的数据赋值
			
			// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部
			//空白间隙的问题（正则替换)
			res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, '<img style="display:block;" ')
			this.goods_info = res.message
			},
			
			//轮播图片预览效果展示uni.previewImage大图预览 1
			preview(index){
				uni.previewImage({
					current:index,
					urls:this.goods_info.pics.map(x=>x.pics_big)  //用map遍历地址
				})
			},
			
			//点击底部左侧区域的处理函数
			onClick(e){
				if(e.content.text==='购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})				}
			},
			
			// 这是点击加入购物车的处理函数1
			buttonClick(e){
				
				if(e.content.text==='加入购物车'){
					//组织商品的信息对象1
					const goods = {
					goods_id: this.goods_info.goods_id, // 商品的Id
					goods_name: this.goods_info.goods_name, // 商品的名称
					goods_price: this.goods_info.goods_price, // 商品的价格
					goods_count: 1, // 商品的数量
					goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
					goods_state: true // 商品的勾选状态
					}
					
					//调用addToCart方法
					this.addToCart(goods)
				}
			},
			
		},
		
	}
</script>

<style lang="scss">
	.goods_detail-container{
		padding-bottom:50px
	}
swiper{
	height: 750rpx;
	image{
		width: 100%;
		height:100%;
	}
}

.goods-info-box{
	padding:10px;
	padding-right:0;
	.price{
		color:#c00000;
		font-size: 18px;
		margin:10px 0;
	}
	
	.goods-info-body{
		display: flex;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
			margin-right:10px
		}
		.favi{
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-left:1px solid #efefef;
			color:gray
		}
	}
	
	.yf{
		font-size: 12px;
		color:gray;
		margin:10px 0;
	}
}

.goods_nav{
	position: fixed;
	bottom:0;
	left:0;
	width:100%;
}
</style>
