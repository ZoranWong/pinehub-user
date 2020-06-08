import Model from './Model';
import _ from 'underscore';

export default class VirusTopic extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            indexBanners () {
                return this.state.indexBanners
            }
        });
    }

    data () {
        // let userInfo = this.service();
        return {
            indexBanners: []
        };
    }

    // 监听数据
    listeners () {
        this.addEventListener('saveIndexBanner', function ({banners}) {
            this.state.indexBanners = banners;
        })
    }
}
