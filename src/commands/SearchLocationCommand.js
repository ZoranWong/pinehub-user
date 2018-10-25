import Command from './Command';
export default class SearchLocationCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	async handle(address) {
		let result = await this.service('map').searchAddressToLocation(address);
		console.log('!@#$%^&*(*&^%$#@!~)',result);
	}
	static commandName() {
		return 'search-location';
	}
}
