import Service from '../Service';
export default class StorageService extends Service {
	constructor($application) {
		super($application);
	}

	set(key, value) {
		return new Promise((resolve) => {
			wx.setStorage({
				key: key,
				data: value,
				success: function(res) {
					console.log('set cache data', wx.getStorageSync(key));
					resolve(res);
				}
			});
		});
	}
	get(key) {
		return new Promise((resolve, reject) => {
			wx.getStorage({
				key: key,
				success: function(res) {
					resolve(res.data);
				},
				fail: function(e) {
					console.log('获取数据' + key + '失败', e);
					resolve(false);
				}
			});
		});
	}

	remove(key) {
		return new Promise((resolve) => {
			wx.removeStorage({
				key: key,
				success: function(res) {
					resolve(res);
				}
			});
		});
	}

	clear() {
		return new Promise((resolve) => {
			wx.clearStorage({
				success: function(res) {
					resolve(res);
				}
			});
		});
	}
}