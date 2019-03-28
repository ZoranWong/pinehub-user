import Service from '../Service';

export default class HrefService extends Service {
    // 跳转到非 tabbar 页面，保留当前页面
    async jump (url) {
        return await wx.navigateTo({
            url: url
        });
    }

    // 关闭当前页面，跳转到应用内某个页面，不允许跳转到 tabbar 页面
    async jumpNotTab (url) {
        return await wx.redirectTo({
            url: url
        });
    }

    // 关闭所有页面，打开应用内的某个页面
    async jumpClose (url) {
        return await wx.reLaunch({
            url: url
        });
    }

    // 跳转到 tabbar 页面，关闭其他页面
    async jumpTab (url) {
        return await wx.switchTab({
            url: url
        });
    }

    // 返回到指定页面，当大于现有页面数则跳转到首页
    async jumpPage (pageNum) {
        return await wx.navigateBack({
            delta: pageNum
        });
    }
}
