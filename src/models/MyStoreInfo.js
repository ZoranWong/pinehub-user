import Model from './Model';
import _ from 'underscore';
export default class MyStoreInfo extends Model {
  computed () {
    return _.extend(super.computed(), {
      storeInfo (state) {
        return state.storeInfo;
      },
      sellAmountECharts (state) {
        return state.sellAmountECharts;
      },
      buyNumECharts (state) {
        return state.buyNumECharts;
      }
    });
  }
  data () {
    return {
      storeInfo: [],
      sellAmountECharts: [],
      buyNumECharts: []
    };
  }
  // 监听数据
  listeners () {
    this.addEventListener('storeInfo', function ({
                                                   storeInfo,
                                                   sellAmountECharts,
                                                   buyNumECharts
                                                 }) {
      this.state.storeInfo = storeInfo;
      this.state.sellAmountECharts = sellAmountECharts;
      this.state.buyNumECharts = buyNumECharts;
    });
  }
}
