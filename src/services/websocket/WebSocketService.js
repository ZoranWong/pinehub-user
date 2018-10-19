export default class WebSocketService extends Service {
  constructor(application) {
    super(application);
    this.gateway = null;
    this.connection = null;
    if(window.WebSocket !== undefined && this.gateway) {
      let self = this;
      this.connection = new WebSocket(this.gateway);
      this.onopen = function() {
        self.onOpen();
      }
      this.onmessage = function() {
        self.onMessage();
      }
      
      this.onclose = function() {
        self.onClose();
      }
    }
  }

  onOpen() {

  }

  onMessage() {

  }

  onClose() {

  }
}
