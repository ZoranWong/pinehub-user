import Model from './Model'
import _ from 'underscore';
import ShoppingCartTransformer from './transformers/ShoppingCart';
export default class ShoppingCarts extends Model{
  constructor(application) {
    super(application);
    this.transformer = ShoppingCartTransformer;
  }
  computed() {
    return _.extend(super.computed(), {
      totalAmount(state){
        //  计算总价
        console.log('listStyle',state.list)
        let total = 0;
        state.list.forEach( (item) => {
            total += item.sellPrice * item.count;
        });
        return total;
      },
      list(state){
        return _.flatten(state.list);
      },
      quality(state) {
        return (id) => {
          let cart = _.findWhere(state.list, {merchandiseId: id});
          console.log(cart)
          return cart ? cart.count : 0;
        }
      },
      totalCount(state){
         let total = 0;
         state.list.forEach( (item) => {
          total  += item.count;
         })
         return total;
      }
    });
  }
  data() {
    return _.extend(super.data(), {

    });
  }
  listeners() {
    super.listeners();
    this.addEventListener('changeCart', function({id, name, sellPrice, totalAmount, merchandiseId, shopId, count}) {
      
      let cart = _.findWhere(this.state.list, {merchandiseId: merchandiseId});
      console.log(cart)
      if(!cart) {
        cart = {
          id: id,name: name, sellPrice: sellPrice, totalAmount: totalAmount, 
          merchandiseId:merchandiseId, shopId:shopId, count:count
        };
        this.state.list.push(cart);
      }else{
        if(count === 0) {
           this.state.list.remove(cart)
        }else{
          cart.count = count;
        }
      }
    });
  }
}