import Service from '../Service';
export default class JsonService extends Service{
  constructor(application) {
    super(application);
  }
  encode(data) {
    if(_.isArray(data) || _.isObject(data)){
      return JSON.stringify(data);
    }else{
      return null;
    }
  }
  decode(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  }
}
