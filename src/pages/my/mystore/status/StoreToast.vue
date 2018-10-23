<template>
	<div id="store">
		<!--<div id="select_date">
			<picker :range="selectDate" :value="nowSelectDate" id="select_date_ranges" @change="selectDateNow">{{selectDate[nowSelectDate]}}</picker>
			<i id="select_date_arrow"></i>
		</div>-->
		<div id="store_total">
			<em>库存统计</em>
			<font>(每日14:00更新数据)</font>
			<i>2018/08/08 14:00</i>
		</div>
		<div id="store_product">
			<div id="store_product_left">
				<ul>
					<li v-for="(category, index) in categories" :class="{storetab_select_now: currentCategoryIndex == index}" :key="index" 
						@click="changeCategoryIndex(index, category.id)">{{category.name}}</li>
				</ul>
			</div>
			<div id="store_product_right">
				<div class="store_product_list">
					<div v-for="item in storeMerchandises" :key="item.id" class="store_product_list_li">
						<em>{{item.name}}<i>￥{{item.sell_price}}</i></em>
						<em>{{item.code}}<i class="num_change" @click="numChange(item)">{{item.stock_num}}个</i></em>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Store',
		data() {
			return {
				//				nowSelectDate: 0,
				selectDate: ["今日", "本周", "本月"]
			}
		},
		watch: {
			categories(nv, ov) {
				if(nv && nv !== ov) {
					this.changeCategoryIndex(0, nv[0]['id']);
				}
			}
		},
		computed: {
			categories() {
				return this.$store.getters['store.categories/list'];
			},
			currentCategoryIndex() {
				return this.$store.getters['myStore.merchandises/currentCategoryIndex'];
			},
			storeMerchandises() {
				return this.$store.getters['myStore.merchandises/list'];
			}
		},
		methods: {
			//			selectDateNow(e) {
			//				let num = e.target.value;
			//				this.nowSelectDate = num;
			//				if(num == 0) {
			//					console.log(666);
			//				} else if(num == 1) {
			//					console.log(888)
			//				} else {
			//					console.log(999)
			//				}
			//			},
			changeCategoryIndex(index, catgoryId) {
				this.$store.dispatch('myStore.merchandises/setCurrentCategory', {
					categoryIndex: index
				});
				this.$command('GET_STORE_MERCHANDISES', storeId, catgoryId);
			},
			numChange(merchandise) {
				this.$emit("showToast", merchandise);
			}
		},
		created() {
			let storeId = 1;
//			this.$command('GET_STORE_CATEGORIES', storeId);
		}
	}
</script>

<style scoped>
	#store {
		position: relative;
	}
	
	#select_date {
		margin: 20rpx;
		padding: 6rpx 20rpx;
		line-height: 52rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
		position: relative;
		display: none;
	}
	
	#select_date_ranges {
		font-size: 28rpx;
		font-weight: 300;
	}
	
	#select_date_arrow {
		position: absolute;
		right: 20rpx;
		top: 22rpx;
		height: 20rpx;
		width: 20rpx;
		background: url(../../../../../static/images/select_arrow.png) no-repeat center center;
		background-size: 90%;
	}
	
	#store_total {
		margin: 20rpx;
		padding: 6rpx 20rpx;
		line-height: 52rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
		font-size: 28rpx;
		font-weight: 300;
	}
	
	#store_total em {
		display: inline-block;
		font-weight: 400;
		padding-right: 10rpx;
	}
	
	#store_total font {
		display: inline-block;
		color: #999999;
		font-size: 26rpx;
	}
	
	#store_total i {
		/*display: inline-block;*/
		display: none;
		float: right;
		color: #828282;
	}
	
	#store_product {
		margin: 20rpx;
		font-size: 28rpx;
		font-weight: 300;
	}
	
	#store_product_left {
		width: 130rpx;
		float: left;
		background: #FFFFFF;
		border-radius: 0 20rpx 20rpx 0;
		overflow: hidden;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
	}
	
	#store_product_left ul li {
		line-height: 118rpx;
		text-align: center;
		border-bottom: 1rpx solid #FCFCFC;
		font-weight: 400;
	}
	
	#store_product_right {
		float: right;
		width: 570rpx;
	}
	
	.store_product_list_li {
		background: #FFFFFF;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 4rpx 10rpx rgba(204, 202, 202, .3);
		margin-bottom: 10rpx;
	}
	
	.store_product_list_li em {
		line-height: 54rpx;
		font-weight: 400;
		color: #111111;
	}
	
	.store_product_list_li em i {
		float: right;
		padding-left: 50rpx;
	}
	
	.store_product_list_li em i.num_change {
		background: url(../../../../../static/images/my_product_num_change.png) no-repeat 10rpx center;
		background-size: 26rpx;
	}
	
	.storetab_select_now {
		color: #FECE00;
		border-left: 10rpx solid #FECE00;
	}
</style>