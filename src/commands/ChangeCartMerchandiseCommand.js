import Command from './Command';
export default class ChangeCartMerchandiseCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(merchandiseId, count, sellPrice, name) {
     // 与服务器打交道，获取数据，返回数据
     let merchandisesInfoData = await this.service.('http.merchandises').list(merchandiseId, count, sellPrice, name);
     console.log(merchandisesInfoData,'kkkkk');
  }
  static commandName() {
    return 'CHANGE_CART_MERCHANDISE';
  }
}
