const BASE_PATH = "/api/chats";
const DTO = require("../plugins/DataTransferObject");
const Utils = require('../plugins/Utils');

const ChatsService = function(app) {
  app.post(`${BASE_PATH}/test`, (request, response) => {
    let { money1, money2 } = request.body;
    if (Utils.isEmpty(money1) || Utils.isEmpty(money2)) {
      response.json(DTO.PARAMS_ERR);
      return;
    }
    response.json(new DTO(0,"添加成功",request.body).toJSON());
  });
};
module.exports = ChatsService;
