import Command from './Command';
export default class GetBarHeightCommand extends Command {
    async handle () {
        let that = this;
        await wx.getSystemInfo({
            success (res) {
                let isIOS = res.system.indexOf('iOS') > -1;
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
