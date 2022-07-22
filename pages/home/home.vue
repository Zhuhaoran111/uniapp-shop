<template>
	<view>
		<!-- 轮播图 -->
	  <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
	  	<swiper-item v-for="(item,index) in swiperList" :key="index">
	  		<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id='+ ${item.goods_id}'`">
				<img :src="item.image_src" alt="">
			</navigator>
	  	</swiper-item>
	  </swiper>
	  
	  <!-- 分类导航区域-->
	   <view class="nav-list">
	   	   <view class="nav-item" v-for="(item,index) in navList" :key="index"
		    @click="navClickHandler(item)"
		   >
	   	   	<img :src="item.image_src" class="nav-imag">
	   	   </view>
	   </view>
	   
	   <!-- 楼层区域-->
	   <view class="floor-list">
		   
		   <!--标题区域-->
	   	   <view class="floor-item" v-for="(item,index) in floorList" :key="index">
	   	   	  <image :src="item.floor_title.image_src"  class="floor-imag"></image>
			  <!-- 楼层的图片区域-->
			  <view class="floor-box">
			  			   
			  	<!-- 左侧的盒子1 -->
			  			<navigator class="floor-img-box" :url="item.product_list[0].url">
			  				 <image :src="item.product_list[0].image_src" 
							 :style="{width:item.product_list[0].image_width+'rpx'}"
							  mode="widthFix"
							 >
							 </image>
			  			</navigator>
			  			
			  			<!-- 右侧的盒子2 -->
			  			<navigator class="right-img-box">
			  				<navigator class="right-img-item" 
							v-for="(item1,index1) in item.product_list" 
							:key="index1"
							v-if="index1!==0"
							:url="item1.url"

							>
			  					<img :src="item1.image_src" 
								:style="{width:item1.image_width+'rpx'}"  
								mode="widthFix">
			  				</navigator>
			  			</navigator>
	   	   </view>
		   
	
			
			
		   </view>
		   
		   
	   </view>
	   
	   
	   
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图的的数据列表
				swiperList:[],
				
				//获取分类列表的数据
				navList:[],
				
				//获取楼层的数据
				floorList:[]
			};
		},
		onLoad(){
			//初始调用获取轮播图的数据类似VUe中create
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			async getSwiperList(){
				const {data:res}=await uni.$http.get('/api/public/v1/home/swiperdata')
				//请求失败
				if(res.meta.status!==200) return uni.$showMsg()
				this.swiperList=res.message,
				uni.$showMsg('数据请求成功')
			},
			async getNavList(){
			    const {data:res}=await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status!==200) return uni.$showMsg()
				this.navList=res.message
				
			},
			async getFloorList(){
				const {data:res}=await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status!==200) return uni.$showMsg()
				//对数据进行处理
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						/* prod.navitor_url.split('?')[1]分隔数据 */
						prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				}),
				this.floorList=res.message
			},
				
			
			/* 分类 */
			navClickHandler(item){
				if(item.name==='分类'){
				    uni.switchTab({
				    	url:'/pages/cate/cate'
				    })
				}
			}
			
		}
	}
</script>

<style lang="scss">
	swiper{
		height:330rpx;
		.swiper-item, image{
			width: 100%;
		height: 100%;
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin:15px 0;
		
		.nav-imag{
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor-imag{
		width: 100%;
		height: 60rpx;
	}
	
	.floor-box{
		display: flex;
		padding:15rpx;
		.right-img-box{
			margin-left:12rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
	
	

	
</style>
