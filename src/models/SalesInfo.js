import Model from './Model';
import _ from 'underscore';
export default class SalesInfo extends Model {
    computed () {
        return _.extend(super.computed(), {
            chartData () {
                let yData = this.state.salesInfo['order_statistics'];
                let result = this.service('mp.eCharts').createChart(this.state.dateType, yData, true);
                return result;
            },
            sales () {
                return this.state.salesInfo;
            }
        });
    }
    data () {
        return {
            dateType: 'day',
            salesInfo: {
                order_statistics: []
            }
        };
    }
    // 监听数据
    listeners () {
        this.addEventListener('setData', function ({dateType, salesInfo}) {
            this.$application.$vm.set(this.state, 'dateType', dateType);
            this.$application.$vm.set(this.state, 'salesInfo', salesInfo);
        });
    }
}
