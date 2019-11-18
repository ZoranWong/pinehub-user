import Command from '@/commands/Command';

export default class SubmitOrderFeedBackDataCommand extends Command {
    async handle (id, feedback) {
        console.log(feedback, '00000000000000000000000000');
        if (!feedback || feedback.length < 10) {
            wx.showToast({
                title: '意见不得少于10字',
                icon: 'none'
            });
            return false;
        }
        let response = await this.service('http.orders').orderServiceFeedBack(id, feedback);
        console.log(response, '********************************');
        // this.$application.$command('REDIRECT_TO', 'user.feedBack.success', 'replace');
        // let response = await this.service('http.orders').orderFeedBack(feedback);
        //
        if (response) {
            this.$application.$command('REDIRECT_TO', 'user.feedBack.success', 'replace');
        }
    }
    static commandName () {
        return 'SUBMIT_ORDER_FEED_BACK';
    }
}
