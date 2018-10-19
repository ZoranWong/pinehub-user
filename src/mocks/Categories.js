import Mock from './Mock';
export default class Categories extends Mock {
  constructor(application) {
    super(application);
  }
  data(page = 1, search = null, limit = 15) {
    return {
      "data|10":[{
        "id|+1": 1,
        "name": this.mockMethod('name'),
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
