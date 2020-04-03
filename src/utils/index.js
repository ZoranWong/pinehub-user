
import {Base64} from './beSecret';
function formatNumber (n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const t1 = [year, month, day].map(formatNumber).join('-');
    const t2 = [hour, minute, second].map(formatNumber).join(':');
    return `${t1} ${t2}`;
}

// 日期加一天
function getFormatDate (arg) {
    if (arg === undefined || arg === '') {
        return '';
    }

    let re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}
export function addDate (date, days) {
    if (!date) {
        return '暂无'
    }
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    return newDate.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
}

// 对比时间
export function checkAuditTime (beginTime, endTime) {
    let nowDate = new Date();
    let beginDate = new Date(nowDate);
    let endDate = new Date(nowDate);

    let beginIndex = beginTime.lastIndexOf("\:");
    let beginHour = beginTime.substring(0, beginIndex);
    let beginMinue = beginTime.substring(beginIndex + 1, beginTime.length);
    beginDate.setHours(beginHour, beginMinue, 0, 0);

    let endIndex = endTime.lastIndexOf(" \: ");
    let endHour = endTime.substring(0, endIndex);
    let endMinue = endTime.substring(endIndex + 1, endTime.length);
    endDate.setHours(endHour, endMinue, 0, 0);
    if (nowDate.getTime() - beginDate.getTime() >= 0 && nowDate.getTime() <= endDate.getTime()) {
        return false;
    } else {
        return true;
    }
}

export function formatMoney (number, cent = 2, isThousand = 1) {
    number = number.toString().replace(/\$|\,/g, '');

    // 1、检查传入数值为数值类型
    if (isNaN(number)) {
        number = '0';
    }

    // 2、获取符号(正/负数)
    let sign = (number === (number = Math.abs(number)));// Math.abs(number)取出number的绝对值

    // 3、把指定的小数位先转换成整数.多余的小数位四舍五入，Math.pow(10, cent)为10的cent次方
    number = Math.floor(number * Math.pow(10, cent) + 0.5);
    // 4、求出小数位数值
    let cents = number % Math.pow(10, cent);
    // 5、求出整数位数值
    number = Math.floor(number / Math.pow(10, cent)).toString();
    // 6、把小数位转换成字符串,以便求小数位长度
    cents = cents.toString();

    // 7、补足小数位到指定的位数
    while (cents.length < cent) {
        cents = '0' + cents;
    }
    // 8、对整数部分进行千分位格式化.
    if (isThousand) {
        for (let i = 0; i < Math.floor((number.length - (1 + i)) / 3); i++) {
            number = number.substring(0, number.length - (4 * i + 3)) + ',' + number.substring(number.length - (4 * i + 3));
        }
    }
    // 9、返回格式化转换后的结果
    if (cent > 0) {
        return  '￥' + number + '.' + cents;
    } else {
        return  '￥' + number;
    }
}

export function getPrevUrl () {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    return prevPage
}

export function getTomorrowDate () {
    let tomorrow = new Date();
    tomorrow.setTime(tomorrow.getTime() + 24 * 60 * 60 * 1000);
    let tomorrowStr = tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate();
    return tomorrowStr
}

function doHandleMonth (month) {
    let m = month;
    if (month.toString().length === 1) {
        m = '0' + month;
    }
    return m;
}

export function getfutureSevenDate (day = 1) {
    let today = new Date();

    let targetDayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

    today.setTime(targetDayMilliseconds);

    let tYear = today.getFullYear();
    let tMonth = today.getMonth();
    let tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + '-' + tMonth + '-' + tDate;
}

// 保留两位小数
export function returnFloat (x) {
    var f_x = parseFloat(x);
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x
}

export function searchJson (data) {
    console.log(data, '----------data------------');
    let params = encodeURIComponent(Base64.encode(JSON.stringify(data)));
    return params
}

export default {
    formatNumber,
    formatTime
}
