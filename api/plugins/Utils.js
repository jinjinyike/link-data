const jsmicro_is_empty = require("jsmicro-is-empty");
const DTO = require("./DataTransferObject");
const moment = require("moment");
const isEmpty = val => {
  if (typeof val === "number") {
    return false;
  } else {
    return jsmicro_is_empty.isEmpty(val);
  }
};

const isNotEmpty = val => {
  if (typeof val === "number" && !isNaN(val)) {
    return true;
  } else {
    return jsmicro_is_empty.isNotEmpty(val);
  }
};

const checkAuthority = (req, res) => {
  let user = req.session.user;
  if (isEmpty(user)) {
    res.json(DTO.FORBIDDEN_ERR);
    return true;
  }
  if (user.authority !== "admin") {
    res.json(DTO.FORBIDDEN_ERR);
    return true;
  }
  return false;
};

const formatDate = (date, formatter = "YYYY-MM-DD HH:mm:ss") => {
  return moment(date).format(formatter);
};

module.exports = {
  isEmpty,
  isNotEmpty,
  moment,
  checkAuthority,
  formatDate
};
