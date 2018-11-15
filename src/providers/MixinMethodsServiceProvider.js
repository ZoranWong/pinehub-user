// 全局方法
import ServiceProvider from './ServiceProvider';
import Vuex from 'vuex';
export default class MixinMethodsServiceProvider extends ServiceProvider {
    static applications = [];
    constructor (app) {
        super(app);
        MixinMethodsServiceProvider.applications[app['hashKey']] = app;
        this.app.use(Vuex);
    }
    register () {
        let methods = (function (self) { return self.methods(self)})(this);
        this.app.mixin(methods);
    }
    methods (self) {
      return {
        $uploadFailed () {
          this.$notify.error({title: '上传失败',message: '图片上传失败'});
        },
        $models (models) {
          return new Vuex.Store(models);
        },
        $setCurrentPage () {
          self.app.vueApp = this;
        },
        $command (...params) {
//        console.log('******************** vue parent ***************', this.$parent);
          let parent = this.parent;
          let child = this;
          while (typeof parent !== 'undefined') {
            child = parent;
            parent = parent.$parent;
          }
          params.push(child);
          self.app.command.apply(self.app, params);
        },
        $error (exception, params = null) {
          self.app.$error(exception, params);
        },
        $imageUrl (name, path = 'mp_images') {
          return self.app.config.app.staticHost.trim('/') + '/' + path.trim('/') + '/' + name;
        }
      };
    }
}
