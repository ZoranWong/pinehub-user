import Service from '../Service';
export default class EChartsService extends Service {
	constructor($application) {
		super($application);
	}

	/*获取一个月的天数 */
	getCountDays() {
		var curDate = new Date();
		/* 获取当前月份 */
		var curMonth = curDate.getMonth();
		/*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
		curDate.setMonth(curMonth + 1);
		/* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
		curDate.setDate(0);
		/* 返回当月的天数 */
		return curDate.getDate();
	}

	//绘制图表主方法
	createChart(xDate, yData, needRefresh = false) {
		console.log('进来了', xDate, yData, needRefresh);
		let xData = null;
		if(xDate == 'day') {
			xData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
		} else if(xDate == 'week') {
			xData = ['一', '二', '三', '四', '五', '六', '日'];
		} else if(xDate == 'month') {
			let monthDate = this.getCountDays();
			let month = [];
			for(let i = 0; i < monthDate; i++) {
				month[i] = i + 1;
			}
			xData = month;
			console.log('本月数组', xData);
		}
		console.log('xData', xData);
		let option = {
			refresh: needRefresh,
			xAxis: {
				type: 'category',
				data: xData,
				axisLabel: {
					show: true,
					textStyle: {
						color: '#999999'
					}
				}
			},
			yAxis: {
				type: 'value',
				axisLine: {
					show: false
				},
				axisLabel: {
					show: true,
					textStyle: {
						color: '#999999'
					}
				}
			},
			grid: {
				x: 35,
				y: 25,
				x2: 20,
				y2: 30,
				borderWidth: 1
			},
			series: [{
				data: yData,
				type: 'line',
				itemStyle: {
					normal: {
						color: '#FECE00',
						lineStyle: {
							width: 3, //折线宽度
							color: '#FECE00'
						}
					}
				},
				areaStyle: {},
				smooth: true
			}]
		}
		console.log('XxXxXx', option);
		return option
	}
}