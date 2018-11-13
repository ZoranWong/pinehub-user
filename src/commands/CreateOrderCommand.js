import Command from './Command';
export default class CreateOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	//merchandiseId, quality = 1, type, id
	async handle(type,typeId,name,address,mobile) {
		if(type == 1) {
			
		}
		let response = await this.service('http.merchandises').addMerchandises(merchandiseId, 1, type, id);
		//产品id
		let nowMerchandiseId = response.merchandise_id;
		//产品数量
		let nowMerchandiseQuality = response.quality;
		//无库存返回message
		let message = response.message;
		if(nowMerchandiseId) {
			this.store().dispatch('model.shoppingCarts/changeCart', {
				merchandiseId: nowMerchandiseId,
				count: nowMerchandiseQuality
			})
		} else if(message) {
			//console.log(id)
			this.service('popup').toast(message, 'none')
		}
	}
	static commandName() {
		return 'ADD_MERCHANDISE_TO_CART';
	}
}