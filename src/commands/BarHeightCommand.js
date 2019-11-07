import Command from './Command';
export default class GetBarHeightCommand extends Command {
    async handle () {
        let that = this;
        await wx.getSystemInfo({
            success (res) {
                console.log(res, '______res_____');
                let isIOS = res.system.indexOf('iOS') > -1;
                console.log(isIOS, 'isIOSisIOSisIOSisIOS');
                that.model.global.barHeight.dispatch('getBarHeight', {
                    height: res.statusBarHeight,
                    isIOS: isIOS
                })
            }
        })
    }
    static commandName () {
        return 'GET_BAR_HEIGHT';
    }
}
