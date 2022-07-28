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
		  <view class="btn-settle" @click="settlement">
		  	结算({{checkedCount}})
		  </view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	
	export default {
		name:"my-settle",
		data() {
			return {
				//倒计时的秒数
				seconds:3,
				//定时器的id
				timer:null,
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			...mapState('m_cart',['cart']),
			
			
			//判断购物车的总数量是否相等，如果相等返回true，否则返回false
			isFullCheck(){
				return this.total===this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			...mapMutations('m_user',['unpdateRediectInfo']),
			changeAllState(){
				//这个把全选的最新状态返回给updateAllGoodsState
			     this.updateAllGoodsState(!this.isFullCheck)
			},
			
			//这里点击结算也判断
			settlement(){
				//1、判断是否勾选商品
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				//2、判断是否选择地址
				if(!this.addstr) return uni.$showMsg('请选择地址')
				//3、判断是否登录，倒计时导肮跳转
				if(!this.token) return this.delayNavigate()
				
				//支付
				this.payOrder()
			},
			async payOrder(){
				//1.创建订单
				//1.1、组织订单的信息对象
				const orderInfo={
					order_price:0.01,
					consignee_addr:this.addstr,
					goods:this.cart.filter(x=>x.goods_state).map(x=>({
						
							goods_id:x.goods_id,
							goods_number:x.goods_count,
							goods_price:x.goods_price,
						
					}))
				}
				
				//2、发起请求创建订单
				const {data:res}=await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				console.log(res)
				 // if(res.meta.status!==200) return uni.$showMsg('创建订单失败')
				
				//3、得到服务器的订单
				// const orderNumber=res.message.order_number
				
				 //由于订单号获取不到所以模拟订单号
				   let currDate = new Date();
				   let year = currDate.getFullYear();
				   let month = currDate.getMonth() + 1 < 10 ? "0" + (currDate.getMonth() + 1): currDate.getMonth() + 1;
				   let day = currDate.getDate()<10 ? "0"+currDate.getDate() : currDate.getDate();
				 
				    //获取年月日
				    let date = year + month + day; //20190524
				             
				    //获取当时时间戳
				    let timestamp = Date.parse(currDate); //155866554500
				             
				    //生成订单
				    const orderId = date + timestamp; //20190524155866554500
				 		
						 
				 //5.订单预支付
				     //1.发送请求获取订单的支付信息
					const{data:res2}= await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{
						 orderNumber:orderId
					 })
					 
					 //2.2、预付订单失败
					 // if(res2.meta.status!=200) return uni.$showMsg('预付订单失败')
					 
					 // const payInfo=res2.message.pay
					 //得到支付相关的参数
					 console.log(payInfo)
					 
					 
					 //6、支付
					 const [err,succ]= await uni.requestPayment(payInfo)
					 //1.未完成支付
					 if(err) return uni.$showMsg('订单未支付')
					 //2.完成了支付，查询支付结果
					 const {data:res3}=await uni.$http.post('/api/public/v1/orders/chkOrder',{
						 order_number:orderNumber
					 })
					 //3.检测到订单未支付
					 if(res3.meta.status!==200) return uni.$showMsg('订单未支付')
					 
					 //4.检测到支付完成
					 uni.showToast({
					 	title:'订单支付完成',
						icon:'success'
					 })
			},
			
			
			//延时导航到my页面
			delayNavigate(){
				this.showTips(this.seconds)
				
				this.timer=setInterval(()=>{
					this.seconds--
					if(this.seconds<=0){
						clearInterval(this.timer) //清除定时器
						uni.switchTab({
							url:'/pages/my/my',
							success:()=>{
								//登录成功后跳转
								this.unpdateRediectInfo({
									opneType:'switchTab',
									from :'/pages/cart/cart'
								})
							}
						})
						//到0秒返回登录页，这时重新重置3秒
						return  this.seconds=3;
					}
					this.showTips(this.seconds)
				},1000)
			},
			
			//展示倒计时的提示消息
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后在结算'+n+'秒自动挑战到登录页',
					mask:true,//防止展示信息用户点击穿透
					duration:1500 //这个没啥用
				})
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