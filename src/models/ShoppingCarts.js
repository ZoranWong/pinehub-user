import Model from './Model'
import _ from 'underscore';
import ShoppingCartTransformer from './transformers/ShoppingCart';
export default class ShoppingCarts extends Model{
  constructor(application) {
    super(application);
    this.transformer = ShoppingCartTransformer;
  }  // 购物车内的相关数据计算 
  computed() {
    return _.extend(super.computed(), {
      totalAmount(state){
        //  计算总价
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
          //console.log(cart)
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
      //console.log('changeCart', merchandiseId);
      //console.log('add',count)

      if(!cart) {
        let newCart = {
          id: id,
          name: name, 
          sellPrice: sellPrice, 
          totalAmount: totalAmount,
          merchandiseId: merchandiseId,
          shopId: shopId, 
          count: count
        };
        this.state.list.push(newCart);
      }else{
        if(count === 0) {
           this.state.list.remove(cart)
        }else{
          cart.count = count;
        }
      }
    });

    
    //减少购物车

    this.addEventListener('reduce', function({id, name, sellPrice, totalAmount, merchandiseId, shopId, count}) {
      let cart = _.findWhere(this.state.list, {merchandiseId: merchandiseId});
      console.log("reduce",count)


      if(count > 0){
        let newCart = {
          id: id,
          name: name, 
          sellPrice: sellPrice, 
          totalAmount: totalAmount,
          merchandiseId: merchandiseId,
          shopId: shopId, 
          count: count
        };        
        this.state.list.count --
        cart.count = count;       
      }else if(count === 0){  
         let newCart = {
          id: id,
          name: name, 
          sellPrice: sellPrice, 
          totalAmount: totalAmount,
          merchandiseId: merchandiseId,
          shopId: shopId, 
          count: count
        };   
        this.state.list.splice(newCart,1)
      }else{

      }
    });

    

    //清空购物车
    this.addEventListener('reset', function({shopId}) {
      this.state.list = [];
    });

    
  }
}
