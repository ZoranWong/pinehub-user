import Command from './Command';

export default class ScanCommand extends Command {
    constructor (app) {
        super(app);
    }

    //
    async handle () {
        try {
            let scanResult = null;
            let codeNum = null;
            let scanType = null;
            scanResult = await this.service('scan').scanCode();
            let result = await this.service('json').decode(scanResult.result);
            if (result.action === 'verification') {
                let orderId = result.orderId;
                await this.$command('ORDER_STATUS_UPDATE', 'verification', orderId);
                this.mp.router.push('myOrder');
            }
        } catch (e) {
            throw(e);
            return false;
        }
    }

    static commandName () {
        return 'scanCommand';
    }
}
