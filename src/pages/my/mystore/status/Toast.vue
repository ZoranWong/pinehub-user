<template>
	<div v-show="display" id="toast_area">
		<div id="toast">
			<i id="toast_clost" @click="toastClose"></i>
			<div id="toast_title">
				修改库存
			</div>
			<div id="toast_content">
				<div id="toast_content_info">
					<div id="input_change">
						<div class="input_num">
							{{merchandise['stock_num']}}
						</div>
						<input class="input_num input_num_right" type="number" v-model="productInfo.modify_stock_num" />
					</div>
					<div id="input_change_info">
						修改原因
					</div>
					<div id="input_change_list">
						<ul>
							<li v-for="(item,index) in selectCause" :key="item.id" :class="{input_now_select:radioCur == index}" @click="radioSelect(index,item.id)">{{item.name}}</li>
						</ul>
					</div>
					<div id="input_change_btn" @click="returnBtn">
						确认修改
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
			'merchandise': {
				default: function() {
					return {}
				},
				type: Object
			},
			'display': {
				default: false,
				type: Boolean
			}
		},
		data() {
			return {
				selectCause: [{
					"id": 0,
					"name": "商品损坏"
				}, {
					"id": 1,
					"name": "商品丢失"
				}, {
					"id": 2,
					"name": "商品过期"
				}],
				radioCur: 0,
				productInfo: {}
			}
		},
		watch: {
			//			display(n, o){
			//				console.log(n, o);
			//			}
		},
		methods: {
			radioSelect(num, id) {
				this.radioCur = num;
				this.productInfo.reason = id;
			},
			returnBtn() {
				let productNum = parseInt(this.productInfo.modify_stock_num);
				if(isNaN(productNum) || productNum < 0) {
					wx.showToast({
						title: "正确填写库存",
						icon: "none"
					})
				} else {
					this.productInfo.merchandise_id = this.merchandise['id'];
					this.productInfo.primary_stock_num = this.merchandise['stock_num'];
					this.productInfo['comment'] = "";
					console.log(this.productInfo);
				}
			},
			toastClose() {
				this.$emit("close");
			}
		},
		created() {
			this.productInfo.reason = this.selectCause[0].id;
		},
		beforeUpdate() {
			//数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
		}
	}
</script>

<style scoped>
	#toast_area {
		position: absolute;
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
		background: url(../../../../../static/images/my_toast_close.png) no-repeat center center;
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
	
	#input_change {
		overflow: hidden;
		margin-bottom: 20rpx;
		background: url(../../../../../static/images/my_toast_arrow.png) no-repeat center center;
		background-size: 52rpx;
	}
	
	.input_num {
		display: inline-block;
		border: 1px solid #828282;
		width: 160rpx;
		line-height: 66rpx;
		height: 66rpx;
		text-align: center;
		border-radius: 10rpx;
		float: left;
	}
	
	.input_num.input_num_right {
		float: right;
	}
	
	#input_change_info {
		font-size: 32rpx;
		font-weight: 300;
		color: #111111;
		margin-bottom: 20rpx;
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
		background: url(../../../../../static/images/my_select_none.png) no-repeat;
		background-size: 44rpx;
		background-position: 40rpx center;
	}
	
	#input_change_list ul li.input_now_select {
		background: url(../../../../../static/images/my_select_ok.png) no-repeat;
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