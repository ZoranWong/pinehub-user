import Service from '../Service';
import Qmap from '../../../static/jssdk/qqmap-wx-jssdk';

export default class DateAndTimeService extends Service {
    // time不传值位当前时间
    formatDate (time, type) {
        if (type === 1) {
            let date = new Date(time);
            // 有三种方式获取 第一种第二种一样的精确到微秒，第三种精确到秒
            // let time1 = date.getTime(),
            //     time2 = date.valueOf(),
            //     time3 = Date.parse(date);
            return Date.parse(date);
        } else {
            let date = typeof (time) === 'undefined' ? new Date() : new Date(time);
            return date.format('yyyy年MM月dd日');
        }
    }
}
