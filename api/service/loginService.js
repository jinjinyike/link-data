const { _pool_connection, _pool_connection_format, format } = require("./DB");
const { info, err } = require("../plugins/Log");
const BASE_PATH = "/api/login";
const DTO = require("../plugins/DataTransferObject");
const Utils = require("../plugins/Utils");
const moment = require("moment");
const loginService = function(app) {
  app.post(`${BASE_PATH}`, (request, response) => {
    const { mobile } = request.body;
    if(Utils.isEmpty(mobile)){
      response.json(DTO.PARAMS_ERR)
      return
    }
    let parmas=[mobile]
    let $sql=`SELECT * FROM user WHERE mobile=?`
    _pool_connection_format($sql,parmas,res=>{
      let dto=new DTO
      if(res!==false){
        if(res[0].mobile==='18222958232'){
          res[0].admin=true
        }
        res[0].status===2?response.json(dto.set(400,'此用户已注销').toJSON()):response.json(dto.set(0,'登陆成功',res[0]).toJSON())
        response.json(dto.set(0,'登陆成功',{}).toJSON())
      }else{
        response.json(dto.set(400,'不存在此用户').toJSON())
      }
    })
  });
};
module.exports = loginService;
