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
        "main_image": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537991240513&di=1ad4a1488cfc0bbdde6e1e2f3e513581&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F342ac65c10385343e1d98c339913b07eca808889.jpg'  
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