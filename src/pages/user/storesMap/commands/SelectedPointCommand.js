import Command from '@/commands/Command';

export default class SelectedPointCommand extends Command {
    async handle (item) {
        this.model.user.map.dispatch('saveSelectedMapPoint', {
            point: item
        });
    }

    static commandName () {
        return 'SELECTED_POINT_COMMAND';
    }
}
