<template>
	<view>
		<view class="goods-list">
		 <view 
		 v-for="(goods, i) in goodsList" 
		 :key="i"
		@click="goToDeatil(goods)"
		 >
		   <my-goods :goods="goods"></my-goods>
		 </view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {			
				query: '',// 查询关键词	
				cid: '',// 商品分类Id			
				pagenum: 1,// 页码值			
				pagesize: 10,// 每页显示多少条数据
				},
				goodsList: [],// 商品列表的数据
				total: 0,// 总数量，用来实现分页
				
				// 是否正在请求数据
				isloading: false
				
			};
		},
		
		onLoad(options){
			// 将页面参数转存到 this.queryObj 对象中
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			
			// 调用获取商品列表数据的方法
			this.getGoodsList()
		},
		methods: {
			
		// 1. 获取商品列表数据的方法
		async getGoodsList(cb) {
			
		// ** 打开节流阀
	     this.isloading = true
			
			
		// 发起请求
		const { data: res } = await
		uni.$http.get('/api/public/v1/goods/search', this.queryObj)
		
		// ** 关闭节流阀
		this.isloading = false,
		
		cb && cb()   //cb存在就执行后面的语句，cb不存在，后不会执行
		
		if (res.meta.status !== 200) return uni.$showMsg()
		// 为数据赋值
		
		this.goodsList = [...this.goodsList,...res.message.goods] //新旧数据拼接
		this.total = res.message.total
		   },
		   
		//4.点击item项跳转到详情页面
		goToDeatil(goods){
		console.log('aaa');
		uni.navigateTo({
			url:'/subpkg/goods_detail/goods_detail?goods_id='+ goods.goods_id
		})
		   }
		   
		},
		//2.触发下拉触底函数
		onReachBottom(){
			//计算数据，范围外的数据就不显示了
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total)
			return uni.$showMsg('数据加载完毕')
				
			// 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if (this.isloading) return
			
			//让页码值自增加1
			this.queryObj.pagenum++;
			this.getGoodsList()
		},
		
		//3.下拉刷新的函数
		onPullDownRefresh(){
			//重置关键数据
			this.queryObj.pagenum=1
			this.total=0
			this.isloading=false
			this.goodsList=[]
			
			//重新发起数据请求
			this.getGoodsList(()=>{
				//发起请求，并把下拉刷新关闭
				uni.stopPullDownRefresh()
			})
		},
		
	
		
		
	}
</script>

<style lang="scss">

</style>
