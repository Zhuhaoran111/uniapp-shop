<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}">
			<!-- 这是uni的图标组件 -->
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		/* 自定义属性*/
		props:{
			/* 背景颜色 */
			bgcolor:{
				type:String,
				default:'#c00000'
			},
			/* 圆角尺寸  单位px */
			radius:{
				type:Number,
				default:18
			}
			
		},
		data() {
			return {
				
			};
		},
		
		methods:{
			searchBoxHandler(){
				console.log('ok')
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	
	display: flex;
	align-items: center;
	padding:0 10px;
	.my-search-box{
		height: 36px;
		width: 100%;
		background-color: #ffffff;
		display: flex;
	    align-items: center;
		justify-content: center;
		
		.placeholder{
			font-size: 15px;
			margin-left:5px
		}
	}
}
</style>