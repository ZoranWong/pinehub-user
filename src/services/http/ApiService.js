import Service from '../Service';
import _ from 'underscore';
/* eslint-disable */
export default class ApiService extends Service {
	constructor(app) {
		super(app);
		Object.defineProperty(this, 'axios', {
			get: () => {
				let http = this.service('$http');
				let fly = http.fly;
				return new fly();
			}
		});
		this.gateway = this.$application.config['http']['gateway'];
		this.isLoadingPopupShow = true;
	}
	showLoading(showLoading = true) {
		this.isLoadingPopupShow = showLoading;
		return this;
	}
	request(headers) {
		let axios = this.axios;
		axios.interceptors.request.use((request) => {
			request.baseURL = this.gateway;
			_.extend(request.headers, headers);
			return request;
		});
		return axios
	}

	async auth(need) {
		let headers = {};
		if(need) {
			let token = await this.service('mp.auth').getToken();
			if(token) {
				headers['Authorization'] = 'bearer ' + token;
			}else{
				return null;
			}
		}
		return headers;
	}

	// eslint-disable-next-line
	async httpGet(route, params = [], auth = true) {
		try {
			if (this.isLoadingPopupShow) {
				wx.showLoading({ title: '加载中' });
			}
			let headerAuth = await this.auth(auth);
			if(auth && ! headerAuth) {
				throw '未登录或者登陆失效';
			}
			let request = this.request(headerAuth);
			let result = await request.get(route.trim('/') + this.service('uri').encodeURI(this.service('uri').query(params)));
			if(this.isLoadingPopupShow) {
				wx.hideLoading();
			}
			this.isLoadingPopupShow = true;
			return result.data;
		} catch(e) {
			wx.hideLoading();
			console.log('get method request error ', e);
			let message = e.response && e.response.data && e.response.data.message ? e.response.data.message : e;
			await this.service('popup').toast(message, 'warn', 2000);
			throw e;
		}
	}

	async httpPost(route, params = [], auth = true) {
		try {
			if (this.isLoadingPopupShow) {
				wx.showLoading({ title: '提交中···' });
			}
			let headerAuth = await this.auth(auth);
			if(auth && ! headerAuth) {
				throw '未登录或者登陆失效';
			}
			let request = this.request(headerAuth);
			let result = await request.post(route.trim('/'), params);
			if(this.isLoadingPopupShow) {
				wx.hideLoading();
			}
			this.isLoadingPopupShow = true;
			return result.data;
		} catch(e) {
			wx.hideLoading();
			throw e;
		}
	}

	async httpPut(route, params = [], id = null, auth = true) {
		try {
			if (this.isLoadingPopupShow) {
				wx.showLoading({ title: '提交中···' });
			}
			let headerAuth = await this.auth(auth);
			if(auth && ! headerAuth) {
				throw '未登录或者登陆失效';
			}
			let request = this.request(headerAuth);
			route = id ? (route.trim('/') + '/' + id) : route.trim('/');
			let result = await request.put(route, params);
			if(this.isLoadingPopupShow) {
				wx.hideLoading();
			}
			this.isLoadingPopupShow = true;
			return result.data;
		} catch(e) {
			wx.hideLoading();
			throw e;
		}
	}

	async httpDelete(route, params = [], id = null, auth = true) {
		try{
			if(id) {
				route = route.trim('/') + '/' + id
			}
			if (this.isLoadingPopupShow) {
				wx.showLoading({ title: '提交中···' });
			}
			let headerAuth = await this.auth(auth);
			if(auth && ! headerAuth) {
				throw '未登录或者登陆失效';
			}
			let request = this.request(headerAuth);
			let result = await request.delete(route);
			if(this.isLoadingPopupShow) {
				wx.hideLoading();
			}
			this.isLoadingPopupShow = true;
			return result.data;
		}catch (e) {
			wx.hideLoading();
			throw e;
		}
	}

	//组装搜索参数
	searchBuilder(searchFields) {
		let search = {};
		search = this.service('json').encode(searchFields);
		return 'searchJson=' + this.service('base64').encode(search);
	}
	//参数处理
	buildSearchStr(searchFields) {
		return '';
	}
}
