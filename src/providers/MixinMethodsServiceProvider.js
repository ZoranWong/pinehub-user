//全局方法
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
    let methods = (function(self){ return self.methods(self)})(this);
    this.app.mixin(methods);
  }
  methods (self) {
    return {
    	$uploadFailed() {
				this.$notify.error({title: '上传失败',message: '图片上传失败'});
			},
      $models(models) {
        return new Vuex.Store(models);
      },
    	$changePage(val, filters = self.filters, fun) {
				filters.pageNum = val
				fun()
			},
      $resetForm(name) {
        self.app.resetForm(self.$refs[name]);
      },
      $command(...params) {
      	// console.log('command', self.app);
        self.app.command.apply(self.app, params);
      },
      $error(exception, params = null) {
        self.app.$error(exception, params);
      },
      $adapt() {
        let container = document.querySelectorAll('.form-container');
        if(container.length) {
          for(var i = 0; i < container.length; i++) {
            container[i].style.maxHeight = self.box.offsetHeight - 200 + 'px';
            container[i].scrollTop = 0;
          }
        }
      },
      $dialogClose() {
        if(!self.box) return;
        self.box.style.overflowY = 'auto';
        self.$emit('dialogClose');
      },
      $dialogOpen() {
        if(!self.box) {
          return;
        }
        self.box.style.overflowY = 'hidden';
        self.$emit('dialogOpen');
      },
      $scroll() {
        self.box = document.querySelector('.content-scroll');
        if(self.box) {
          self.scrollTop = self.box.scrollTop + 20 + 'px';
        }
      },
      $scrollToBottom() {
        if(this.$el.scrollTop+this.$el.offsetHeight>this.$el.scrollHeight){
          this.$emit('scroll-to-bottom');
        }
      },
      $imageUrl(name, path ='mp_images') {
      	return self.app.config.app.staticHost.trim('/') + '/' + path.trim('/') + '/' + name;
      }
    };
  }
}
