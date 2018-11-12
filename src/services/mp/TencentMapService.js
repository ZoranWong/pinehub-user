import Service from '../Service';
import Qmap from '../../../static/jssdk/qqmap-wx-jssdk';
export default class TencentMapService extends Service {
	constructor($application) {
		super($application);
		this.map = new Qmap({
			key: $application.config['app']['mapKey'] // 必填
		});
		console.log(this.map);
	}
	//地址转换坐标
	searchAddressToLocation(address) {
		return new Promise((resolve, reject) => {
			this.map.geocoder({
				address: address,
				success: function(res) {
					// console.log(res);
					//	返回对象 {lat, lng}
					resolve(res.result.location);
				},
				fail: function(error) {
					// console.log(error);
					reject(error);
				}
			});
		});
	}
	//通过坐标查询城市
	searchLocationToCity(lat, lng) {
		return new Promise((resolve, reject) => {
			this.map.reverseGeocoder({
				location: {
					latitude: lat,
					longitude: lng
				},
				success: function(res) {
					// console.log(res);
					resolve(res.result.address_component.city);
				},
				fail: function(error) {
					// console.log(error);
					reject(error);
				}
			});
		})
	}

	//渲染地图
	getLocation() {
		return new Promise((resolve, reject) => {
			wx.getLocation({
				type: 'wgs84',
				success: function(res) {
					let result = {
						lat: res.latitude,
						lng: res.longitude
					};
					resolve(result);
				},
				fail: function(error) {
					console.log(error);
					reject(error);
				}
			});
		})
	}

	//移动位置
	moveToLocation() {
		this.mapCtx = wx.createMapContext('map');
		this.mapCtx.moveToLocation();
	}
}
