export default class Service {
    constructor ($application) {
        this.$application = $application;
        this.$vm = this.$application.$vm.prototype;
        this.page = null;
    }

    services (name = null) {
        return name ? this.page[name] : this.$application.instances;
    }

    $command (...params) {
        this.page.$command.apply(this.page, params);
    }
}
