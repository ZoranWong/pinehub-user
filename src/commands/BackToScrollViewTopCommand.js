import Command from './Command';
export default class BackToScrollViewTopCommand extends Command {
  constructor(app) {
    super(app);
  }

  handle() {
    wx.pageScrollTo({
      scrollTop: 0
    });
  }

  static commandName() {
    return 'BACK_TO_VIEW_TOP';
  }
}
