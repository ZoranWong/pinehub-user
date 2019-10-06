export default class Integral {
    constructor (products) {
        for (let k in products) {
            this[k] = products[k]
        }
        
        
        switch (this.data.type) {
            case 'CASH':
                this.data.type = '现金券';
                break;
            default :
                this.data.type = '折扣券'
        }
    }
}
