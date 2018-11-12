<template>
	<div id="location">
		<mp-title :title="title"></mp-title>
		<div id="location_search">
			<input id="location_search_input" v-model.trim="addressName" placeholder="搜索附近的早餐网点" />
			<i id="location_search_button" @click="searchLocation">查询</i>
		</div>
		<div id="location_map">
			<map id="map" scale="14" :latitude = "latitude" :longitude = "longitude" :markers = "markers"
			@markertap = "bindmarkertap" show-location></map>
			<div id="location_select_address">
				<div class="select_li">
					<span class="select_li_title">日期</span>
					<picker mode="date" :start="startTime" class="input" @change="getSelectDate">{{selectDate}}</picker>
				</div>
				<div class="select_li">
					<span class="select_li_title">时间</span>
					<div class="input">上午 9:00 ~ 12:00</div>
				</div>
			</div>
			<i id="nowposition" @click="nowLocation"></i>
		</div>
	</div>
</template>

<script>
	import SearchLocationCommand from '@/commands/SearchLocationCommand';
	import MpTitle from '@/components/MpTitle';
	import _ from 'underscore';
	export default {
		components: {
			"mp-title": MpTitle
		},
		//数据
		data() {
			return {
				title: "选择自提点",
				latitude: 0,
				longitude: 0,
				addressName: null,
				city: null,
				startTime: (new Date()).format('yyyy-MM-dd'),
				selectDate: (new Date()).format('yyyy 年 MM 月 dd 日'),
				self: {}
			}
		},
		watch: {},
		//算术方法
		computed: {
			markers() {
				let markers = this.$store.getters['model.nearbyStores/markers'];
				return markers.length > 0 ? markers : null;
			}
		},
		//普通方法
		methods: {
			async flashLocation() {
				let result = await this.map.getLocation();
				console.log('获取定位', result);
				this.latitude = result.lat;
				this.longitude = result.lng;
				console.log('坐标---------------', this.latitude, this.longitude);
				let city = await this.map.searchLocationToCity(this.latitude, this.longitude);
				this.city = city;
				// console.log(this.latitude,this.longitude)
				this.$command('GET_NEARBY_STORES', this.latitude, this.longitude);
			},
			searchLocation() {
				// console.log(this);
				this.$command(SearchLocationCommand.commandName(), this.city + this.addressName);
			},
			nowLocation() {
				this.map.moveToLocation();
			},
			getSelectDate(e) {
				//				console.log(e.target.value);
				this.selectDate = (new Date(e.target.value)).format('yyyy 年 MM 月 dd 日');
			},
			bindmarkertap(event) {
				console.log('bindmarkertap', event);
			}
		},
		mounted() {
			// console.log('location created', this);
			this.flashLocation();
		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	#location {
		position: relative;
		height: 100%;
		width: 100%;
	}

	#location_search {
		padding: 30rpx;
		background: #FECE00;
		z-index: 1;
		position: relative;
		width: 100%;
		box-sizing: border-box;
		display: none;
	}

	#location_search_input {
		background: #ffffff;
		font-size: 28rpx;
		font-weight: 200;
		border-radius: 50rpx;
		line-height: 70rpx;
		height: 70rpx;
		padding-left: 1em;
	}

	#location_search_button {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		z-index: 999;
		line-height: 70rpx;
		background: #000000;
		padding: 0 20rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		font-weight: 200;
		border-radius: 0 70rpx 70rpx 0;
	}

	#location_map {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	#map {
		height: 100%;
		width: 100%;
	}

	#location_select_address {
		position: absolute;
		width: 550rpx;
		height: 200rpx;
		bottom: 20rpx;
		background: #FFFFFF;
		left: 50%;
		margin-left: -275rpx;
		border-radius: 20rpx;
		padding: 40rpx;
		box-sizing: border-box;
		overflow: hidden;
		display: none;
	}

	.select_li {
		display: block;
		clear: both;
		height: 80rpx;
		line-height: 40rpx;
		font-size: 28rpx;
	}

	.select_li_title {
		background: #FECE00;
		color: #FFFFFF;
		float: left;
		font-size: 24rpx;
		font-weight: 200;
		height: 40rpx;
		line-height: 40rpx;
		padding: 0 10rpx;
		border-radius: 10rpx;
	}

	.select_li_smalltitle {
		background: #FAFAFA;
		color: #000000;
		float: left;
		font-size: 24rpx;
		font-weight: 200;
		height: 40rpx;
		line-height: 40rpx;
		padding: 0 10rpx;
		border-radius: 10rpx;
	}

	.input {
		float: left;
		padding: 0 15rpx;
		margin: 0 20rpx;
		border: 1rpx solid #f0f0f0;
		border-radius: 10rpx;
	}

	#nowposition {
		background: url(../../../static/images/icon/nowposition.png) no-repeat center center;
		background-color: #FFFFFF;
		border-radius: 50%;
		width: 50rpx;
		height: 50rpx;
		background-size: 100%;
		position: absolute;
		right: 30rpx;
		top: 160rpx;
		z-index: 999;
	}
</style>
