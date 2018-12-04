import Command from '@/commands/Command';
export default class SubmitFeedBackDataCommand extends Command {
    async handle (mobile, feedback) {
        console.log('FEEDBACK', mobile, feedback);
        if (mobile && !(/^1[34578]\d{9}$/.test(mobile))) {
            wx.showToast({
                title: '手机号填写不正确',
                icon: 'none'
            })
            return false;
        } else if (!feedback || feedback.length < 10) {
            wx.showToast({
                title: '意见不得少于10字',
                icon: 'none'
            })
            return false;
        }
        let response = await this.service('http.feedBack').submitFeedback(mobile, feedback);
        if (response) {
            this.$application.$command('REDIRECT_TO', 'user.feedBack.success', 'replace');
        }
    }
    static commandName () {
        return 'SUBMIT_FEED_BACK';
    }
}
