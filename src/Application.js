/* eslint-disable new-cap */
import Vue from 'vue';
import ServiceProviders from './providers';
import _ from 'underscore';
import App from './App';
import md5 from 'md5';
import Service from './services/Service'

export default class Application {
    static pageContainer = [];
    static globalProviderRegistered = false;
    static instanceContainer = {};
    static modelContainer = {};
    // static configContainer = {};
    static commandContainer = {};
    $store = null;

    constructor(component, name = null) {
        this.name = name;
        this.hashKey = md5(Date.now());
        Vue.config.productionTip = false;
        this.version = '1.0.1';
        this.instances = {};
        this.commands = {};
        this.serviceProviders = [];
        this.exceptionHandlers = {};
        this.mixinMethods = {};
        this.mountComponent = component;
        this.models = null;
        this.currentPage = null;
        this.route = null;
        this.currentRoute = 'index';
        this.stores = {};
        this.registeredGlobal = true;
        this.config = [];
        this.pageShowCallback = () => {};
    }

    pageShow(callback) {
        this.pageShowCallback = callback;
    }

    setComponent(component) {
        this.mountComponent = component;
        return this;
    }

    needMock = () => Application.instanceContainer.config.app.mock;

    // 插件
    use($class) {
        this.$vm.use($class);
    }

    // 全局方法封装
    mixin(methods) {
        this.mixinMethods = methods;
    }

    // 注册命令
    registerCommand = (name, command) => (Application.commandContainer[name] = command);

    get store() {
        return this.$store;
    }

    registerModel(name, model) {
        let modelInstance = Application.modelContainer[name] = new model(this);
        modelInstance.alias = name;
        let computed = modelInstance.computed();
        if(typeof this[name] === 'undefined') {
            this.register(name, {
                dispatch(event, data) {
                    modelInstance.dispatch(event, data);
                }
            });
        }
        if(this.$store) {
            this.models.addModel(name, modelInstance);
            this.$store.registerModule(name, modelInstance);
        }

        let app = this;
        for(let key in computed) {
            if(computed.hasOwnProperty(key)) {
                Object.defineProperty(this[name], key, {
                    readonly: true,
                    enumerable: true,
                    get() {
                        return app.$store.getters[name + '/' + key];
                    }
                })
            }
        }
    }

    async command(...params) {
        try {
            let command = params.shift();
            let page = params.pop();
            command = Application.commandContainer[command];
            command = new command(this);
            _.extend(command, page);
            return await command.handle.apply(command, params);
        } catch (e) {
            return false;
        }
    }

    // 实例化注册对象
    instanceRegister(instance) {
        if(_.isFunction(instance)) {
            instance = new instance(this);
        }
        return instance;
    }

    // 注册配置
    registerConfig(name, config) {
        this.register('config.' + name, config);
    }

    // 注册服务提供者
    registerServiceProviders() {
        if(!Application.globalProviderRegistered) {
            _.each(ServiceProviders, (value, key) => {
                let serviceProvider = this.serviceProviders[key] = new value(this);
                serviceProvider.register();
            });
            Application.globalProviderRegistered = true;
        }
    }

    beforeBoot() {

    }

    boot() {
        _.each(this.serviceProviders, function (serviceProvider) {
            serviceProvider.boot();
        })
    }

    registerException(name, exception) {
        this.exceptionHandlers[name] = exception;
    }

    extend(dist, src, deep) {
        for(let key in src) {
            if(src.hasOwnProperty(key)) {
                let value = src[key];
                let end = !deep;
                if(end) {
                    dist[key] = value;
                    continue;
                } else if(!dist[key]) {
                    dist[key] = [];
                }
                this.extend(dist[key], value, deep - 1);
            }
        }
    }

    register(name, service = null) {
        let instance = null;
        if(!service && _.isFunction(name)) {
            instance = this[name] = Application.instanceContainer[name] = new name(this);
        } else if(name && _.isFunction(service)) {
            instance = this[name] = Application.instanceContainer[name] = new service(this);
        } else {
            instance = this[name] = Application.instanceContainer[name] = service;
        }

        let keys = name.split('.');
        let key = keys.length - 1;
        let tmp = [];
        tmp[keys[key]] = instance;
        while(key > 0) {
            key--;
            let tmp0 = [];
            tmp0[keys[key]] = tmp;
            tmp = tmp0;
        }
        if(this.registeredGlobal) {
            this.extend(Application.instanceContainer, tmp, keys.length - 1);
        } else {
            this.extend(this.instances, tmp, keys.length - 1);
        }
        this.instances = _.extend(this.instances, Application.instanceContainer);
        _.extend(this, this.instances);
        return instance;
    }

    resetForm = form => {
        form.resetFields();
    };

    // vue全局事件绑定
    $on(event, callback) {
        this.currentPage.$on(event, callback);
    }

    $off(event) {

    }

    $emit(event, params = null) {
        this.currentPage.$emit(event, params);
    }

    $error(exception, params = null) {
        this.$emit(exception, params);
    }

    vueMixin() {
        let extend = {};
        extend['appName'] = this.name;
        this.instances = _.extend(this.instances, Application.instanceContainer);
        this.instances = _.extend(this.instances, extend, this.mixinMethods);
        _.extend(this.$vm.prototype, this.instances);
        _.extend(this, this.instances);
    }

    run(before = null, created = null) {
        try {
            this.registeredGlobal = true;
            this.instances = {};
            this.$vm = Vue;
            this.registerServiceProviders();
            this.vueMixin();
            if(!this.$store) {
                this.models.addModels(Application.modelContainer);
                this.$store = this.$models(this.models);
            }
            this.vueMixin();
            if(before) {
                this.registeredGlobal = false;
                before.call(this, this);
            }
            this.vueMixin();

            if(this.route) {
                let app = this;
                let wxRoute = this.config['routes'][this.route];
                // let store = this['stores'][this.route] = this.$models(this.models);
                this.mountComponent = _.extend({
                    store: this.$store,
                    render: h => h(App)
                }, this.mountComponent);
                let componentMounted = this.mountComponent.mounted;
                let componentCreated = this.mountComponent.created;
                let componentShow = this.mountComponent.onShow;
                let applicationCreated = function () {
                    if(this.routeAlias) {
                        app.currentPage = this;
                        app.currentRoute = this.routeAlias;
                    }
                    componentCreated && componentCreated.call(this);
                };
                let applicationMounted = function () {
                    if(this.routeAlias) {
                        app.currentPage = this;
                        app.currentRoute = this.routeAlias;
                    }
                    componentMounted && componentMounted.call(this);
                };
                this.mountComponent.created = function () {
                    applicationCreated.call(this);
                };
                this.mountComponent.mounted = function () {
                    applicationMounted.call(this);
                };
                this.mountComponent.onShow = function () {
                    app.pageShowCallback(this);
                    if(typeof componentShow !== 'undefined') componentShow.apply(this);
                };
                if(_.isFunction(created)) {
                    created.call(this, this);
                }
                this.currentPage.$mount();
                this.currentPage['wxRoute'] = wxRoute;
                this.currentPage['routeAlias'] = this.route;
                _.extend(this.currentPage, this.instances);
                _.each(this.instances, (instance) => {
                    if(instance instanceof Service) {
                        instance['page'] = this.currentPage;
                    }
                });
                Application.pageContainer[wxRoute] = (this.currentPage);
            }
            return this.currentPage;
        } catch (e) {
            console.log(e);
        }
    }

    mount() {
        this.currentPage.$mount();
    }

    changePage(route) {
        this.currentPage = Application.pageContainer[route];
    }

    // $models = instance => instance;
}
