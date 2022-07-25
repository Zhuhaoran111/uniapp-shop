<template>
	
	<view>
		<!-- 这里存放搜索页组件 -->
		<!-- my-search自定义了props属性，所以这里可以自定义传值 -->
		<my-search @click="goSearch"></my-search>
		
		<view class="scroll-view-container">
			<!-- 左侧的滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">	
				<block v-for="(item, i) in cateList" :key="i">
					<view 
					:class="['left-scrool-view-item',i===active ? 'active':'']"
					@click="activeChange(i)"
					>{{item.cat_name}}</view>	
				</block>		
			</scroll-view>
			
			
			
			<!-- 右侧的滑动区域 -->
			<!-- :scroll-top="scrollTop"  距离懂不滚动距离绑定 -->
			<scroll-view scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
			<view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
				<!-- 1、这是二级分类的标题 -->
				<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
				
				<!-- 2、这是三级分类的数据 -->
				 <view class="cate-lv3-list">
					 <!-- 三级分类 Item 项 -->
				<view 
				class="cate-lv3-item" 
				v-for="(item3, i3) in item2.children" 
				:key="i3" 
				@click="gotoGoodsList(item3)">
					 <!-- 图片 -->
					 <image :src="item3.cat_icon"></image>  
					<text>{{item3.cat_name}}</text>
				</view>
				</view>
			</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	
	export default {
	mixins:[badgeMix],  //混合引入，切换到每个Tabbar页面都会展示这个数字徽标
		data() {
			return {
				
			 wh:0,//这是设备可用的高度		
			  cateList: [], //这是分类的数据列表		
			  active:0, //被激活的索引		  
			  cateLevel2: [] ,//二级分类的数据
			  scrollTop: 0,// 滚动条距离顶部的距离  
			};
		},
		onLoad(){
			/* getSystemInfoSync()获取可用设备的高度 */
			const sysInfo=uni.getSystemInfoSync()
			 console.log(sysInfo)
			this.wh=sysInfo.windowHeight-50
			
			// 调用获取分类列表数据的方法  
			this.getCateList()
		},
		methods:{
			async getCateList() {
				 // 发起请求
				   const { data: res } = await uni.$http.get('/api/public/v1/categories')
				 // 判断是否获取失败
				 if (res.meta.status !== 200) return uni.$showMsg()  // 转存数据
				console.log(res)
				 this.cateList = res.message
				
				//为二级分类数据赋值
				console.log( res.message[0])
				 this.cateLevel2 = res.message[0].children
			},
			activeChange(i){
			     this.active=i;
	 
				 // 为二级分类列表重新赋值
		     this.cateLevel2 = this.cateList[i].children
			 
			 //让 scrollTop 的值在 0 与 1 之间切换	
			 this.scrollTop = this.scrollTop ? 0 : 1
			},
			
			// 点击三级分类项跳转到商品列表页面
			gotoGoodsList(item3){
				 uni.navigateTo({
				   url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id  })
			},
			
			goSearch(){
				/* navigateTo跳转 */
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
		.left-scrool-view-item{
			background-color: #f7f7f7;
			line-height:60px;
			text-align: center;
			font-size: 12px;
			
			&.active{
				background-color:#FFFFFF;
				position: relative;
				
				&::before{
					content: '';
					display: block;
                    width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top:30%;
					left:0;
					
    				}
			}
		}
	}
}

	.cate-lv2-title{
		font-size:12px;
		font-weight: bold;
		text-align: center;
		padding:15px 0;
		
	}
	
 .cate-lv3-list {
	display: flex;
	flex-wrap: wrap;
	
	.cate-lv3-item {
	    width: 33.33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 12px;
		image{
			width: 60px;
			height: 60px;
		}
		text{
			font-size: 12px;
		}
	}
}

</style>
