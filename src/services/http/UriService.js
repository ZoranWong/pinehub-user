import Service from '../Service';
import _ from 'underscore';
export default class UriService extends Service {
  constructor(application) {
    super(application);
  }
  query(params , key = null) {
    let queryStr = '';
    let self = this;
    _.map(params, function(value, index) {
      let k = '';
      if(key){
        k = `${key}[${index}]`;
      }else{
        k = key;
      }
      if(_.isArray(value) || _.isObject(value)) {
        queryStr += self.query(value, k);
      }else{
        queryStr += `${k}=[${value}]&`;
      }
    });
    if(typeof params === 'string') {
      queryStr = params;
    }

    return this.encodeURI(queryStr === '' ? queryStr : `?${queryStr}`);
  }
  encodeURI(value) {
    return encodeURI(value);
  }

  decodeURI(value) {
    return decodeURI(value);
  }
  
  encodeURIComponent(value) {
    return  encodeURIComponent(value);
  }
  decodeURIComponent(value) {
    return decodeURIComponent(value);
  }
}
