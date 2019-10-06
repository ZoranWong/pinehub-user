import Command from './Command';

export default class ShoppingCartCommand extends Command {
    // 购物车状态命令集 全部购物车操作都在此命令下
    constructor (app) {
        super(app);
        this.model = null;
    }

    

    static commandName () {
        return 'SHOPPING_CART';
    }
}
