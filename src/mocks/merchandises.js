import Mock from './Mock';
export default class Projects extends Mock {
  constructor(application) {
    super(application);
   
  }
  data(page = 1, search = null, limit = 30) {
    return {
      "data|12":[{
        "id|+1": 1,
        "name": "@NAME",
        "img": "@image('300x300','img')",
        "sell_": "@image('125x125','#FF6600','QRcode')",
        "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
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