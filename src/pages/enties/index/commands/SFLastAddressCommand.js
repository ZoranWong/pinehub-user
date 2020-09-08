import Command from '@/commands/Command';
export default class SFLastAddressCommand extends Command {
    async handle (param,that) {
        try {
            let result = await this.service('http.societyFood').getLastShopAddress(param);
            console.log("社会餐上次选择的门店地址"+JSON.stringify(result.data));
            let shopObj=result.data;
            if(shopObj){
                that.shopObj=shopObj;
                let type=result.meta.type;//1上次 2附近
                that.modalTitle="距离最近的门店";
                that.okText="确定";
                that.cancelText="查看更多";
                that.NearByshopName=shopObj.shop_name;
                if(type=='1'){
                    that.modalTitle="上次选择的门店"
                }
            }
            that.visible=true;
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_LAST_ADDRESS';
    }
}
