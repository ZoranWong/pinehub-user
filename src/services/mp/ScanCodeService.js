import Service from '../Service';

export default class scanCodeService extends Service {
    // 扫码
    scanCode () {
        return new Promise((resovle) => {
            return wx.scanCode({
                success: (res) => {
                    return resovle(res);
                }
            });
        });
    }
}
