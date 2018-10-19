export default class Store {
  constructor(application) {
    this.$application = application;
    this.modules = [];
  }
  addModel(name, model) {
    this.modules[name] = new model(this.$application);
    this.modules[name].namespaced = true;
  }
}