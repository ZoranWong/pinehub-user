import Service from '../Service';
import Qmap from '../../../static/jssdk/qqmap-wx-jssdk';

export default class TencentMapService extends Service {
    constructor ($application) {
        super($application);
        this.map = new Qmap({
            key: $application.config['app']['mapKey'] // 必填
        });
    }

    // 地址转换坐标
    searchAddressToLocation (address) {
        return new Promise((resolve, reject) => {
            this.map.geocoder({
                address: address,
                success: function (res) {
                    // console.log(res);
                    // 返回对象 {lat, lng}
                    resolve(res.result.location);
                },
                fail: function (error) {
                    // console.log(error);
                    reject(error);
                }
            });
        });
    }

    // 通过坐标查询城市
    searchLocationToCity (lat, lng) {
        return new Promise((resolve, reject) => {
            this.map.reverseGeocoder({
                location: {
                    latitude: lat,
                    longitude: lng
                },
                success: function (res) {
                    // console.log(res);
                    resolve(res.result.address_component.city);
                },
                fail: function (error) {
                    // console.log(error);
                    reject(error);
                }
            });
        })
    }

    // 渲染地图
    getLocation () {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                    let result = [res.longitude, res.latitude];
                    resolve(result);
                },
                fail: function () {
                    resolve(false);
                }
            });
        })
    }

    // 地图拖拽
    getCenterLocation () {
        let map = wx.createMapContext('checkedMap');
        return new Promise((resolve, reject) => {
            map.getCenterLocation({
                type: 'gcj02',
                success: function (res) {
                    let result = [res.longitude, res.latitude];
                    resolve(result)
                },
                fail: function () {
                    resolve(false);
                }
            })
        })
    }

    // 搜索地图建议
    getSuggestion (e) {
        console.log(e, '_____________________--');
        return new Promise((resolve, reject) => {
            this.map.getSuggestion({
                keyword: e,
                region: '合肥',
                page_size: 8,
                success: function (res) {
                    resolve(res)
                },
                fail: function (error) {
                    console.error(error + '失败');
                },
                complete: function (res) {
                    console.log(res);
                }
            })
        })
    }

    // 搜索
    search (keyword) {
        return new Promise((resolve, reject) => {
            this.map.search({
                keyword: keyword,
                success: function (res) {
                    console.log(res.status, res.message);
                },
                fail: function (res) {
                    console.log(res.status, res.message);
                },
                complete: function (res) {
                    console.log(res.status, res.message);
                }
            })
        })
    }

    // 移动位置
    moveToLocation () {
        this.mapCtx = wx.createMapContext('checkedMap');
        this.mapCtx.moveToLocation();
    }
}
