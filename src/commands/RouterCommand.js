import Command from './Command';
export default class RouterCommand extends Command {
	handle(route, method, options = {query: {}}) {
	// handle (route, method, options) {
        console.log(options.query, '_______________options query _______________________');
        this.service('mp.router')[method](route, options['query']);
	}
	static commandName () {
		return 'REDIRECT_TO';
	}
}
