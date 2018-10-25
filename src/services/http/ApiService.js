import Service from '../Service';
import _ from 'underscore';
/* eslint-disable */
export default class ApiService extends Service {
	constructor(app) {
		super(app);
		this.axios = this.services('$http');
		//网关.网址
		this.gateway = '';
	}

	request(headers) {
		this.axios.interceptors.request.use((request) => {
			//给所有请求添加自定义header
			if(headers) {
				request.headers = headers;
			}
			return request;
		});
		return this.axios
	}
	async auth(need) {
		let headers = null;
		if(need) {
			let token = await this.services('token').getToken();
			headers = {};
			headers['Authorization'] = 'bearer ' + token;
		}
		return headers;
	}
	// eslint-disable-next-line
	async httpGet(route, params = [], auth = false) {
		let result = await (await this.request(this.auth(auth))).get(this.gateway + route + this.services().uri.query(params));
		return result;
	}

	async httpPost(route, params = [], auth = false) {
		let result = await (await this.request(this.auth(auth))).post(this.gateway + route, params);
		return result;
	}

	async httpPut(route, id, params = [], auth = false) {
		let result = await (await this.request(this.auth(auth))).put(this.gateway + route + id, params);
		return result;
	}

	async httpDelete(route, params = [], auth = false) {
		let result = await (await this.request(this.auth(auth))).delete(this.gateway + route + id);
		return null;
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