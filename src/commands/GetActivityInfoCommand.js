import Command from './Command';
export default class GetActivityInfoCommand extends Command {
	constructor(app) {
		super(app);
	}
	//获取新活动信息  
	async handle() {
		let activityInfo = await this.service('http.activity').getActivityInfo();
		console.log('活动', activityInfo);
		await this.service('mp.storage').set('activityId', activityInfo.id);
		let eventData = {
			id: activityInfo.id,
			title: activityInfo.title,
			image: activityInfo.poster_img,
			description: activityInfo.description
		};
		this.store().dispatch('model.activity/info', eventData);
	}
	static commandName() {
		return 'GET_ACTIVITY_INFO';
	}
}
