import Service from '../Service';
import _ from 'underscore';
/* eslint-disable */
export default class ApiService extends Service{
  constructor(app) {
    super(app);
    this.axios = this.$application.axios;
    this.gateway = '';
  }

  headers() {
    return this.$application.axios.defaults.headers;
  }
  // eslint-disable-next-line
  async httpGet (route, params = [], auth = false) {
    if(auth) {
      let token = await this.services('token').getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    let result = await this.axios.get(this.gateway + route + this.services().uri.query(params));
    return result;
  }

  async httpPost(route, params = [], auth = false) {
    if(auth) {
      let token = await this.services('token').getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    let result = await this.axios.post(this.gateway + route, params);
    return result;
  }

  async httpPut(route, id, params = [], auth = false) {
    if(auth) {
      let token = await this.services('token').getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    let result = await this.axios.put(this.gateway + route + id , params);
    return result;
  }

  async httpDelete(route, params = [], auth = false) {
    if(auth) {
      let token = await this.services('token').getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    let id = _.isString(params) || _.isNumber(params) ? params : this.services('json').encode(params);
    let result = await this.axios.delete(this.gateway + route + id);
    return null;
  }

  searchBuilder(searchFields) {
    let search = {};
    search = this.buildSearchStr(searchFields);
    return 'searchJson=' + this.services('base64').encode(search);
  }

  buildSearchStr(searchFields) {
    return '';
  }
}
