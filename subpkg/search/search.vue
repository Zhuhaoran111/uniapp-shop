<template>
	<view>
		<view class="search-box">
		<uni-search-bar 
		:radius="100" 
		@confirm="search" 
		@input="input" 
		placeholder="搜索你想要的"
		:focus="true"
		cancelButton="none"
		></uni-search-bar>
		</view>
		
		<!--搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length!==0">
			<view @click="goToDetail(item)" class="sugg-item" v-for="(item,index) in searchResults">
				<view class="goods-name">	
					    {{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		
		<!-- 搜索历史列表 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons  @click="deleteHistory" type="trash" size="17"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<view class="tag-view" v-for="(item) in histories" :key="index">
					<uni-tag @click="gotoGoodsList(item)" :inverted="true" :text="item" type="primary" />
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				timer:null,/* 这是处理防抖的时间戳 */
				kw:""  ,     //搜索关键词
				searchResults:[], //搜索结果列表1,
				historylist:['a','app','apple'],//搜索历史的列表
			};
		},
		onLoad(){
			console.log(typeof uni.getStorageSync('kw') || '[]')  //这是字符串
			this.historylist = JSON.parse(uni.getStorageSync('kw') || '[]')
			
					
		},
		methods:{
			/* input输入事件的处理函数 */
			input(e){
				/* 清除定时器 */
				clearTimeout(this.timer) 
				
				this.timer=setTimeout(()=>{
					/* 这里千万不能写e.value，写了报"Cannot read property 'length' of undefined" */
				    this.kw=e
					this.getSearchList()
					},500)
					
					
				},
				async getSearchList(){
					//判断搜索关键词是否为空null
					
					if(this.kw.length===0){
						this.searchResults=[]
						return 
					}
					
					const {data:res}=await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
					if(res.meta.status!==200) return uni.$showMsg()
					console.log(res.message)
					this.searchResults=res.message
					
					//调用一个保存索索关键词的方法
					this.saveSearchHistory();
						
					
				},
				//保存搜索历史记录1
				saveSearchHistory(){
					// this.historylist.push(this.kw)
				     const set=new Set(this.historylist)	//用set收集this.historylist里面的数据 	 
					 set.delete(this.kw)//把你当前搜索的如果有重复的在数组中删除		 
					 set.add(this.kw) //在次添加你刚才搜索的，注意这是在末尾添加的，在前面，是因为后面做了翻转
					 
					 this.historylist=Array.from(set) //把对象转换成数组
					 
					  // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地  
					  uni.setStorageSync('kw', JSON.stringify(this.historylist))  //把数组转换成字符串
					
				},
				
					
				goToDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				    })
				},
				
				deleteHistory(){
					this.historylist=[],
					uni.setStorageSync('kw', '[]') // 清空本地存储中记录的搜索历史  
				},
				//点击历史记录冰鞋带参数进入商品详情列表页面
				gotoGoodsList(kw) {
					  uni.navigateTo({  
					 url: '/subpkg/goods_list/goods_list?query=' + kw  
					 })
				}
			},
			
			computed:{
				 /* 只要数组historylist一变这个计算属性就会被调用*/
				histories(){
					return [...this.historylist].reverse()  //翻转
				}
			}
			
			
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top:-1px;
	z-index:999
}
.sugg-list{
	.sugg-item{
		display: flex;
	    align-items: center;
		justify-content: space-between;
		padding:8px;
		font-size: 14px;
		border-bottom: 1px solid #efefef;
		.goods-name{
			/* 一行显示，超出的部分以省略号显示 */
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			
		}
	}

}

.history-box{
	padding:0 5px;
	.history-title{
		display: flex;
		justify-content: space-between;
		height:40px;
		align-items: center;
		font-size: 23px;
		border:1px solid #efefef
	}
	.history-list{
       display: flex;
	   margin-top:20px;
	 
	 .tag-view{
		   padding:0 8px;
	  }
	}
}

</style>
