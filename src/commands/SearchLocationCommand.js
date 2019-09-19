import Command from './Command';
export default class SearchLocationCommand extends Command {
    async handle (address) {
        await this.service('map').searchAddressToLocation(address);
    }
    static commandName () {
        return 'SEARCH_LOCATION';
    }
}
