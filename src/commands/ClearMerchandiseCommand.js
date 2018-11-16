import Command from './Command';
export default class ClearMerchandiseCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(model) {
		this.store().dispatch(`${model}/reset`)
	}
	static commandName() {
		return 'CLEAR_MERCHANDISE';
	}
}