const jsonServer = require("json-server");
const nodepath = require("path");


const DBServer = jsonServer.create();
const router = jsonServer.router(nodepath.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({ logger: false });
DBServer.use(middlewares);
DBServer.use(router);

module.exports = { DBServer }