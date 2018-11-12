/* eslint-disable new-cap */
import Vue from 'vue'
import ServiceProviders from './providers'
import _ from 'underscore'
import App from './App'
import md5 from 'md5'
export default class Application {
  constructor (component, name = null) {
    this.name = name
    this.hashKey = md5(Date.now())
    this.applicationBootStartTime = Date.now()
    Vue.config.productionTip = false
    this.version = '1.0.1'
    this.instances = {}
    this.commands = {}
    this.serviceProviders = []
    this.config = {}
    this.exceptionHandlers = {}
    this.mixinMethods = {}
    this.mountComponent = component
    this.hasMixin = false
  }
  needMock () {
    return this.config.app.mock
  }
  // 插件
  use ($class) {
    this.$vm.use($class)
  }
  // 全局方法封装
  mixin (methods) {
    this.mixinMethods = methods
  }
  // 注册命令
  registerCommand (name, command) {
    return (this.commands[name] = new command(this))
  }

  registerModel (name, model) {
    return this.models.addModel(name, model)
  }
  command (...params) {
    let command = params.shift()
    this.commands[command].handle.apply(this.commands[command], params)
  }
  // 实例化注册对象
  instanceRegister (instance) {
    if (_.isFunction(instance)) {
      instance = new instance(this)
    }
    return instance
  }
  // 注册配置
  registerConfig (name, config) {
    this.config[name] = config
  }
  // 注册服务提供者
  registerServiceProviders () {
    let app = this
    _.each(ServiceProviders, function (value, key) {
      let serviceProvider = app.serviceProviders[key] = new value(app)
      serviceProvider.register()
    })
  }
  beforeBoot () {

  }
  boot () {
    _.each(this.serviceProviders, function (serviceProvider) {
      serviceProvider.boot()
    })
  }

  afterBoot () {
    this.applicationBootEndTime = Date.now()
  }

  registerException (name, exception) {
    this.exceptionHandlers[name] = exception
  }

  register (name, service = null) {
    let instance = null
    if (!service && _.isFunction(name)) {
      instance = this[name] = this.instances[name] = new name(this)
    } else if (name && _.isFunction(service)) {
      instance = this[name] = this.instances[name] = new service(this)
    } else {
      instance = this[name] = this.instances[name] = service
    }

    let keys = name.split('.')
    let key = keys.length - 1
    let tmp = []
    tmp[keys[key]] = instance
    while (key > 0) {
      key--
      let tmp0 = []
      tmp0[keys[key]] = tmp
      tmp = tmp0
    }
    function extend (dist, src, deep) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          let value = src[key]
          let end = !deep
          if (end) {
            dist[key] = value
            continue
          } else if (!dist[key]) {
            dist[key] = []
          }
          extend(dist[key], value, deep - 1)
        }
      }
    }
    extend(this.instances, tmp, keys.length - 1)
    extend(this, tmp, keys.length - 1)
    return instance
  }

  resetForm (form) {
    form.resetFields()
  }
  // vue全局事件绑定
  $on (event, callback) {
    this.vueApp.$on(event, callback)
  }
  $off (event) {

  }
  $emit (event, params = null) {
    this.vueApp.$emit(event, params)
  }
  $error (exception, params = null) {
    this.$emit(exception, params)
  }
  vueMixin () {
    let self = this
    let extend = {}
    extend['config'] = self.config
    extend['appName'] = this.name
    this.instances = _.extend(self.instances, extend, this.mixinMethods)
    _.extend(this.$vm.prototype, this.instances)
    _.extend(this, this.instances)
  }

  run (before = null, created = null) {
    this.$vm = Vue
    let self = this
    self.registerServiceProviders()
    this.vueMixin()
    if (before && created && _.isFunction(before) && _.isFunction(created)) {
      before(this)
    } else if (!created) {
      created = before
    }
    this.vueMixin()

    let store = this.instances['vue-store'] = this.$models(this.instances['models'])
    this.mountComponent = _.extend({
      store: store,
      render: h => h(App),
      beforeCreate: function () {
        self.vueApp = this
        self.instances['vue-store'] = this.$store
        _.each(self.exceptionHandlers, function (exception, key) {
          self.$on(key, function (message) {
            let handler = new exception(self, self.vueApp.$message)
            handler.handle(message)
            console.log('error')
          })
        })
      },
      created: () => {
        self.beforeBoot()
      },
      beforeMount: () => {
        self.boot()
      },
      mounted: () => {
        self.afterBoot()
        console.log('application boot time', self.applicationBootEndTime - self.applicationBootStartTime, 'ms')
      }
    }, this.mountComponent)
    self.vueApp = _.isFunction(created) ? created(this.mountComponent, this.$vm) : console.log(created)
    if (self.vueApp) {
      _.extend(self.vueApp, self.instances)
    }
    return self.vueApp
  }

  mount () {
    this.vueApp.$mount()
  }
}
