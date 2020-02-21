export default class UserInfo {
	constructor(userInfo) {
		this.avatar = userInfo['avatar'];
		this.balance = userInfo['balance'];
		this.canUseScore = userInfo['can_use_score'];
		this.city = userInfo['city'];
		this.country = userInfo['country'];
		this.id = userInfo['id'];
		this.mobile = userInfo['mobile'];
		this.nickName = userInfo['nickname'];
		this.openId = userInfo['open_id'];
		this.province = userInfo['province'];
		this.sex = userInfo['sex'];
		this.shopId = userInfo['shop_id'];
		this.ticketNum = userInfo['ticket_num'];
		this.totalScore = userInfo['total_score'];
		this.type = userInfo['type'];
		this.vipLevel = userInfo['vip_level'];
		this['superior_shop_id'] = userInfo['superior_shop_id']
	}
}
