<!--suppress ALL -->
<template>
	<div id="location">
		<mp-title :title="title"></mp-title>
		<div id="location_search">
			<input id="location_search_input" v-model.trim="addressName" placeholder="搜索附近的早餐网点" />
			<i id="location_search_button" @click="searchLocation">查询</i>
		</div>
		<div id="location_map">
			<map id="map" scale="14" :latitude="latitude" :longitude="longitude" :markers="markers" @markertap="bindmarkertap" show-location>
                <cover-view id="send_time_select" v-if="show">
                    <cover-view class="top-part">
                        <cover-view class="select_li">
                            <cover-view class="select_li_title">自提点</cover-view>
                            <cover-view class="input">{{ storeAddress }}</cover-view>
                        </cover-view>
                        <cover-view class="select_li">
                            <cover-view class="select_li_title">营业时间</cover-view>
                            <cover-view class="input">{{ sendAt }}</cover-view>
                        </cover-view>
                    </cover-view>
                    <cover-view class="bottom-part">
                        <button class="cancel" @click="show = false;">取消</button>
                        <button class="confirm" @click="onSubmit">确定</button>
                    </cover-view>
                </cover-view>
                <!-- <cover-view id="locatePosition" @click="nowLocation">
					<cover-image style = "position: absolute;top: 0;left: 0;width: 100%;height: 100%;" src = "../../../../static/images/nowposition.png"></cover-image>
				</cover-view> -->
            </map>
			<div id="locatePosition" @click="nowLocation">
				<image style = "position: absolute;top: 0;left: 0;width: 100%;height: 100%;" src = "../../../../static/images/nowposition.png"></image>
			</div>
		</div>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	export default {
		components: {
			'mp-title': MpTitle
		},
		// 数据
		data() {
			return {
				title: '附近店铺/自提点',
				latitude: 0,
				longitude: 0,
				addressName: null,
				city: null,
				self: {},
				show: false
			}
		},
		watch: {
			center: {
				deep: true,
				handler(point) {
					if(point && point['lat'] && point['lng']) {
						this.latitude = point.lat;
						this.longitude = point.lng;
					}
				}
			}
		},
		// 算术方法
		computed: {
			markers() {
				let markers = this.$store.getters['model.stores/markers'];
				return markers.length > 0 ? markers : null;
			},
			center() {
				console.log('CENTER POINT', this.$store.getters['model.stores/centerPoint']);
				return this.$store.getters['model.stores/centerPoint'];
			},
			storeInfo() {
				return this.$store.getters['model.stores/selectStore'];
			},
			sendAt() {
				return this.storeInfo ? this.storeInfo.openingHours : '00:00 ～ 23:59';
			},
			storeAddress() {
				return this.storeInfo ? this.storeInfo.address : '未选择店铺';
			}
		},
		// 普通方法
		methods: {
			async flashLocation() {
				let result = await this.map.getLocation();
				this.latitude = result[1];
				this.longitude = result[0];
				this.$store.dispatch('model.stores/setLocation', {
					latitude: result[1],
					longitude: result[0]
				})
				this.$command('LOAD_STORES_AROUND', this.longitude, this.latitude);
			},
			changeSendDate(e) {
				this.sendDate = e.target.value;
			},
			nowLocation() {
				this.map.moveToLocation();
			},
			async bindmarkertap(event) {
				let storeId = await event.mp.markerId;
				if(storeId !== 0) {
					this.$store.dispatch('model.stores/selectMarker', {
						id: storeId
					});
					this.show = true;
				}
			},
			onSubmit() {
				this.show = false;
				let storeInfo = this.storeInfo;
				let route = this.$route.query['next_route'];
				this.$command('REDIRECT_TO', route, 'push', {
					query: {
						store_id: storeInfo.id,
						activity_id: this.$route.query['activity_id']
					}
				});
			}
		},
		mounted() {
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

	.bottom-part {
		display: flex;
	}

	.bottom-part button {
		width: 40%;
		line-height: 64rpx;
		font-size: 32rpx;
		background-color: #FFD000;
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

	#send_time_select {
		position: absolute;
		width: 550rpx;
		top: 50%;
		left: 50%;
		margin-top: -150rpx;
		margin-left: -275rpx;
		border-radius: 20rpx;
		padding: 40rpx;
		background: #FFFFFF;
		box-sizing: border-box;
		overflow: hidden;
		z-index: 999;
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
		border-radius: 10rpx;
	}

	#locatePosition {
		/* background: url(../../../../static/images/icon/nowposition.png) no-repeat center center; */
		background-color: #FFFFFF;
		border-radius: 50%;
		width: 50rpx;
		height: 50rpx;
		background-size: 100%;
		position: absolute;
		left: 682rpx;
		top: 160rpx;
		z-index: 99999999;
	}
</style>
