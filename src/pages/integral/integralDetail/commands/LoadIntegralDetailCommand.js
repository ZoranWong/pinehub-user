import Command from '../../../../commands/Command';
export default class LoadIntegralDetailCommand extends Command {
    async handle (id) {
        let response = await this.service('http.integral').integralDetail(id);
    
        this.model.integral.detail.dispatch('setDetailData', {
            detail: response
        })
    }
    static commandName () {
        return 'LOAD_INTEGRAL_DETAIL';
    }
}
