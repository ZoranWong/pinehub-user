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
        "name": this.mockMethod('name'),
        "sell_price|+2": 20,
        "origin_price|+3": 28,
        "sell_count|+50": 40,
        "stock_num|1-5": 3,
        "tags": ["素食", "健康", "营养", "芝士乳酪"],
        "describe":this.mockMethod('cparagraph', 1, 5),
        "main_image":'http://pic.58pic.com/58pic/14/68/45/92p58PICUba_1024.jpg',  
        "new_image":'http://pic32.photophoto.cn/20140721/0042040369293749_b.jpg',
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