<template>
	<view>
		<my-login v-if="!token">
			
		</my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
			mixins:[badgeMix],  //混合引入，切换到每个Tabbar页面都会展示这个数字徽标
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss">

</style>
