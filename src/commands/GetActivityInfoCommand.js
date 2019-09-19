import Command from './Command';

export default class GetActivityInfoCommand extends Command {
    static handling = false;
    // 获取新活动信息
    async handle () {
        if (GetActivityInfoCommand.handling) {
            return false;
        }
        GetActivityInfoCommand.handling = true;
        let activityInfo = await this.service('http.activity').getActivityInfo();
        await this.service('mp.storage').set('activityId', activityInfo.id);
        let eventData = {
            id: activityInfo.id,
            title: activityInfo.title,
            image: activityInfo.poster_img,
            description: activityInfo.description
        };
        console.log(this);
        this.model.activity.dispatch('info', eventData);
        GetActivityInfoCommand.handling = false;
    }

    static commandName () {
        return 'GET_ACTIVITY_INFO';
    }
}
