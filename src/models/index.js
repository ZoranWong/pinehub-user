/* eslint-disable new-cap */
import _ from 'underscore';

export default class Store {
    constructor (application) {
        this.$application = application;
        this.modules = [];
    }

    addModel (name, model) {
        this.modules[name] = new model(this.$application);
        this.modules[name].namespaced = true;
    }

    addModels (models) {
        _.extend(this.modules, models);
    }
}
