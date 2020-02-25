/* eslint-disable */
import _ from 'underscore';

export default class Model {
    constructor (application) {
        this.namespaced = true;
        this.$application = application;
        this.state = this.data();
        this.getters = this.setGetters();
        this.actions = [];
        this.mutations = [];
        this.transformer = null;
        this.listeners();
        this.alias = null;
    }

    // model层数据定义函数，对应vuex中的state
    data () {
        return {
            list: [],
            pageCount: 0,
            currentPage: 0,
            totalNum: 0,
            totalPage: 0
        };
    }

    // model层设置计算属性，对应vuex中getters
    setGetters () {
        let getters = this.computed();
        let methods = {};
        _.each(getters, (method, name) => {
            methods[name] = (state) => {
                return method.call(this, state);
            };
        });
        return methods;
    }

    list () {
        // console.log('----- list data -------', Date.now(), this.state.list);
        return this.state.currentPage ? _.flatten(this.state.list) : [];
    }


    // 返回计算属性，计算属性定义为函数形式，每一个计算属性函数接受一个model层的state，
    // 同时计算属性函数this指针指向model本身。对应vuex中getters
    computed () {
        return {
            list () {
                return this.list();
            },
            isLoadedAll () {
                return this.state.currentPage > 0 && this.state.totalPage <= this.state.currentPage;
            },
            currentPage () {
                return this.state.currentPage;
            },
            totalPage () {
                return this.state.totalPage;
            },
            limit () {
                return this.state.pageCount;
            },
            totalNum () {
                return this.state.totalNum;
            }
        };
    }

    // 加载监听
    listeners () {
        this.addEventListener('nextPage', () => {
            this.state.currentPage++;
        });
        this.addEventListener('setList', (payload, state /* paylaod */) => {
            this.setList(payload, state);
        });

        this.addEventListener('reset', (payload, state /* paylaod */) => {
            _.extend(this.state, this.data());
        });
    }

    setList ({currentPage, pageCount, totalNum, totalPage, list}, state) {
        this.state.currentPage = currentPage;
        let startIndex = (currentPage - 1) * pageCount + 1;
        try {
            list = this.transform(list, this.transformer, startIndex);
            // console.log('--------- transformer ----------', Date.now());
            this.$application.$vm.set(this.state.list, currentPage - 1, list);
        } catch (e) {
            //TODO handle the exception
            console.log(e);
        }
        this.state.totalNum = totalNum || 0;

        if (totalPage !== null) {
            this.state.totalPage = totalPage;
            if (pageCount !== null) {
                this.state.pageCount = pageCount;
            }
        }
        // console.log('--------- end ----------', Date.now());
    }

    /**
     *数据转化
     *@param array|Object data 后台数据
     *@param Transformer transformer 数据转换器
     *@param integer startIndex 起始索引
     **/
    transform (data, transformer = null, startIndex = 1) {
        console.log(data, '>>>>>>>');
        console.log(transformer);
        transformer = transformer ? transformer : this.transformer;
        if (_.isArray(data)) {
            return _.map(data, function (value, index) {
                value.index = startIndex + index;
                return new transformer(value);
            });
        } else {
            return new transformer(data);
        }
    }

    // 获取已经注册的服务实例
    service (name) {
        return this.$application.instances[name];
    }

    // 回调函数可以直接使用this指向注册model实例，回调函数接受两个参数一个payload结构体，一个model层的state
    // 对应vuex中的actions与mutations
    addEventListener (type, callback) {
        this.actions[type] = ({commit}, payload) => {
            commit(type, payload);
        };

        this.mutations[type] = (state, payload) => {
            // 回调函数可以直接使用this指向注册model实例，回调函数接受两个参数一个payload结构体，一个model层的state
            callback.call(this, payload, state);
        }
    }

    dispatch(event, data) {
        this.$application.store.dispatch(`${this.alias}/${event}`, data);
    }
}
