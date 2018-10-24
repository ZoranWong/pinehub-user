import Mock from './Mock';
export default class StoreCategories extends Mock { //当日下单里面的商品分类 
  constructor(application) {
    super(application);
  }
  data(page = 1,limit = 15) {
    return {
      "data|10":[{
        "id|+1": 1,
        "name": this.mockMethod('cword', 2, 4),
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

  name() {
    return [
      '分类1', 
      '分类2',
      '分类3',
      '分类4',
      '分类5', 
      '分类6',
      '分类7',
      '分类8',
    ];
  }
}
