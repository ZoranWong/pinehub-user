<template>
	<div v-show="display" id="toast_area">
		<div id="toast">
			<i id="toast_clost" @click="toastClose"></i>
			<div id="toast_title">
				保存常用购物车
			</div>
			<div id="toast_content">
				<div id="toast_content_info">
					<div class="fsc_title">
						购物车名称
					</div>
					<div class="fsc_input">
						<input type="text" v-model="shoppingCartName" />
					</div>
					<div class="fsc_title">
						产品列表
					</div>
					<div id="fsc_products">
						<ul>
							<li><em>三明治（牛肉味）</em><i>3份</i></li>
							<li><em>饭卷（海苔味）</em><i>1份</i></li>
						</ul>
					</div>
					<!--<div id="input_change_list">
						<ul>
							<li v-for="(item,index) in selectCause" :key="item.id" :class="{input_now_select:radioCur == index}" @click="radioSelect(index,item.id)">{{item.name}}</li>
						</ul>
					</div>-->
					<div id="input_change_btn" @click="returnBtn(merchandise['id'], merchandise['stockNum'], productInfo['newStockNum'], productInfo['reason'], comment)">
						保存
					</div>
					<div id="input_change_tips">
						注：填写名称并保存到最新的购物车中
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Toast',
		props: {
			'display': {
				default: false,
				type: Boolean
			}
		},
		data() {
			return {
				shoppingCartName: ''
			}
		},
		watch: {},
		methods: {
			returnBtn(id, primaryStockNum, modifyStockNum, reason, comment) {
				modifyStockNum = parseInt(modifyStockNum);
				console.log('modifyStockNum', modifyStockNum);
				if(isNaN(modifyStockNum) || modifyStockNum < 0) {
					wx.showToast({
						title: '正确填写库存',
						icon: 'none'
					})
				} else if(modifyStockNum === this.merchandise['stockNum']) {
					wx.showToast({
						title: '库存没有任何改变',
						icon: 'none'
					})
				} else {
					wx.showLoading({
						title: '正在提交...'
					});
					console.log('returnBtn', id, primaryStockNum, modifyStockNum, reason, comment);
					this.$emit('modifyStock', id, primaryStockNum, modifyStockNum, reason, comment);
					this.productInfo = {};
					this.productInfo['reason'] = this.selectCause[0]['name'];
					this.radioCur = 0;
					this.$emit('close');
				}
			},
			toastClose() {
				this.$emit('close');
			}
		}
	}
</script>

<style scoped>
	#toast_area {
		position: fixed;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .3);
		z-index: 1000;
	}
	
	#toast {
		position: absolute;
		background: #FFFFFF;
		width: 620rpx;
		border-radius: 10rpx;
		top: 100rpx;
		left: 65rpx;
	}
	
	#toast_clost {
		position: absolute;
		height: 78rpx;
		width: 78rpx;
		background: url(../../../../../static/images/icon/my_toast_close.png) no-repeat center center;
		background-size: 100%;
		right: -14rpx;
		top: -20rpx;
	}
	
	#toast_title {
		background: #FECE00;
		text-align: center;
		line-height: 96rpx;
		border-radius: 10rpx 10rpx 0 0;
		font-size: 34rpx;
		font-weight: 400;
	}
	
	#toast_content {}
	
	#toast_content_info {
		padding: 20rpx 40rpx;
	}
	
	.fsc_title {
		font-size: 32rpx;
		font-weight: 400;
		color: #111111;
		margin-bottom: 20rpx;
	}
	
	.fsc_input {
		margin-bottom: 22rpx;
	}
	
	.fsc_input input {
		border: 1rpx solid #FFD000;
		height: 56rpx;
		padding-left: 10rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
	}
	
	#fsc_products {
		margin-bottom: 20rpx;
	}
	
	#fsc_products ul li {
		font-size: 32rpx;
		font-weight: 300;
		line-height: 52rpx;
	}
	
	#fsc_products ul li em {
		display: inline-block;
		width: 60%;
	}
	
	#fsc_products ul li i {
		display: inline-block;
		width: 40%;
		text-align: right;
	}
	
	#input_change_list ul li {
		line-height: 78rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 2rpx 5rpx rgba(204, 202, 202, .6);
		margin-bottom: 20rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: 400;
		color: #111111;
		background: url(../../../../../static/images/icon/my_select_none.png) no-repeat;
		background-size: 44rpx;
		background-position: 40rpx center;
	}
	
	#input_change_list ul li.input_now_select {
		background: url(../../../../../static/images/icon/my_select_ok.png) no-repeat;
		background-size: 44rpx;
		background-position: 40rpx center;
	}
	
	#input_change_btn {
		background: #FECE00;
		line-height: 78rpx;
		text-align: center;
		font-size: 34rpx;
		font-weight: 400;
		border-radius: 10rpx;
	}
	
	#input_change_tips {
		font-size: 22rpx;
		font-weight: 300;
		color: #828282;
		text-align: center;
		line-height: 68rpx;
	}
</style>