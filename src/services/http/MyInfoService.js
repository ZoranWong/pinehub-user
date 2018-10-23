import Service from '../Service';
export default class MyInfoService extends Service {
	constructor($application) {
		super($application);
	}
	// 获取用户信息
	async userInfo(){
		let userInfo = null;
		let hasStore = null;
		let response = null;
		if(this.$application.needMock()){
			response = await this.services('mock.myInfo').mock();
		}else{
			response = await this.httpGet(`/user/info`, {});
		}
		userInfo = response.data;
		if(userInfo.shop_id){
			hasStore = true;
		}else{
			hasStore = false;
		}
		return [userInfo,hasStore];
	}
}