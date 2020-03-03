import RouterAdapter from './RouterAdapter';

export default class MpRouterAdapter extends RouterAdapter {
    _doing = false;

    constructor (props) {
        super(props);
        this.random = Math.random();
    }

    /*
    * @param {Route} route
    * */
    go (route) {
        if (this._doing) return;
        this._doing = true;
        wx.reLaunch({
            url: route.url(),
            complete: (res) => {
                setTimeout(() => {
                    this._doing = false;
                }, 1000);
            }
        });
    }

    push (route) {
        if (this._doing) return;
        this._doing = true;
        wx.navigateTo({
            url: route.url(),
            complete: (res) => {
                setTimeout(() => {
                    this._doing = false;
                }, 1000);
            }
        })
    }

    replace (route) {
        if (this._doing) return;
        this._doing = true;
        wx.redirectTo({
            url: route.url(),
            complete: (res) => {
                setTimeout(() => {
                    this._doing = false;
                }, 1000);
            }
        })
    }

    back () {
        if (this._doing) return;
        this._doing = true;
        wx.navigateBack({
            complete: (res) => {
                setTimeout(() => {
                    this._doing = false;
                }, 1000);
            }
        })
    }
}
