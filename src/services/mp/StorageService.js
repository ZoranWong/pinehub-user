import Service from '../Service';

export default class StorageService extends Service {
    set (key, value) {
        return new Promise((resolve) => {
            wx.setStorage({
                key: key,
                data: value,
                success: function (res) {
                    resolve(res);
                }
            });
        });
    }

    get (key) {
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: key,
                success: function (res) {
                    resolve(res.data);
                },
                fail: function (e) {
                    resolve(false);
                }
            });
        });
    }

    remove (key) {
        return new Promise((resolve) => {
            wx.removeStorage({
                key: key,
                success: function (res) {
                    resolve(res);
                }
            });
        });
    }

    clear () {
        return new Promise((resolve) => {
            wx.clearStorage({
                success: function (res) {
                    resolve(res);
                }
            });
        });
    }
}
