export default class Service {
    constructor ($application) {
        this.$application = $application;
        // console.log($application, '_____________________$application_____________________________');
        // this.$vm = this.$application.$vm.prototype;
        this.page = null;
    }

    service (name = null) {
        return name ? this.$application[name] : this.$application.instances;
    }

    command (...params) {
        this.$application.currentPage.$command.apply(this.$application.currentPage, params);
    }
}
