import Mock from './Mock';
export default class NearestStore extends Mock {
  constructor(application) {
    super(application);
  }
  data(lng, lat) {
    return {
      "data":[{
        "id": 1,
        "name": this.mockMethod('name'),
        "lng|1-180.1-6": 1,
        "lat|1-180.1-6": 1,
        "address": this.mockMethod('@county(true)'),
        "mobile": "13835246789"
      }],
      "meta": {
        "pagination":{
             "total": this.total,
             "count": 2,
             "per_page": limit,
             "current_page": page,
             "total_pages": Math.ceil(this.total / limit),
             "links":[]
         }
      }
    };
  }
}
