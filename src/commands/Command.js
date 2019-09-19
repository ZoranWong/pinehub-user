export default class Command {
    constructor (app) {
      this.$application = app;
    }

    handle (params) {
      console.log(params);
    }
    static commandName () {
      return '';
    }

    service (name) {
      return this.$application.instances[name];
    }

    store () {
      return this.$store;
    }
}
