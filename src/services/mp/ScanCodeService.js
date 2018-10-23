import Service from '../Service';
export default class scanCodeService extends Service {
	constructor($application) {
		super($application);
	}
	//扫码
	async scanCode() {
		return await wx.scanCode({
			onlyFromCamera: true,
			success: (res) => {
				console.log(res);
				return res;
			}
		})
	}

}