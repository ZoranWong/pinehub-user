import Command from './Command';
export default class GetBarHeightCommand extends Command {
    async handle (height) {
        console.log(height, '999999999999999999');
        console.log(this.model.global.barHeight, '____________________');
        this.model.global.barHeight.dispatch('getBarHeight', {
            height
        })
    }
    static commandName () {
        return 'GET_BAR_HEIGHT';
    }
}
