import Model from './Model'
import _ from 'underscore';
import NearestStoreTransformer from './transformers/NearestStore';
export default class NearestStore extends Model {
  constructor (application) {
    super(application);
  } // 获取当日下单里的最近店铺
  computed () {
    return _.extend(super.computed(), {
      store (state) {
        return state.store;
      }
    });
  }
  data () {
    return {
      store: {
        id: null,
        name: null,
        address: null,
        mobile: null,
        lng: null,
        startAt: null,
        endAt: null
      }

    };
  }
  async cache () {
    // console.log(this.state);
    return await this.services('mp.storage').set('nearestStore', this.state.store);
  }

  async getCache () {
    return await this.services('mp.storage').get('nearestStore');
    // return {};
  }

  listeners () {
    super.listeners();
    this.addEventListener('setStore', function (store, state) {
      state.store.name = store['name'];
      state.store.id = store['id'];
      state.store.address = store['address'];
      state.store.startAt = store['start_at'];
      state.store.endAt = store['end_at'];
      state.store.lng = store['lng'];
      state.store.lat = store['lat'];
      state.store.mobile = store['mobile'];
      console.log('=========================== nearest store save =============', store);
    });
    this.cache();
  }
}
