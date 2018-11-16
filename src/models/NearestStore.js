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
        address: null
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
    this.addEventListener('location', function ({
                                                  id,
                                                  name,
                                                  address
                                                }, state) {
      state.store.name = name;
      state.store.id = id;
      state.store.address = address;
    });
    this.cache();
  }
}
