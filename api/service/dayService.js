const {
  _pool_connection,
  _pool_connection_format,
  format
} = require("./DB");
const {
  info,
  err
} = require("../plugins/Log");
const BASE_PATH = "/api/day";
const DTO = require("../plugins/DataTransferObject");
const Utils = require("../plugins/Utils");
const moment = require("moment");
const DataService = function (app) {
  /** 每日数据添加和修改 */
  app.post(`${BASE_PATH}/modify`, (request, response) => {
    let {
      day_look,
      day_gonnalook,
      day_add,
      day_order,
      day_achievement,
      im_consult,
      im_noreply,
      im_private,
      im_privatelook,
      user_id,
      id
    } = request.body;
    if (Utils.isEmpty(user_id) || Utils.isEmpty(day_look)) {
      response.json(DTO.PARAMS_ERR);
      return;
    }
    user_id = parseInt(user_id || 0);
    let params = id ?
      [
        day_look,
        day_gonnalook,
        day_add,
        day_order,
        day_achievement,
        im_consult,
        im_noreply,
        im_private,
        im_privatelook,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        id
      ] :
      [
        user_id,
        day_look,
        day_gonnalook,
        day_add,
        day_order,
        day_achievement,
        im_consult,
        im_noreply,
        im_private,
        im_privatelook,
        moment().format("YYYY-MM-DD HH:mm:ss")
      ];
    let $sql = id ?
      `UPDATE linkdata SET day_look = ?,day_gonnalook = ?,day_add = ?,day_order = ?,day_achievement = ?,im_consult = ?,im_noreply = ?,im_private = ?,im_privatelook = ?, updatetime= ? WHERE id = ?` :
      "INSERT INTO linkdata (user_id, day_look,day_gonnalook,day_add,day_order,day_achievement,im_consult,im_noreply,im_private,im_privatelook,createtime) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    _pool_connection_format($sql, params, rs => {
      let dto = new DTO();
      if (rs.insertId > 0 || (id && rs.changedRows >= 0)) {
        response.json(
          dto
          .set(0, `${id ? "修改" : "添加"}成功`, {
            id: rs.insertId || id
          })
          .toJSON()
        );
      } else {
        response.json(dto.set(400, `${id ? "修改" : "添加"}失败`).toJSON());
      }
    });
  });
  /** 个人 获取每日数据 */
  app.get(`${BASE_PATH}/getDays/:user_id`, (request, response) => {
    try {
      let user_id = parseInt(request.params.user_id || 0);
      if (user_id == 0) {
        response.json(DTO.PARAMS_ERR);
        return;
      }
      let params = [user_id];
      let $sql = `SELECT * FROM linkdata WHERE user_id= ? AND DATE_FORMAT( createtime, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' )`;
      _pool_connection_format($sql, params, res => {
        info.info(res);
        if (res !== false) {
          let obj = {
            total_add: 0,
            total_look: 0,
            total_order: 0,
            total_achievement: 0
          };
          res.forEach(ele => {
            obj.total_add += ele.day_add;
            obj.total_look += ele.day_look;
            obj.total_order += ele.day_order;
            obj.total_achievement += ele.day_achievement;
          });
          obj.target = getTarget({user_id}) || 0;
          if (obj.target == 0 || obj.total_achievement == 0) {
            obj.target_percent = 0;
          } else {
            obj.target_percent = (
              (obj.total_achievement / obj.target) *
              10000
            ).toFixed(2);
          }
          let days = res.filter(ele =>
            moment().isSame(ele.createtime, "day")
          )[0];
          obj = {
            ...obj,
            ...days
          };
          obj.createtime = moment(obj.createtime).format("YYYY-MM-DD HH:mm:ss");
          obj.updatetime = obj.updatetime ?
            moment(obj.updatetime).format("YYYY-MM-DD HH:mm:ss") :
            null;
          const dto = new DTO();
          dto.set(obj);
          response.json(dto.toJSON());
        } else {
          response.json(DTO.TIMEOUT_ERR);
        }
      });
    } catch (e) {
      response.json(DTO.TIMEOUT_ERR);
    }
  });
  /** 管理查看每天统计数据 */
  app.get(`${BASE_PATH}/totalDay`, (request, response) => {
    try {
      let $sql = `SELECT * FROM linkdata WHERE to_days(createtime) = to_days(now())`;
      _pool_connection_format($sql, [], res => {
        const dto = new DTO();
        let obj = {
          total_days_add: 0,
          total_days_look: 0,
          total_days_order: 0,
          total_days_achievement: 0,
          total_days_im_consult: 0,
          total_days_im_private: 0
        };
        if (res !== false) {
          if(res.length==0) return response.json(dto.set(obj))
          res.forEach(ele => {
            obj.total_days_add += ele.day_add;
            obj.total_days_look += ele.day_look;
            obj.total_days_order += ele.day_order;
            obj.total_days_achievement += ele.day_achievement;
            obj.total_days_im_consult += ele.im_consult;
            obj.total_days_im_private += ele.im_private;
            ele.createtime = moment(ele.createtime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            ele.updatetime = ele.updatetime ?
              moment(ele.updatetime).format("YYYY-MM-DD HH:mm:ss") :
              null;
          });
          /** 总本月目标 */
          const totalTarget = getTotalTarget();
          ele.target =
            totalTarget.some(item => ele.user_id == item.user_id).target || 0;
          obj.list = res;
          dto.set(obj);
          response.json(dto.toJSON());
        } else {
          let dto = new DTO();
          response.json(dto.toJSON(dto.set(0, "", obj)));
          // response.json(DTO.TIMEOUT_ERR);
        }
      });
    } catch (e) {
      response.json(DTO.TIMEOUT_ERR);
    }
  });
  /** 
   * 获取某人月目标
   */
  app.post(`/api/month/getTarget`, (request, response) => {
    let {
      user_id
    } = request.body;
    if (Utils.isEmpty(user_id)) {
      return response.json(DTO.PARAMS_ERR);
    }
    response.json(dto.set({
      target: getTarget((user_id), response)
    }).toJSON());
  });
  /**
   * 获取今日人员数据列表
   */
  app.get(`/api/day/list`, (request, response) => {
     getTodayList({}, response).then(todayList=>{
      // const todayList = todayList;
      console.log(todayList)
    let dto = new DTO;
    if (todayList.length) {
      const monthList = getMonthList({}, response);
      todayList.forEach(ele => {
        ele={...ele,...getTotalFild(monthList,ele.user_id)};
        ele.target= getOneTarget(getTotalTarget(),user_id);
        if (ele.target == 0 || ele.total_achievement == 0) {
          ele.target_percent = 0;
        } else {
          ele.target_percent = (
            (ele.total_achievement / ele.target) *
            10000
          ).toFixed(2);
        }
        ele.name=getOneName(getUserList(),ele.user_id)
        ele.createtime = moment(ele.createtime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      })
      response.json(dto.set(todayList))
    } else {
      /** 今日尚无人填写数据 */
      response.json(dto.set([]))
    }
  });

  })
  /** 获取个人本月累计数据 */
  const getTotalFild = (arr, user_id) => {
    let obj = {
      total_days_add: 0,
      total_days_look: 0,
      total_days_order: 0,
      total_days_achievement: 0,
      total_days_im_consult: 0,
      total_days_im_private: 0
    };
    console.log(arr)
    arr.filter(e => e.user_id == user_id).forEach(ele => {
      obj.total_days_add += ele.day_add;
      obj.total_days_look += ele.day_look;
      obj.total_days_order += ele.day_order;
      obj.total_days_achievement += ele.day_achievement;
      obj.total_days_im_consult += ele.im_consult;
      obj.total_days_im_private += ele.im_private;
    })
    return obj
  }
  /** 获取某人姓名 */
  const getOneName=(arr,user_id)=>{
    if(!arr.length) return ''
    const list=arr.filter(ele=>ele.user_id==user_id);
    return list.length?list[0].name:''
  }
  /** 获取某人目标 */
  const getOneTarget=(arr,user_id)=>{
    if(!arr.length) return 0
    const list=arr.filter(ele=>ele.user_id==user_id);
    return list.length?list[0].target:0
  }
  /** 查询当天填写人员list数据 */
  const getTodayList =  ({}, response) => {
    return new Promise(resolve=>{
      let $sql = `SELECT * from linkdata WHERE to_days(createtime) = to_days(now())`
    _pool_connection_format($sql, [], res => {
      // console.log(res)
      resolve(res ? res : [])
      // return res ? res : []
    })
    })
    
  }
  /** 查询当月填写人员list数据 */
  const getMonthList = ({}, response) => {
    let params = [moment().format('YYYY-MM')]
    let $sql = `SELECT * from linkdata WHERE month=?`
    _pool_connection_format($sql, params, res => {
      return res.length ? res : []
    })
  }
  /** 获取用户列表 */
  const getUserList = () => {
    let $sql = `SELECT * from user `
    _pool_connection_format($sql, [], res => {
      return res.length ? res: []
    })
  }
  /**
   * 本月目标编辑
   */
  app.post(`/api/target/modify`, (request, response) => {
    let {
      user_id,
      target,
      id
    } = request.body;
    if (Utils.isEmpty(user_id) || Utils.isEmpty(target)) {
      response.json(DTO.PARAMS_ERR);
      return;
    }
    let params = id ?
      [target, id, user_id] :
      [user_id, target, moment().format("YYYY-MM")];
    let $sql = id ?
      `UPDATE target SET target=? WHERE id=? AND user_id=?` :
      `INSERT INTO target (user_id, target,month) VALUES (?,?,?)`;
    _pool_connection_format($sql, params, rs => {
      if (rs.insertId > 0 || (id && rs.changedRows >= 0)) {
        response.json(
          dto
          .set(0, `${id ? "修改" : "添加"}成功`, {
            id: rs.insertId || id
          })
          .toJSON()
        );
      } else {
        response.json(dto.set(400, `${id ? "修改" : "添加"}失败`).toJSON());
      }
    });
  });
  /**
   * 获取个人本月目标
   */
  const getTarget = ({
    user_id
  }, response) => {
    let params = [user_id, moment().format("YYYY-MM")];
    let $sql = `SELECT target FROM target WHERE user_id=? AND month=?`;
    _pool_connection_format($sql, params, res => {
      return res.length ? res[0].target : 0;
    });
  };
  /**
   * 获取所有人员本月目标
   */
  const getTotalTarget = ({}, response) => {
    let params = [moment().format("YYYY-MM")];
    let $sql = `SELECT * FROM target WHERE month=?`;
    _pool_connection_format($sql, params, res => {
      console.log(res+'334')
      return res.length ? res : [];
    });
  };
};
module.exports = DataService;