<template>
	<div class="z-page">
		<div class="mine-head-wrap">
			<flexbox>
		    	<flexbox-item>
		    		<img :src="userInfo.headimgurl"/>
					<div class="mine-info">
						<span class="name">{{userInfo.nickname}}</span>
					</div></flexbox-item>
		    	<flexbox-item>
			      	<div class="right-info">
						<span class="tishi">0</span>
					</div>
					<div class="right-info">
						<span class="tishi">可提现金额(元)</span>
					</div>
				</flexbox-item>
		    </flexbox>
			<!--
			<router-link
				class="setting zui-icon zui-icon-setting"
				:to="{
					name: 'mySetting'
				}">
			</router-link>
		-->
		</div>
	  <!--<cell 
			class="z-cell-item"
			:title="'收入明细'" 
			:link="{
				name: 'myLike'
			}">
		</cell>-->
		<!--<card header="我的钱包">
	      <div slot="content" class="card-demo-flex card-demo-content01">
	        <div class="vux-1px-r">
	          <span>1130</span>
	          <br/>
	          累计返现
	        </div>
	        <div class="vux-1px-r">
	          <span>15</span>
	          <br/>
	          上月预估
	        </div>
	        <div class="vux-1px-r">
	          <span>0</span>
	          <br/>
	          本月预估
	        </div>
	      </div>
	    </card>-->
		<group>
		<div class="mine-order-wrap">
			<cell 
				class="mine-order-all"
				title="我的订单" 
				:value="'查看全部'" 
				:link="{
					name: 'orderList',
					query: {tag:orderTag.all.tag}
				}">
			</cell>
			<flexbox :gutter="0">
				<flexbox-item>
					<router-link
						class="mine-order-item"
						:to="{
							name: 'orderList',
							query: {tag: orderTag.pay.tag}
						}">
						<span :class="orderTag.pay.icon"></span>
						<div>{{orderTag.pay.text}}</div>
					</router-link>
				</flexbox-item>
				<flexbox-item>
					<router-link
						class="mine-order-item"
						:to="{
							name: 'orderList',
							query: {tag: orderTag.send.tag}
						}">
						<span :class="orderTag.send.icon"></span>
						<div>{{orderTag.send.text}}</div>
					</router-link>
				</flexbox-item>
				<flexbox-item>
					<router-link
						class="mine-order-item"
						:to="{
							name: 'orderList',
							query: {tag: orderTag.comment.tag}
						}">
						<span :class="orderTag.comment.icon"></span>
						<div>{{orderTag.comment.text}}</div>
					</router-link>
				</flexbox-item>
				<flexbox-item>
					<router-link
						class="mine-order-item"
						:to="{
							name: 'orderList',
							query: {tag: orderTag.sole.tag}
						}">
						<span :class="orderTag.sole.icon"></span>
						<div>{{orderTag.sole.text}}</div>
					</router-link>
				</flexbox-item>
			</flexbox>
		</div>
		</group>
		<!--<group >
			<cell 
				class="z-cell-item"
				:title="'我的收藏'" 
				:link="{
					name: 'myLike'
				}">
			</cell>
			<cell 
				class="z-cell-item"
				:title="'我的优惠券'" 
				:link="{
					name: 'myCoupon'
				}">
			</cell>
			<cell 
				class="z-cell-item"
				:title="'收货地址'" 
				:link="{
					name: 'myAddress'
				}">
			</cell>
			<cell 
				class="z-cell-item"
				:title="'足迹'" 
				is-link>
			</cell>
		</group>-->
	</div>
</template>
<script>
require('./mine.less')
import { Card, Badge, Cell, Group, Flexbox, FlexboxItem } from 'vux'
export default {
	components: {
		Card,
		Badge,
		Group,
		Cell,
		FlexboxItem,
		Flexbox
	},
	data() {
		return {
			userInfo: {
				nickname: '陆大',
				headimgurl: 'http://thirdwx.qlogo.cn/mmopen/8Zg6QPBeP0ssLgJlNyPibAm4YwC6jFcdAR0t04vG4Eeq258s0tsoGYPvheLlVQQDhXXiaggo7qRrvycodYicndMBUn4D6hDbBIJ/132'
			},
			orderTag: {
				all: {
					tag: '',
					text: '我的订单',
					icon: ''
				},
				pay: {
					tag: '已返利',
					text: '已返利',
					icon: 'zui-icon zui-icon-payment'
				},
				send: {
					tag: '订单结算',
					text: '订单结算',
					icon: 'zui-icon zui-icon-shipped'
				},
				comment: {
					tag: '订单付款',
					text: '订单付款',
					icon: 'zui-icon zui-icon-comment'
				},
				sole: {
					tag: '订单失效',
					text: '订单失效',
					icon: 'zui-icon zui-icon-KEFU'
				}
			}
		}
	},
	created() {
		this.init()
	},
	methods: {
		init() {
			this.userInfo.nickname = localStorage.getItem("nickname")
			this.userInfo.headimgurl = localStorage.getItem("headimgurl")
		}
	}
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.right-info {
	width:100%;
}
.right-info span{
	float:right;
	width:100%;
}
.tishi{
	font-size: 12px;
    color: #ffffff;
}
</style>