import Command from './Command';
export default class ClearModelCommand extends Command {
    async handle (model) {
        this.store().dispatch(`${model}/reset`)
    }
    static commandName () {
        return 'CLEAR_MODEL';
    }
}
