import Model from './Model'
import _ from 'underscore';
import ShoppingCartTransformer from './transformers/ShoppingCart';
export default class ShoppingCarts extends Model{
  constructor(application) {
    super(application);
    this.id = Math.random() * 1000000000;
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
        //console.log('shopping cart', state.list, this.id, this.$application.name);
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
    return _.extend(super.data(), {});
  }

  async cache(){
    //console.log(this.state);
    return await this.services('mp.storage').set('shoppingCarts', this.state);
  }
  
  async getCache() {
    return await this.services('mp.storage').get('shoppingCarts');
    //return {};
  }
  
  listeners() {
    super.listeners();
    this.addEventListener('setList' , (
      {list, currentPage, totalPage, totalNum, pageCount}/*paylaod*/) => {
        this.state.currentPage = currentPage;
        let startIndex = (currentPage - 1) * pageCount + 1;
        this.state.list[currentPage - 1] =  this.transform(list, this.transformer, startIndex);
        if(totalNum !== null)
          this.state.totalNum = totalNum;
        if(totalPage !== null) {
          this.state.totalPage = totalPage;
          if(pageCount !== null) {
            this.state.pageCount = pageCount;
          }
        }
        this.cache();

    });
    this.addEventListener('changeCart', function({id, name, sellPrice, totalAmount, merchandiseId, shopId, count,thumbImage}) {
      let cart = _.findWhere(this.state.list, {merchandiseId: merchandiseId});
      //console.log('changeCart',cart);
      //console.log('add',count)

      if(!cart) {
        let newCart = {
          id: id,
          name: name, 
          sellPrice: sellPrice, 
          totalAmount: totalAmount,
          merchandiseId: merchandiseId,
          shopId: shopId, 
          count: count,
          thumbImage:thumbImage

        };
        this.state.list.push(newCart);
      }else{
        if(count === 0) {
           this.state.list.remove(cart)
        }else{
          cart.count = count;
        }
      }     
      this.cache();
      //console.log("存储数据")
    });

    
    //减少购物车

    this.addEventListener('reduce', function({id, name, sellPrice, totalAmount, merchandiseId, shopId, count,thumbImage}) {
      let cart = _.findWhere(this.state.list, {merchandiseId: merchandiseId});


      if(count > 0){
        let newCart = {
          id: id,
          name: name, 
          sellPrice: sellPrice, 
          totalAmount: totalAmount,
          merchandiseId: merchandiseId,
          shopId: shopId, 
          count: count,
          thumbImage:thumbImage
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
          count: count,
          thumbImage:thumbImage

        };   
        this.state.list.splice(newCart,1)
      }else{

      }
      this.cache();
    });

    

    //清空购物车
    this.addEventListener('reset', function({shopId}) {
      //this.state = this.data();
      this.state.list = [ ]
      this.cache()
    });


    //获取购物车
    this.addEventListener('fillCartFromCache', async  function({shopId}) {    
      console.log('get from cache'); 
      let data = await this.getCache();
      console.log('cache data ', data); 
      data = data ? data : {};
      _.extend(this.state, data);
      this.state.shopId = shopId;
    });
  }
}
