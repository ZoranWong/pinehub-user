import ApiService from './ApiService';
export default class SocietyFoodService extends ApiService {
    // 获取首页弹窗框门店信息
    async getLastShopAddress (param) {
        let response = await this.httpGet('/api/mp/society_food/last/shop',param);
        return response;
    };
    // 获取社会餐门店列表
    async getSocietyFoodShopList (param) {
        let response = await this.httpGet('/api/mp/society_food/shop/list',param);
        return response;
    };
    // 获取门店详情
    async getSocietyFoodShopDetail (shopId) {
        let response = await this.httpGet('/api/mp/society_food/shop/'+shopId+'/detail');
        return response;
    };
    // 获取预定明日的商品列表
    async getSocietyFoodTomorrowShopList () {
        let response = await this.httpGet('/api/mp/society_food/get/order/tomorrow/products');
        return response;
    };
    // 清空购物车
    async clearSocietyFoodCart (shopId) {
        let response = await this.httpDelete('/api/mp/society_food/remove/'+shopId+'/carts');
        return response;
    };
    // 添加购物车
    async addSocietyFoodCart (param) {
        let response = await this.httpPost('/api/mp/society_food/add/carts',param);
        return response;
    };
    // 更新购物车
    async updateSocietyFoodCart (param) {
        let response = await this.httpPut('/api/mp/society_food/change/carts',param);
        return response;
    };
    // 获取购物车商品列表
    async getSocietyFoodCartShopList (shopId,param) {
        let response = await this.httpGet('/api/mp/society_food/get/'+shopId+'/carts',param);
        return response;
    };
    // 删除购物车内某商品
    async delSocietyFoodCartShop (param) {
        console.log("社会餐删除购物车商品参数"+JSON.stringify(param))
        let response = await this.httpDelete('/api/mp/society_food/del/carts',param);
        return response;
    };
    // 我的社会餐订单列表
    async getMySocietyFoodList (param) {
        let response = await this.httpGet('/api/mp/society_food/get/my/orders',param);
        return response;
    };
    // 获取订单详情
    async getOrderDetail (orderId) {
        let response = await this.httpGet('/api/mp/society_food/get/my/'+orderId+'/order/detail');
        return response;
    };
    // 提交订单
    async onSubmitOrder (param) {
        let response = await this.httpPost('/api/mp/society_food/add/order',param);
        return response;
    };
    // 删除收货地址
    async delGoodsAddress(addressId) {
        let response = await this.httpDelete('/api/mp/society_food/del/user/'+addressId+'/address');
        return response;
    };
    // 获取用户收货地址
    async getUserGoodsAddress(param) {
        let response = await this.httpGet('/api/mp/society_food/get/user/address',param);
        return response;
    };
    // 用户更新收货地址
    async updateUserAddress(addressId,param) {
        let response = await this.httpPut('/api/mp/society_food/update/user/'+addressId+'/address',param);
        return response;
    };
    // 用户新增收货地址
    async insertUserAddress(param) {
        let response = await this.httpPost('/api/mp/society_food/store/user/address',param);
        return response;
    };
    // 获取可用优惠卷
    async getCanUseCoupons(param) {
        let response = await this.httpGet('/api/mp/society_food/get/coupons',param);
        return response;
    };
    // 社会餐购物车金额计算
    async getSocietyFoodCartAmount(param) {
        let response = await this.httpGet('/api/mp/society_food/calculate',param);
        return response;
    };
}
