import Service from '../Service';
import _ from 'underscore';

export default class UriService extends Service {
    query (params, key = null) {
        let query = this.buildQuery(params, key);
        return query ? ('?' + query) : '';
    }

    buildQuery (params, key) {
        let queryStr = '';
        let self = this;
        _.map(params, function (value, index) {
            let k = '';
            if (key) {
                k = `${key}[${index}]`;
            } else {
                k = index;
            }
            if (_.isArray(value) || _.isObject(value)) {
                if (_.isArray(value) && value.length === 0) {
                    // queryStr += `${k}[]=&`;
                } else {
                    queryStr += self.buildQuery(value, k);
                }
            } else {
                if (_.isBoolean(value)) {
                    value = value ? 1 : 0
                }
                queryStr += `${k}=${value}&`;
            }
        });

        if (typeof params === 'string') {
            queryStr = params;
        }
        return queryStr;
    }

    encodeURI (value) {
        return encodeURI(value);
    }

    decodeURI (value) {
        return decodeURI(value);
    }

    encodeURIComponent (value) {
        return encodeURIComponent(value);
    }

    decodeURIComponent (value) {
        return decodeURIComponent(value);
    }
}
