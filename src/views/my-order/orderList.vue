<template>
	<div class="z-page">
	<view-box>
		<tab 
			class="order-list-head"
			:line-width="2"
			actice-color="Efc378c"
			v-model="index">
			<tab-item 
				v-for="item in list"
				@click.native="tabHandler(item.tag)"
				:selected="computedTag === item.tag">
				{{item.text}}
			</tab-item>
		</tab>
		
		<empty-view
			v-show="!loading"
			v-if="orderList.length === 0"
			:iconCls="'zui-icon-IMGCARD'"
			:text="'暂无相关订单！'">
		</empty-view>

		<div 
			class="order-list-wrap" 
			v-else 
			v-show="!loading">
			<shop-card
				v-for="order in orderList"
				:shop="order">
				<router-link
					class="shop-card-body"
					:to="{
						name: 'orderDetail',
						params: {id: order.nid}
					}"
					slot="body">
					<div class="good-list-wrap">
						<!--<img class="good-list-img" src="https://gd1.alicdn.com/imgextra/i1/2539332569/O1CN01TQioPA1UqdychLNor_!!2539332569.jpg_400x400.jpg" alt="">-->
						<div class="good-list-info">
							<div class="title z-ellipsis-2">
								{{order.title}}
							</div>
							<div class="subInfo z-ellipsis-2">
								<span slot="icon" class="time-icon create">下单时间：</span>{{order.field_create_time	}}
							</div>
							<span class="status" :class="order.field_order_status | colorFilter">{{order.field_order_status}}</span>
						</div>
					</div>
				</router-link>
				<div
					slot="foot"
					class="shop-card-foot">
					<div v-if="order.field_forecast_income === '0.00' && order.field_order_type !=='京东'" class="z-cell-item z-text-right">
						<span>共{{order.field_count}}件 |</span>
						<span>实付:{{order.field_payment_amount}}元 |</span>
						预计返￥<strong>{{ order.field_effect_prediction | priceFilter }}</strong>
					</div>
					<div v-else-if="order.field_order_type !=='京东'" class="z-cell-item z-text-right">
						<span>共{{order.field_count}}件 |</span>
						<span>实付:{{order.field_payment_amount}}元 |</span>
						返￥<strong>{{ order.field_forecast_income | priceFilter }}</strong>
					</div>
					<div v-else class="z-cell-item z-text-right">
						<span>共{{order.field_count}}件 |</span>
						<span>实付:{{order.field_payment_amount}}元 |</span>
						返￥<strong>{{ order.field_commission | priceFilter }}</strong>
					</div>
					<!--<div class="z-cell-item z-text-right">
						<span class="service zui-icon zui-icon-KEFU">联系客服</span>
						<span 
							v-if="order.state === ''"
							class="state-plain-btn">取消订单</span>
						<pay-way
							:title="'立即付款'"
							v-if="order.state === 'needPay'"
							class="state-btn"
							@pay-click="payBtnHandler()">
						</pay-way>
						<span 
							v-if="order.state === 'needSend'"
							class="state-btn">
							退款
						</span>
						<span 
							v-if="order.state === 'needGet'"
							class="state-btn">
							确认收货
						</span>
						<router-link 
							:to="{
								name: 'commentPost',
							}"
							v-if="order.state === 'needComment'"
							class="state-btn">
							评价
						</router-link>
						<span 
							v-if="order.state === 'needService'"
							class="state-btn">
							退款中
						</span>
					</div>-->
				</div>
			</shop-card>

			<ending-tip :showLoading="true"></ending-tip>
		</div>
	</view-box>
</div>
</template>
<script>
require('./orderList.less')
import EmptyView from '../../components/emptyView.vue'
import PayWay from '../../components/payWayPopup.vue'
import ShopCard from '../../components/shopCard.vue'
import GoodList from '../../components/GoodList.vue'
import EndingTip from '../../components/EndingTip.vue'
import {ViewBox, Tab, TabItem, XButton} from 'vux'

export default {
	components: {
		EmptyView,
		Tab, 
		TabItem,
		GoodList,
		XButton,
		EndingTip,
		ViewBox,
		ShopCard,
		PayWay
	},
	filters: {
	    colorFilter(status) {
	      const statusMap = {
	        '订单结算': 'wancheng',
	        '订单付款': 'fukuan',
	        '订单失效': 'shixiao',
	        '已返利': 'fanli'
	      }
	      return statusMap[status]
	    },
	    priceFilter(price) {
	    	if (localStorage.getItem("level") === 'vip'){
	    		return Math.floor(price * 0.7 * 100)/100 
	    	}else if(localStorage.getItem("level") === 'wangzhe'){
	    		return Math.floor(price * 0.5 * 100)/100
	    	}else {
	    		return Math.floor(price * 0.5 * 100)/100
	    	}
	       
 	    }
	},
	data() {
		return {
			orderList: [],
			list: [
				{
					tag: '	',
					text: '全部'
				},
				{
					tag: '已返利',
					text: '已返利'
				},
				{
					tag: '订单结算',
					text: '订单结算'
				},
				{
					tag: '订单付款',
					text: '订单付款'
				},
				{
					tag: '订单失效',
					text: '订单失效'
				}
			],
			index: 0
		}
	},
	activated() {
		this.initOrders()
	},
	computed: {
		computedTag() {
			return this.$route.query.tag
		},
		ComputedState() {

		},
		loading() {
			return this.$store.getters.loading
		}
	},
	methods: {
		payBtnHandler(){

		},
		tabHandler(tag){
			const that = this
			this.$http.get('https://taoapi.04wu.com/my/orders?_format=json&jdadzoneid='+localStorage.getItem("jdadzoneid")+'&adzoneid='+localStorage.getItem("adzoneid")+'&field_order_status_value='+
				tag)
		     .then(function(res){
		     	that.orderList = res.data
		     })
		     .catch(function(err){
			})
		},
		initOrders() {
			if(this.$route.query.tag === undefined){
				this.$route.query.tag = ''
			}
			const that = this
			this.$http.get('https://taoapi.04wu.com/my/orders?_format=json&jdadzoneid='+localStorage.getItem("jdadzoneid")+'&adzoneid='+localStorage.getItem("adzoneid")+'&field_order_status_value='+
				this.$route.query.tag)
		     .then(function(res){
		     	that.orderList = res.data
		     })
		     .catch(function(err){
			})
		}
	}
}
</script>
<style type="text/css">
	.status {
		font-size: 12px;
    	color: #fff;
		padding: 2px 6px;
    	line-height: 1;
    	border-radius: 3px;
	}
	.wancheng {
		background: #28a745;
	}

	.fukuan {
		background: #17a2b8;
	}
	.shixiao {
		background: #808080;
	}
	.fanli {
		background: #ffbe00;
	}
</style>