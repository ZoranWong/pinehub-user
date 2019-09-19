import Mock from './Mock';
export default class Merchandises extends Mock {
  constructor(application) {
    super(application);
    this.total = 12;
  }
  data(page = 1, search = null, limit = 20) {
    return {
      "data|12":[{
        "id|+1": 1,
        "name": this.mockMethod('cword', 3, 6),
        "sell_price|+2": 20,
        "origin_price|+3": 28,
        "sell_count|+50": 40,
        "stock_num|1-5": 3,
        "tags|1-3": [this.mockMethod('cword', 2, 4)],
        "describe":this.mockMethod('cparagraph', 1, 5),
        "main_image":'http://pic32.photophoto.cn/20140721/0042040369293749_b.jpg',
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
