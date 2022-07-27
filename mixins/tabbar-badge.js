import {mapGetters} from 'vuex'

export default{
	computed:{
		...mapGetters('m_cart',['total'])
	},
	onShow(){
		this.setBadge()
	},
	watch:{
		//因为Tabbar是初次渲染，所以修改完数量后每次刷新后那个徽标值才会变
		//所以要监听数据的变化，当total值发生变化时，我们就重新调用setBadge
		//这样就给徽标重新赋值了
		total(){
			this.setBadge();
		}
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