import Service from '../Service';
import Qmap from '../../../static/jssdk/qqmap-wx-jssdk';
export default class DateAndTimeService extends Service {
	constructor($application) {
		super($application);
	}
	//time不传值位当前时间
	formatDate(time, type) {
		if(type == 1) {
			let date = new Date(time);

			// 有三种方式获取 第一种第二种一样的精确到微秒，第三种精确到秒
			let time1 = date.getTime(),
				time2 = date.valueOf(),
				time3 = Date.parse(date);
			return time3;
		} else {
			let date = typeof(time) == "undefined" ? new Date() : new Date(time);
			return date.format('yyyy年MM月dd日');
			//上面使用appServiceProvider方法使用格式化
			//			let year = date.getFullYear(),
			//				month = date.getMonth() + 1,
			//				day = date.getDate();
			//			month = month < 10 ? '0' + month : month;
			//			return year + '年' + month + '月' + day + '日';
		}

	}

}