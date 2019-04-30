<template>
	<tabbar >
		<tabbar-item 
			v-for="item in bottomBar" 
			:link="item.link">
			<span 
				slot="icon" 
				class="zui-icon" 
				:class="item.iconCls">
			</span>
			<span 
				slot="label" >
				{{item.name}}
			</span>
		</tabbar-item>	
	</tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
	components: {
		Tabbar,
		TabbarItem
	},
	props: [],
	data() {
		return {
			bottomBar: [
				{
					name: '订单',
					iconCls: 'zui-icon-SHOPPING-CART-EMPTY',
					link: 'mine/orders'
				},
				{
					name: '会员中心',
					iconCls: 'zui-icon-MINE_1',
					link: 'mine'
				}
			]
		}
	}
}
</script>
