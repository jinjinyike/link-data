const path = require('path');
const mysqlENV = process.env.mysql
    ? JSON.parse(process.env.mysql)
    : {
        host: '47.104.202.11',
        connectionLimit: '20'
    };
/** mysql数据库配置 */
const mysql = {
    connectionLimit: mysqlENV.connectionLimit,
    host: mysqlENV.host,
    port: 3306,
    user: 'jinjin',
    password: 'jinjin1221',
    database: 'jinjinyike',
    charset: 'utf8mb4'
};

/** 日志根目录 */
const LOGS_PATH = process.env.NODE_ENV === 'dev' ? path.resolve(__dirname + '/logs/') : "/home/linkhome/logs";

/** 服务设置 */
const SERVER = {
    host: '127.0.0.1',
    port: 9000
}
module.exports = {
  mysql,
  LOGS_PATH,
  SERVER,
};