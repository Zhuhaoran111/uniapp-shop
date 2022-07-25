import {mapGetters} from 'vuex'

export default{
	computed:{
		...mapGetters('m_cart',['total'])
	},
	onShow(){
		this.setBadge()
	},
	methods:{
		setBadge(){
			//下面这个函数是为Tabbar设置内容的
			uni.setTabBarBadge({
				index:2,  //索引为2的Tabbar
				text:this.total+'' //必须是字符串
			})
		}
	}
}