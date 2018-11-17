import Command from './Command';
export default class MyInfoCommand extends Command {
  async handle (isShowLoadingPopup = true) {
    let response = await this.service('http.auth').showLoading(isShowLoadingPopup).getUserInfo();
    this.store().dispatch('model.account/setAccount', response.data);
  }
  static commandName () {
    return 'LOAD_ACCOUNT';
  }
}
