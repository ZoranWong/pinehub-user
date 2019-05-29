import Command from './Command';

export default class ShoppingCartCommand extends Command {
    // 购物车状态命令集 全部购物车操作都在此命令下
    constructor (app) {
        super(app);
        this.model = null;
    }

    changeShoppingCartMerchandise (merchandise) {
        this.$store.dispatch(this.model + '/changeShoppingCartMerchandise', {
            'id': merchandise['id'],
            'merchandiseId': merchandise['merchandise_id'],
            'count': merchandise['quality'],
            'name': merchandise['name'],
            'sellPrice': merchandise['sell_price'],
            'totalAmount': merchandise['amount'],
            'thumbImage': merchandise['main_image'],
            'activityId': merchandise['activity_id'],
            'batch': merchandise['batch']
        });
    }

    addMerchandiseToShoppingCart (merchandise) {
        this.$store.dispatch(this.model + '/addMerchandiseToShoppingCart', {
            'id': merchandise['id'],
            'merchandiseId': merchandise['merchandise_id'],
            'count': merchandise['quality'],
            'name': merchandise['name'],
            'sellPrice': merchandise['sell_price'],
            'totalAmount': merchandise['amount'],
            'thumbImage': merchandise['main_image'],
            'activityId': merchandise['activity_id'],
            'batch': merchandise['batch']
        });
    }

    deleteShoppingCart (id) {
        this.$store.dispatch(this.model + '/deleteMerchandiseFromShoppingCart', {
            'id': id
        })
    }

    addMerchandisesToModel (merchandises, totalNum, currentPage, totalPage, limit) {
        this.$store.dispatch(this.model + '/setList', {
            list: merchandises,
            totalNum: totalNum,
            currentPage: currentPage,
            totalPage: totalPage,
            pageCount: limit
        })
    }

    static commandName () {
        return 'SHOPPINGCART';
    }
}
