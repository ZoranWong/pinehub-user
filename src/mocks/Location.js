import Mock from './Mock';
export default class Projects extends Mock {
  constructor(application) {
    super(application);
    this.total = 12;
  }
  data(page = 1, search = null, limit = 20) {
    return {
      "data|12":[{
        "id|+1": 1,
        "name": "@NAME",
        "logo": "@image('125x125','#4A7BF7','Hello')"
      }],
      "meta": {
        "pagination":{
             "total": this.total,
             "count": 1,
             "per_page": limit,
             "current_page": page,
             "total_pages": Math.ceil(this.total / limit),
             "links":[]
         }
      }
    };
  }
}