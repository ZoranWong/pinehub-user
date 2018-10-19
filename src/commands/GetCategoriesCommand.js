import Command from './Command';
export default class GetCategoriesCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(merchandiseId, count, shopId = null) {
     // 与服务器打交道，获取数据，返回数据
    

  }
  static commandName() {
    return 'GAT_CATEFORIES_TO_MEUN';
  }
}
