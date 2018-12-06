import Mock from './Mock';
export default class Tickets extends Mock { //优惠券
  constructor(application) {
    super(application);
  }
  data(page = 1,limit = 15) {
    return {
      "data":[{
        "id": 1,
        "card_id|+1": 12138,
        "title":"满20减2元",
        "discount": null,
        "type": "DISCOUNT",
        "least_cost": 2,
        "reduce_cost": 0.1,
        "record_count": 1,
        "begin_timestamp": "2018-10-01 19:08:53",
        "end_timestamp": "2018-10-30 19:08:53"
      },
      {
        "id": 87,
        "card_id": "123456789",
        "title": "满30减3元",
        "discount": null,
        "type": "CASH",
        "least_cost": 3,
        "reduce_cost": 0.3,
        "record_count": 1,
        "begin_timestamp": "2018-09-01 18:24:57",
        "end_timestamp": "2018-09-30 18:24:57"
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
