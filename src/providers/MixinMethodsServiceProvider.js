// 全局方法
import ServiceProvider from './ServiceProvider';
import Vuex from 'vuex';

export default class MixinMethodsServiceProvider extends ServiceProvider {
    static applications = [];

    constructor(app) {
        super(app);
        MixinMethodsServiceProvider.applications[app['hashKey']] = app;
        this.app.use(Vuex);
    }

    register() {
        let methods = (function (self) {
            return self.methods(self)
        })(this);
        this.app.mixin(methods);
    }

    methods(self) {
        return {
            $uploadFailed() {
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传失败'
                });
            },
            $models(models) {
                let store = new Vuex.Store(models);
                console.log(store, '------------------');
                return store;
            },
            $setCurrentPage() {
                self.app.currentPage = this;
            },
            async $command(...params) {
                params.push(this.$root);
                return await self.app.command.apply(self.app, params);
            },
            $error(exception, params = null) {
                self.app.$error(exception, params);
            },
            $imageUrl(name, path = 'mp_images') {
                return self.app.config.app.staticHost.trim('/') + '/' + path.trim('/') + '/' + name;
            }
        };
    }
}
