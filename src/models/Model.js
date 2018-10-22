import _ from 'underscore';
export default class Model {
	constructor(application) {
		this.$application = application;
		this.state = this.data();
		this.getters = this.setGetters();
		this.actions = [];
		this.mutations = [];
		this.transformer = null;
		this.listeners();
	}

	//model层数据定义函数，对应vuex中的state
	data() {
		return {
			list: [],
			pageCount: 0,
			currentPage: 0,
			totalNum: 0,
		};
	}

	//model层设置计算属性，对应vuex中getters
	setGetters() {
		let getters = this.computed();
		let methods = {};
		_.each(getters, (method, name) => {
			methods[name] = (state) => {
				return method.call(this, state);
			};
		});
		return methods;
	}

	//返回计算属性，计算属性定义为函数形式，每一个计算属性函数接受一个model层的state，
	//同时计算属性函数this指针指向model本身。对应vuex中getters
	computed() {
		return {

		};
	}

  //加载监听
	listeners() {
		this.addEventListener('nextPage', () => {
			this.state.currentPage++;
		});

	    this.addEventListener('setList' , ({list, currentPage, totalPage, totalNum, pageCount}/*paylaod*/) => {
	        this.state.currentPage = currentPage;
	        let startIndex = (currentPage - 1) * pageCount + 1;
	        this.state.list[currentPage - 1] =  this.transform(list, this.transformer, startIndex);
	        if(totalNum !== null)
	          this.state.totalNum = totalNum;
	        if(totalPage !== null) {
	          this.state.totalPage = totalPage;
	          if(pageCount !== null) {
	            this.state.pageCount = pageCount;
	          }
	        }
	    });
  	}
	
	//获取已经注册的服务实例
	services(name) {
			return this.$application.instances[name];
		}
	
	// 回调函数可以直接使用this指向注册model实例，回调函数接受两个参数一个payload结构体，一个model层的state
	//对应vuex中的actions与mutations
  	addEventListener(type, callback) {
	    this.actions[type] = ({commit}, payload) => {
		      commit(type, payload);
			},

   		this.mutations[type] = (state, payload) => {
	      // 回调函数可以直接使用this指向注册model实例，回调函数接受两个参数一个payload结构体，一个model层的state
	      callback.call(this, payload, state);
    	}
  	}

		/**
		*数据转化
		*@param array|Object data 后台数据
		*@param Transformer transformer 数据转换器
		*@param integer startIndex 起始索引
		**/
  	transform(data, transformer, startIndex = 1) {
		if(_.isArray(data)) {
			return _.map(data, function(value, index) {
				value.index = startIndex + index;
				return new transformer(value);
			});
		} else {
			return new transformer(data);
		}
	}

}
