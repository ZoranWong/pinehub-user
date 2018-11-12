export default class Service {
	constructor($application) {
		this.$application = $application;
		this.$vm = this.$application.$vm.prototype;
	}

	services(name = null) {
		return name ? this.$application.instances[name] : this.$application.instances;
	}
}