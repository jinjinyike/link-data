const { _pool_connection, _pool_connection_format, format } = require("./DB");
const { info, err } = require("../plugins/Log");
const BASE_PATH = "/api/user";
const DTO = require("../plugins/DataTransferObject");
const Utils = require("../plugins/Utils");
const moment = require("moment");
const ChatsService = function(app) {
  /**
   * 添加、修改用户
   */
  app.post(`${BASE_PATH}/addUser`, (request, response) => {
    let { name, mobile, id } = request.body;
    // if (Utils.isEmpty(name) || Utils.isEmpty(mobile)) {
    //   response.json(DTO.PARAMS_ERR);
    //   return;
    // }
    // return
    if (
      typeof name != "string" ||
      name.length == 0 ||
      typeof mobile != "string" ||
      mobile.length == 0
    ) {
      response.json(DTO.PARAMS_ERR);
      return;
    }
    if (id) {
      id = parseInt(id || 0);
      if (id == 0) {
        response.json(DTO.PARAMS_ERR);
        return;
      }
    }
    let promises = [
      uniqueName(id ? { id, name } : { name }, response),
      uniqueMobile(id ? { id, mobile } : { mobile }, response)
    ];
    Promise.all(promises)
      .then(res => {
        let check = res.every(_ => _);
        if (check) {
          let params = id
            ? [name, mobile, id]
            : [name, mobile, moment().format("YYYY-MM-DD HH:mm:ss")];
          let $sql = id
            ? `UPDATE user SET name = ?, mobile= ? WHERE id = ?`
            : "INSERT INTO user (name, mobile,createtime) VALUES (?,?,?)";
          _pool_connection_format($sql, params, rs => {
            let dto = new DTO();
            if (rs.insertId > 0 || (id && rs.changedRows > 0)) {
              response.json(
                dto
                  .set(0, `${id ? "修改" : "添加"}成功`, {
                    id: rs.insertId || id
                  })
                  .toJSON()
              );
            } else {
              response.json(
                dto.set(400, `${id ? "修改" : "添加"}用户失败`).toJSON()
              );
            }
          });
        } else {
          let dto = new DTO();
          if (!res[0]) {
            dto.set(400, `${name}用户名已存在`);
          } else if (!res[1]) {
            dto.set(400, `${mobile}手机号已存在`);
          }
          response.json(dto.toJSON());
        }
      })
      .catch(err => {
        response.json(err);
        return false;
      });
  });
  /**
   * 获取用户列表
   */
  app.get(`${BASE_PATH}/getUserList`, (request, response) => {
    let params = [];
    let $sql = "SELECT id, name, mobile FROM user WHERE status = 1";
    _pool_connection_format($sql, params, res => {
      if (res !== false) {
        const dto = new DTO();
        dto.set(res);
        response.json(dto.toJSON());
      } else {
        response.json(DTO.TIMEOUT_ERR);
      }
    });
  });
  /**
   * 获取某个用户信息
   */
  app.get(`${BASE_PATH}/getUser/:id`, (request, response) => {
    let id = parseInt(request.params.id || 0);
    if (id == 0) {
      response.json(DTO.PARAMS_ERR);
      return;
    }
    let params = [id];
    let $sql = "SELECT id, name, mobile FROM user WHERE id = ?";
    _pool_connection_format($sql, params, res => {
      if (res !== false) {
        const dto = new DTO();
        dto.set(res[0]);
        response.json(dto.toJSON());
      } else {
        response.json(DTO.TIMEOUT_ERR);
      }
    });
  });
  /**
   * 注销用户
   */
  app.post(`${BASE_PATH}/del/:id`, (request, response) => {
    try {
      let id = parseInt(request.params.id || 0);
      if (id == 0) {
        response.json(DTO.PARAMS_ERR);
        return;
      }
      let dto = new DTO();
      let $sql = `UPDATE user SET status = 2 WHERE id = ${id}`;
      _pool_connection($sql, rs => {
        if (rs.changedRows > 0) {
          dto.set(0, "注销成功！", {});
        } else {
          dto.set(400, "注销失败！");
        }
        response.json(dto.toJSON());
      });
    } catch (e) {
      response.json(DTO.TIMEOUT_ERR);
    }
  });

  /**
   * 检验名称是否唯一
   */
  const uniqueName = ({ id, name }, response) => {
    return new Promise(function(resolve, reject) {
      let $sql = `SELECT COUNT(1) AS total FROM user WHERE ${
        Utils.isNotEmpty(id) ? `id != ? AND` : ``
      } name = ?`;
      let params = [name];
      Utils.isNotEmpty(id) && params.unshift(id);
      _pool_connection_format($sql, params, res => {
        if (res !== false) {
          resolve(res[0].total === 0);
        } else {
          reject(DTO.TIMEOUT_ERR);
        }
      });
    });
  };

  /**
   * 检验手机号码是否唯一
   */
  const uniqueMobile = ({ id, mobile }, response) => {
    return new Promise(function(resolve, reject) {
      let $sql = `SELECT COUNT(1) AS total FROM user WHERE ${
        Utils.isNotEmpty(id) ? `id != ? AND` : ``
      } mobile = ?`;
      let params = [mobile];
      Utils.isNotEmpty(id) && params.unshift(id);
      _pool_connection_format($sql, params, res => {
        if (res !== false) {
          resolve(res[0].total === 0);
        } else {
          reject(DTO.TIMEOUT_ERR);
        }
      });
    });
  };
};
module.exports = ChatsService;
