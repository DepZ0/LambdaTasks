"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router_js_1 = require("./router.js");
var app = express();
app.use('/api', router_js_1.default);
app.listen(3000, function () {
    console.log('Сервер запущен на порту 3000');
});
