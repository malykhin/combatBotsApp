import config from './config';

export default class Controls {
  constructor() {
    this.botSettings = {
      uuid: null,
      color: null
    };

    this.controlsWs = new WebSocket(config.controlsUri);

    this.controlsWs.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.type in this.messageProcessingServices) {
        const service = this.messageProcessingServices[message.type];
        service(message);
      }
    };

    this.controlsWs.onopen = () => {};
    this.controlsWs.onerror = () => {};
    this.controlsWs.onclose = () => {};
  }

  messageProcessingServices = {
    'NO_FREE_CONTROLS': () => {
      this.botSettings.uuid = null;
      this.botSettings.color = null;
    },
    'SET_UUID': (message) => {
      this.botSettings.uuid = message.payload.uuid;
      this.botSettings.color = message.payload.color;
    }
  };

  processControlCommand = (uuid, color, command) => {
    const data = {
      uuid,
      color,
      command
    };
    this.controlsWs.send(JSON.stringify(data));
  };

  get bot () {
    return this.botSettings
  }
}
