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
    
    var re = arg + '';
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
    var nowDate = new Date();
    var beginDate = new Date(nowDate);
    var endDate = new Date(nowDate);
    
    var beginIndex = beginTime.lastIndexOf("\:");
    var beginHour = beginTime.substring(0, beginIndex);
    var beginMinue = beginTime.substring(beginIndex + 1, beginTime.length);
    beginDate.setHours(beginHour, beginMinue, 0, 0);
    
    var endIndex = endTime.lastIndexOf(" \: ");
    var endHour = endTime.substring(0, endIndex);
    var endMinue = endTime.substring(endIndex + 1, endTime.length);
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
        for (var i = 0; i < Math.floor((number.length - (1 + i)) / 3); i++) {
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

export default {
    formatNumber,
    formatTime
}
