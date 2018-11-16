import Service from '../Service';
import _ from 'underscore';
/* eslint-disable */
export default class ApiService extends Service {
	constructor(app) {
		super(app);
		Object.defineProperty(this, 'axios', {
			get: () => {
				let http = this.services('$http');
				let fly = http.fly;
				return new fly();
			}
		});
		//网关.网址 http://api.mp.klsfood.cn
		this.gateway = this.$application.config['http']['gateway'];
		//		this.gateway = "https://api.mp.klsfood.cn/";
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
			let token = await this.services('mp.auth').getToken();
			headers['Authorization'] = 'bearer ' + token;
		}
		return headers;
	}
	// eslint-disable-next-line
	async httpGet(route, params = [], auth = true) {
		wx.showLoading({
			title: '加载中',
		})
		try {
			let request = this.request((await this.auth(auth)));
			let result = await request.get(route.trim('/') + this.services('uri').query(params));
			if(result) {
				wx.hideLoading();
			}
			return result.data;
		} catch(e) {
			throw e;
			return false;
		}
	}

	async httpPost(route, params = [], auth = true) {
		wx.showLoading({
			title: '加载中',
		})
		try {
			let request = this.request(await this.auth(auth));
			let result = await request.post(route.trim('/'), params);
			if(result) {
				wx.hideLoading();
			}
			return result.data;
		} catch(e) {
			throw e;
			return false;
		}
	}

	async httpPut(route, params = [], id = null, auth = true) {
		try {
			let request = this.request(await this.auth(auth));
			route = id ? (route.trim('/') + '/' + id) : route.trim('/');
			let result = await request.put(route, params);
			return result.data;
		} catch(e) {
			throw e;
			return false;
		}
	}

	async httpDelete(route, params = [], id = null, auth = true) {
		if(id) {
			route = route.trim('/') + '/' + id
		}
		let result = await (await this.request(await this.auth(auth))).delete(route);
		return result.data;
	}

	//组装搜索参数
	searchBuilder(searchFields) {
		let search = {};
		search = this.buildSearchStr(searchFields);
		return 'searchJson=' + this.services('base64').encode(search);
	}
	//参数处理
	buildSearchStr(searchFields) {
		return '';
	}
}