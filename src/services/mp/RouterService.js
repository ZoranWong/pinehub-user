import Service from '../Service';
export default class RouterService extends Service {
	constructor($application) {
		super($application);
		this.$router = $application.$vm.prototype.$router;
		this.routes = $application.config['routes']
	}
	
	push(route, options = {}) {
		let page = this.routes[route];
		options['path'] = page;
		this.$router.push(options);
	}
	
	go(n) {
		this.$router.go(n);
	}
	
	replace(route, onCompleted, onAbort, onSuccess) {
		let page = this.routes[route];
		this.$router.replace(page, onCompleted, onAbort, onSuccess);
	}
	
	back() {
		this.$router.back();
	}
}