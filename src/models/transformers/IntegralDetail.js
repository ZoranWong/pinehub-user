export default class IntegralDetail {
    constructor (products) {
        for (let k in products) {
            this[k] = products[k]
        }
    
        switch (this.type) {
            case 'CASH':
                this.type = '现金券';
                break;
            default :
                this.type = '折扣券'
        }
        if (this['valid_date_info']['valid_at']) {
            this['valid_time'] = `${this['valid_date_info']['valid_at']}-${this['valid_date_info']['invalid_at']}`;
        } else {
            if (this['valid_date_info']['fixed_begin_term'] === 0) {
                this['valid_time'] = `有效期到领券当日开始${this['valid_date_info']['fixed_term']}天`
            } else {
                this['valid_time'] = `有效期到领券次日开始${this['valid_date_info']['fixed_term']}天`
            }
        }
    }
}
