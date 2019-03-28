import md5 from 'md5';
import _ from 'underscore';
import Service from '../Service';

export default class MD5Service extends Service {
    encrypt (data) {
        if (_.isObject(data) || _.isArray(data)) {
            data = JSON.stringify(data);
        }
        return md5(data);
    }
}
