import Command from '@/commands/Command';
export default class SFShopListCommand extends Command {
    async handle (param,that) {
        try {
            let result = await this.service('http.societyFood').getSocietyFoodShopList(param);
            console.log("社会餐门店列表"+JSON.stringify(result.data));
            that.addressList=[];
            let list=result.data;
            if(list){
                that.markers=[];
                let callout={content:"", color:"#333333", fontSize:12, borderRadius:5, bgColor:"#ffffff", display:"BYCLICK", boxShadow:"2px 2px 10px #aaa", padding:8}
                for (let i = 0; i <list.length ; i++) {
                    let shop_lat=list[i].shops.shop_lat;
                    let shop_lng=list[i].shops.shop_lng;
                    let shop_name=list[i].shops.shop_name;
                    let shop_address=list[i].shops.shop_address;
                    let start=list[i].shops.business_hours_start;
                    let end=list[i].shops.business_hours_end;
                    let distance=Math.ceil(list[i].shops.distance);
                    list[i].shops.distance=distance;
                    let obj={currentTab:'0', iconPath:"", id: 0, longitude:0, latitude: 0, width: 30, height: 30};
                    obj["callout"]=callout;
                    obj["currentTab"]=(i+1).toString();
                    obj["id"]=i+1;
                    obj.iconPath=that.markerIcon;
                    obj["latitude"]=shop_lat;
                    obj["longitude"]=shop_lng;
                    obj.callout.content=shop_name+"\n营业时间"+start+"-"+end+"\n距您"+distance+"m | "+shop_address;
                    that.markers.push(obj);
                }
                that.addressList=list;
                that.markers.unshift(that.initMarks);
            }
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_SHOP_LIST';
    }
}
