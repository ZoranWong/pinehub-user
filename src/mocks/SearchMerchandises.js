import Mock from './Mock';
export default class SearchMerchandises extends Mock {
  constructor(application) {
    super(application);
    this.total = 12;
  }
  data(name,page,limit = 20) {
    return {
      "data|12":[{
        "id|+1": 1,
        "name": this.mockMethod('name'),
        "main_image":'http://pic.58pic.com/58pic/14/68/45/92p58PICUba_1024.jpg', 
        "origin_price|+3": 28,
        "sell_price|+2": 20,
        "stock_num|1-5": 3,
        "sell_num|1-5": 40,
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