import Command from './Command';
export default class MyNearbyStoresCommand extends Command {
	constructor(app) {
		super(app);
	}
	async handle(lng, lat) {
		console.log('获取附近店铺-----------------------',lng, lat);
		let [listData, totalNum, currentPage, totalPage, pageCount] = await this.service('http.myNearbyStores').mapList(lng, lat);
		console.log('获取的数据',[listData, totalNum, currentPage, totalPage]);
		this.store().dispatch({
			type: 'model.myNearbyStores/setList',
			list: listData,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: pageCount
		});
	}
	static commandName() {
		return 'MYNEARBYSTORES';
	}
}
