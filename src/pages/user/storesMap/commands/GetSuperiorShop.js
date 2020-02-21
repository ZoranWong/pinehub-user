import Command from '@/commands/Command';

export default class GetSuperiorShop extends Command {
    async handle (id, type) {
        console.log(id, 'shop_suporeisasas');
        let result = await this.service('http.orders').getShopInfo(id);
        let points = [result];
        if (type === 'mall') {
            this.model.user.store.dispatch('saveCommonlyUsedPoint', {
                points: points
            });
        } else {
            this.model.user.map.dispatch('saveMapCommonlyUsedPoint', {
                points: points
            });
        }
    }

    static commandName () {
        return 'GET_SUPERIOR_SHOP';
    }
}
