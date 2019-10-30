import Command from './Command';
export default class GetBarHeightCommand extends Command {
    async handle (height) {
        this.model.global.barHeight.dispatch('getBarHeight', {
            height
        })
    }
    static commandName () {
        return 'GET_BAR_HEIGHT';
    }
}
