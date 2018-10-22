import ServiceProvider from './ServiceProvider';
import RouterCommand from '../commands/RouterCommand';
import ScanCommand from '../commands/ScanCommand';
// import MyOrderCommand from '../commands/MyOrderCommand';
export default class CommandServiceProvider extends ServiceProvider {
	constructor(app) {
		super(app);
		this.commands = [];
	}
	register() {
		let commands = [RouterCommand, ScanCommand];
		for(let key in commands) {
			this.app.registerCommand(commands[key].commandName(), commands[key]);
		}
	}
}
