export default class Merchandise {
    constructor (merchandise) {
        console.log(merchandise, '44444444444444444444444444444');
        this.idx = merchandise['index'];
        this.merchandiseId = typeof merchandise['merchandise_id'] !== 'undefined' ? merchandise['merchandise_id'] : null;
        this.id = merchandise['id'];
        this.name = merchandise['name'];
        this.thumbImage = typeof merchandise['main_image'] !== 'undefined' ? merchandise['main_image'] : null;
        this.sellPrice = merchandise['sell_price'].toFixed(2);
        this.originPrice = typeof merchandise['origin_price'] !== 'undefined' ? merchandise['origin_price'].toFixed(2) : null;
        this.stockNum = merchandise['product_entities'][0].stock;
        this.sellNum = merchandise['sell_num'];
        this.tags = typeof merchandise['tags'] !== 'undefined' ? merchandise['tags'] : [];
        this.describe = typeof merchandise['describe'] !== 'undefined' ? merchandise['describe'] : null;
        this.shopId = typeof merchandise['shop_id'] !== 'undefined' ? merchandise['shop_id'] : null;
        this.code = typeof merchandise['code'] !== 'undefined' ? merchandise['code'] : null;
    }
}
