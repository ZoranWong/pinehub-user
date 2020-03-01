import RouterAdapter from './RouterAdapter';

export default class MpRouterAdapter extends RouterAdapter {
    /*
    * @param {Route} route
    * */
    go (route) {
        wx.reLaunch({
            url: route.url()
        });
    }

    push (route) {
        wx.navigateTo({
            url: route.url()
        })
    }

    replace (route) {
        wx.redirectTo({
            url: route.url()
        })
    }

    back () {
        wx.navigateBack()
    }
}
