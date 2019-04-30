<template>
	<div class="z-page">
	<view-box v-show="!loading">
		<address-card 
			v-show="orderDetail.address"
			:tool="false"
			:data="orderDetail.address">
		</address-card>
		
		<shop-card
			:shop="orderDetail">
			<div 
				slot="body"
				class="shop-card-body">
				<div class="good-list-wrap">
						<!--<img class="good-list-img" src="https://gd1.alicdn.com/imgextra/i1/2539332569/O1CN01TQioPA1UqdychLNor_!!2539332569.jpg_400x400.jpg" alt="">-->
					<div class="good-list-info">
						<div class="title z-ellipsis-2">
							{{orderDetail.title}}
						</div>
						<div class="subInfo z-ellipsis-2">
							<span slot="icon" class="time-icon create">下单时间：</span>{{orderDetail.field_create_time	}}
						</div>
						<span class="status" :class="orderDetail.field_order_status | colorFilter">{{orderDetail.field_order_status}}</span>
					</div>
				</div>
			</div>
			<div 
				class="shop-card-foot"
				slot="foot">
					<div v-if="orderDetail.field_forecast_income === '0.00' && orderDetail.field_order_type !=='京东'" class="z-cell-item z-text-right">
						<span>共{{orderDetail.field_count}}件 |</span>
						<span>实付:{{orderDetail.field_payment_amount}}元 |</span>
						预计返￥<strong>{{ orderDetail.field_effect_prediction | priceFilter }}</strong>
					</div>
					<div v-else-if="orderDetail.field_order_type !=='京东'" class="z-cell-item z-text-right">
						<span>共{{orderDetail.field_count}}件 |</span>
						<span>实付:{{orderDetail.field_payment_amount}}元 |</span>
						2返￥<strong>{{ orderDetail.field_forecast_income | priceFilter }}</strong>
					</div>
					<div v-else class="z-cell-item z-text-right">
						<span>共{{orderDetail.field_count}}件 |</span>
						<span>实付:{{orderDetail.field_payment_amount}}元 |</span>
						返￥<strong>{{ orderDetail.field_commission | priceFilter }}</strong>
					</div>
				<!--<div class="z-cell-item">
					优惠券
					<span class="right-tip">优惠{{orderDetail.coupon}}元</span>
				</div>
				<div class="z-cell-item">
					支付金额
					<span class="right-tip z-text-color-main">￥{{orderDetail.pay}}</span>
				</div>
				<div class="sc-foot-item">
					发票信息
					<div class="tip-box">
						{{orderDetail.bill}}
					</div>
				</div>
				<div class="sc-foot-item">
					买家留言
					<div class="tip-box">
						{{orderDetail.guestMsg}}
					</div>
				</div>
				<div class="sc-foot-item">
					<div class="subInfo">
						订单编号:{{orderDetail.id}}
					</div>
					<div class="subInfo">
						提交时间:{{orderDetail.createdAt}}
					</div>
				</div>
				<div class="z-cell-item z-text-right">
					<span class="service zui-icon zui-icon-KEFU">联系客服</span>
					<span 
						v-if="orderDetail.state === 0"
						class="state-plain-btn">取消订单
					</span>
					<pay-way
						:title="'立即付款'"
						v-if="orderDetail.state === 0"
						class="state-btn"
						@pay-click="payBtnHandler()">
					</pay-way>
					<span 
						v-if="orderDetail.state === 1"
						class="state-btn">
						退款
					</span>
					<span 
						v-if="orderDetail.state === 2"
						class="state-btn">
						确认收货
					</span>
					<span 
						v-if="orderDetail.state === 3"
						class="state-btn">
						评价
					</span>
					<span 
						v-if="orderDetail.state === 4"
						class="state-btn">
						退款中
					</span>
				</div>-->
			</div>
		</shop-card>
	</view-box>
</div>
</template>
<script>
require('./orderDetail.less')
require('./orderList.less')
import {myOrder} from '../../data/data.js'

import AddressCard from '../../components/addressCard.vue'
import GoodList from '../../components/GoodList.vue'
import ShopCard from '../../components/shopCard.vue'
import PayWay from '../../components/payWayPopup.vue'
import {ViewBox} from 'vux'

export default {
	components: {
		AddressCard,
		GoodList,
		ShopCard,
		ViewBox,
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
			orderDetail: {
				field_order_no: '',
				field_order_type: '',
				title: ''
			}
		}
	},
	activated() {
		this.initOrder()
	},
	computed: {
		loading(){
			return this.$store.getters.loading
		},
	},
	methods: {
		initOrder(){
			const that = this
			this.$http.get('https://taoapi.04wu.com/node/' + this.$route.params.id + '?_format=json')
		     .then(function(res){
		     	that.orderDetail.field_order_no = res.data.field_order_no[0].value
		     	that.orderDetail.field_order_type = res.data.field_order_type[0].value
		     	that.orderDetail.field_create_time = res.data.field_create_time[0].value
		     	that.orderDetail.field_order_status = res.data.field_order_status[0].value
		     	that.orderDetail.title = res.data.title[0].value
		     	that.orderDetail.field_count = res.data.field_count[0].value
		     	that.orderDetail.field_payment_amount = res.data.field_payment_amount[0].value
		     	that.orderDetail.field_forecast_income = res.data.field_forecast_income[0].value
		     	if (res.data.field_effect_prediction.length > 0) {
		     	  that.orderDetail.field_effect_prediction = res.data.field_effect_prediction[0].value
		     	}
		     	that.orderDetail.field_commission = res.data.field_commission[0].value
		     })
		     .catch(function(err){
			})
		    console.log(this.orderDetail)
		}
	}
}
</script>