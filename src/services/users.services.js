const MessageFactory = require("../adapters/factory");

const messageFactory = new MessageFactory();
const messageManager = messageFactory.getMessageManager();

const users = [];

const create = async newUserInfo => {
  users.push(newUserInfo);

  await messageManager.sendMessage(newUserInfo);

  return users;
};

module.exports = {
  create,
};
