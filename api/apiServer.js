const http = require('http');
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const Service = require('./service');
const DTO = require('./plugins/DataTransferObject');
const {SERVER} = require('./config');
const {err: error} = require('./plugins/Log');

const app = express();
/**
 * 请求参数转换成json
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// 接口注入
Service(app);

// 404
app
    .get('*', function (req, res) {
        res.json(DTO.NOT_FOUND_ERR);
    });

/**
 * 捕获请求异常
 */
app.use((err, req, res, next) => {
    if (err) {
        const request = parseurl(req);
        let errMsg = `Error：[${req.method}] ${request.pathname}`;
        error.error(errMsg, err);
        res.status(500);
        res.json(DTO.TIMEOUT_ERR);
    } else {
        next();
    }
});

const server = http.createServer(app)
server.listen(SERVER.port, SERVER.host, function () {
    console.log(`应用实例，访问地址为 http://${server.address().address}:${server.address().port}`);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT. Press Control-D to exit.');

    // Stops the server from accepting new connections and finishes existing
    // connections.
    server.close(function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    })
})