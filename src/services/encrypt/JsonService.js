import Service from '../Service';
import _ from 'underscore';
export default class JsonService extends Service {
    encode (data) {
        if (_.isArray(data) || _.isObject(data)) {
            return JSON.stringify(data);
        } else {
            return null;
        }
    }

    decode (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return str;
        }
    }
}
