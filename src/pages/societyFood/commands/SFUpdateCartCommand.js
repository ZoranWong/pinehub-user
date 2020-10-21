import Command from '@/commands/Command';
export default class SFUpdateCartCommand extends Command {
    async handle (param,that) {
        try {
            let result = await this.service('http.societyFood').updateSocietyFoodCart(param);
            let list=result.data;
            let count=0;
            let price=0;
            for (let i = 0; i <list.length ; i++) {
                let buy_num=list[i].buy_num;
                let fee=list[i].total_fee;
                count=count+parseInt(buy_num);
                price=price+fee;
            }
            if(that.status=='1'){
                that.oncePrice=price.toFixed(2);
                that.onceOrderCount=count;
            }else {
                that.reservePrice=price.toFixed(2);
                that.reserveOrderCount=count;
            }
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_UPDATE_CART';
    }
}
