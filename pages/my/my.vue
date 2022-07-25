<template>
	<view>
		my
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
			mixins:[badgeMix],  //混合引入，切换到每个Tabbar页面都会展示这个数字徽标
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
