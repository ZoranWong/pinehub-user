<template>
	<div v-show="display" id="toast_area">
		<div id="toast">
			<i id="toast_clost" @click="toastClose"></i>
			<div id="toast_title">
				导入常用购物车
			</div>
			<div id="toast_content">
				<div id="toast_content_info">
					<div class="fsc_title">
						选择常用购物车
					</div>
					<div id="fsc_select">
						<dl @click="selectNowShoppingCart(index)" v-for="(item, index) in shoppingCartList" :key="index" :class="{fsc_unuse:item == null}">
							<dd></dd>
							<dt :class="{fsc_now:index == selectCur}"></dt>
						</dl>
					</div>
					<div class="fsc_title">
						备注名称
					</div>
					<div class="fsc_now_title">
						{{shoppingCartName}}
					</div>
					{{shoppingCartsList}}
					<div id="input_change_btn" @click="importShoppingCart">
						导入购物车
					</div>
					<div id="input_change_tips">
						注：因后期核实需要请您如实填写
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
				default: true,
				type: Boolean
			}
		},
		data() {
			return {
				//				shoppingCartList: [{
				//					'id': 1,
				//					'name': '早餐专用'
				//				}, {
				//					'id': 2,
				//					'name': '上午茶专用'
				//				}, {
				//					'id': 3,
				//					'name': '午餐专用'
				//				}, {
				//					'id': 4,
				//					'name': '下午茶专用'
				//				}, null],
				shoppingCartName: '',
				shoppingCartId: null,
				selectCur: 0
			}
		},
		computed: {
			shoppingCartList() {
				return this.$store.getters['model.shoppingcart.always.use/list'];
			},
		},
		watch: {},
		methods: {
			selectNowShoppingCart(index) {
				if(this.shoppingCartList[index]) {
					this.shoppingCartName = this.shoppingCartList[index].name;
					this.shoppingCartId = this.shoppingCartList[index].id;
					this.selectCur = index;
				} else {
					wx.showToast({
						title: '该购物车尚未添加',
						icon: 'none'
					})
				}
			},
			importShoppingCart() {
				let shoppingCartId = this.shoppingCartId;
				console.log(shoppingCartId)
				let result = this.$command('IMPORT_SHOPPING_CART', shoppingCartId);
				console.log(shoppingCartId);
				if(result) {
					console.log('PRINT THIS', this);
					this.$emit('close');
				}
			},
			//			returnBtn(id, primaryStockNum, modifyStockNum, reason, comment) {
			//				modifyStockNum = parseInt(modifyStockNum);
			//				console.log('modifyStockNum', modifyStockNum);
			//				if(isNaN(modifyStockNum) || modifyStockNum < 0) {
			//					wx.showToast({
			//						title: '正确填写库存',
			//						icon: 'none'
			//					})
			//				} else if(modifyStockNum === this.merchandise['stockNum']) {
			//					wx.showToast({
			//						title: '库存没有任何改变',
			//						icon: 'none'
			//					})
			//				} else {
			//					wx.showLoading({
			//						title: '正在提交...'
			//					});
			//					console.log('returnBtn', id, primaryStockNum, modifyStockNum, reason, comment);
			//					this.$emit('modifyStock', id, primaryStockNum, modifyStockNum, reason, comment);
			//					this.productInfo = {};
			//					this.productInfo['reason'] = this.selectCause[0]['name'];
			//					this.radioCur = 0;
			//					this.$emit('close');
			//				}
			//			},
			toastClose() {
				this.$emit('close');
			},
			async shoppingCartInit() {
				await this.$command('LOAD_MERCHANT_SAVED_SHOPPING_CARTS');
				this.shoppingCartName = await this.shoppingCartList[0].name;
				this.shoppingCartId = await this.shoppingCartList[0].id;
			}
		},
		mounted() {
			this.shoppingCartInit();
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
	
	.fsc_now_title {
		font-size: 32rpx;
		font-weight: 300;
		color: #787878;
		margin-bottom: 30rpx;
	}
	
	#fsc_select {
		overflow: hidden;
		margin: 20rpx 0 40rpx;
	}
	
	#fsc_select dl {
		float: left;
		width: 75rpx;
		margin-right: 42rpx;
	}
	
	#fsc_select dl:last-child {
		margin-right: 0;
	}
	
	#fsc_select dl dt {
		width: 48rpx;
		height: 48rpx;
		background: url(../../../../../static/images/icon/ico_select_fsc_off.png) no-repeat center center;
		background-size: 48rpx 48rpx;
		margin: 30rpx auto 0;
	}
	
	#fsc_select dl dt.fsc_now {
		background: url(../../../../../static/images/icon/ico_select_fsc_on.png) no-repeat center center;
		background-size: 48rpx 48rpx;
	}
	
	#fsc_select dl dd {
		width: 70rpx;
		height: 70rpx;
		margin: 0 auto;
	}
	
	#fsc_select dl:nth-child(1).fsc_unuse dd {
		background: url(../../../../../static/images/icon/ico_my_fsc_g_1.png) no-repeat center center;
		background-size: 70rpx 70rpx;
	}
	
	#fsc_select dl:nth-child(2).fsc_unuse dd {
		background: url(../../../../../static/images/icon/ico_my_fsc_g_2.png) no-repeat center center;
		background-size: 70rpx 70rpx;
	}
	
	#fsc_select dl:nth-child(3).fsc_unuse dd {
		background: url(../../../../../static/images/icon/ico_my_fsc_g_3.png) no-repeat center center;
		background-size: 70rpx 70rpx;
	}
	
	#fsc_select dl:nth-child(4).fsc_unuse dd {
		background: url(../../../../../static/images/icon/ico_my_fsc_g_4.png) no-repeat center center;
		background-size: 70rpx 70rpx;
	}
	
	#fsc_select dl:nth-child(5).fsc_unuse dd {
		background: url(../../../../../static/images/icon/ico_my_fsc_g_5.png) no-repeat center center;
		background-size: 70rpx 70rpx;
	}
	
	#fsc_select dl:nth-child(1) dd {
		background: url(../../../../../static/images/icon/ico_my_fsc_1.png) no-repeat center center;
		background-size: 70rpx 70rpx;
	}
	
	#fsc_select dl:nth-child(2) dd {
		background: url(../../../../../static/images/icon/ico_my_fsc_2.png) no-repeat center center;
		background-size: 70rpx 70rpx;
	}
	
	#fsc_select dl:nth-child(3) dd {
		background: url(../../../../../static/images/icon/ico_my_fsc_3.png) no-repeat center center;
		background-size: 70rpx 70rpx;
	}
	
	#fsc_select dl:nth-child(4) dd {
		background: url(../../../../../static/images/icon/ico_my_fsc_4.png) no-repeat center center;
		background-size: 70rpx 70rpx;
	}
	
	#fsc_select dl:nth-child(5) dd {
		background: url(../../../../../static/images/icon/ico_my_fsc_5.png) no-repeat center center;
		background-size: 70rpx 70rpx;
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