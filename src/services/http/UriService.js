import Service from '../Service';
import _ from 'underscore';

export default class UriService extends Service {
    query (params, key = null) {
        let query = this.buildQuery(params, key);
        return query ? ('?' + query) : '';
    }

    buildQuery (params, key) {
        console.log(params, '+++++++');
        let queryStr = '';
        let self = this;
        console.log(_.size(params), '***********************************************8');
        _.map(params, function (value, index) {
            let k = '';
            if (key) {
                k = `${key}[${index}]`;
            } else {
                k = index;
            }
            if (_.isArray(value) || _.isObject(value)) {
                queryStr += self.buildQuery(value, k);
            } else {
                queryStr += `${k}=${value}&`;
            }
        });
        if (typeof params === 'string') {
            queryStr = params;
        }
        console.log(queryStr, '++++++++++++');
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
