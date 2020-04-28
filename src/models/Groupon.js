import Model from './Model';
import _ from 'underscore';

export default class Activity extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            grouponList () {
                return this.state.grouponList
            }
        });
    }

    data () {
        // let userInfo = this.service();
        return {
            grouponList: []
        };
    }
    // 监听数据
    listeners () {
        let that = this;
        this.addEventListener('saveGrouponList', function ({list}) {
            _.map(list, item => {
                if (_.find(this.state.grouponList, function (listItem) {
                    return listItem.id === item.id
                })) {
                    return
                }
                that.state.grouponList.push(item)
            })
        });


    }
}
