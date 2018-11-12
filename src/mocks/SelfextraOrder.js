import Mock from './Mock';
export default class SelfextraOrder extends Mock {
  constructor(application) {
    super(application);
    this.total = 12;
  }
  data(stratTime, endTime, page = 1, limit=15) {
   	return {
      "data|10":  [
            {
                "id|+1": 1,
                "code|+1":parseInt(Math.random()*1000000),
                "status": 300,
                "receiver_name": "张三",
                "receiver_address": "合肥市蜀山区",
                "receiver_mobile": "12345678900",
                "total_amount": 12,
                "payment_amount": 12,
                "shop_end_hour": "12:00",
                "created_at": "2018-10-11 15:43:02",
                "order_item_merchandises": [
                    {
                        "name": "包子",
                        "sell_price|1-10": 2,
                        "quality|2-15": 6,
                        "total_amount|12-28": 12
                    }
                ]
            }
        ],
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
    }
  }
}

