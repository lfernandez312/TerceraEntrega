const { environment } = require("../config/app.config");
const SmsAdapter = require('../adapters/sms.adapter');
const MailAdapter = require('../adapters/mail.adapter');
console.log('Entorno: '+environment);

class MessageFactory {
  constructor() {
    switch (environment.trim()) {
      case 'dev':
        console.log('Se utiliza nodemailer');
        this.messageManager = new MailAdapter();
        break;

      case 'prod':
        console.log('Se utiliza twilio');
        this.messageManager = new SmsAdapter();
        break;

      default:
        console.log('Ambiente no reconocido');
        break;
    }
  }

  getMessageManager() {
    return this.messageManager;
  }
}

module.exports = MessageFactory;