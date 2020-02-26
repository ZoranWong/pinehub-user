import Command from '@/commands/Command';

export default class ReceiveTicketsCommand extends Command {
    async handle (id, type) {
        let self = this;
        let response;
        wx.showModal({
            title: '温馨提示',
            content: '确认领取此优惠券？',
            async success (res) {
                if (res.confirm) {
                    response = await self.service('http.tickets').receiveTickets(id);
                    if (response.message) {
                        wx.showToast({
                            title: response.message,
                            icon: 'none',
                            duration: 2000
                        });
                        setTimeout(() => {
                            if (type === 'list') {
                                self.refresh()
                            }
                        }, 1500);
                    }
                }
            }
        });
    }

    refresh () {
        console.log('111111111111');
        this.$command('LOAD_CAN_RECEIVE_TICKETS', 1);
    }

    static commandName () {
        return 'RECEIVE_COUPON';
    }
}
