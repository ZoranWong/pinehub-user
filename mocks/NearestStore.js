import Mock from './Mock';
export default class NearestStore extends Mock {
  constructor(application) {
    super(application);
  }
  data(lng, lat) {
    return {
      "data":{
        "id": 1,
        "name": this.mockMethod('name'),
        "lng": this.mockMethod('float', 0, 180, 6),
        "lat": this.mockMethod('float', 0, 180, 6),
        "address": this.mockMethod('county', true),
        "mobile": "13835246789"
      }
    };
  }
}
