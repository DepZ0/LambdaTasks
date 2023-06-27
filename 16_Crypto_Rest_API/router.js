"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinPaprika = exports.kuCoin = exports.coinStats = exports.coinMarketCap = void 0;
var express = require("express");
var axios_1 = require("axios");
var router = express.Router();
var mysql = require("mysql");
// Настройки подключения к базе данных
var connectionConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'crypto'
};
// Подключение к базе данных
var connection = mysql.createConnection(connectionConfig);
// Установка обработчиков событий подключения
connection.connect(function (err) {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }
    console.log('Подключено к базе данных');
});
// Function for link 1
function coinMarketCap() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, jsonData, query, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                            headers: {
                                'X-CMC_PRO_API_KEY': 'c923682c-b328-419e-a7a8-af708213e247',
                            }
                        })];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    jsonData = JSON.stringify(data);
                    query = 'UPDATE data SET CoinMarketCap = ?';
                    // Выполнение запроса с параметром
                    return [4 /*yield*/, connection.query(query, [jsonData])];
                case 2:
                    // Выполнение запроса с параметром
                    _a.sent();
                    console.log('Данные успешно записаны в БД.');
                    // Сохранение данных в базу данных
                    // console.log(data)
                    return [2 /*return*/, data];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.coinMarketCap = coinMarketCap;
// Function for link 2
function coinStats() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, jsonData, query, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get('https://api.coinstats.app/public/v1/coins?skip=0&limit=1000')];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    jsonData = JSON.stringify(data);
                    query = 'UPDATE data SET CoinStats = ?';
                    // Выполнение запроса с параметром
                    return [4 /*yield*/, connection.query(query, [jsonData])];
                case 2:
                    // Выполнение запроса с параметром
                    _a.sent();
                    console.log('Данные успешно записаны в БД.');
                    // Сохранение данных в базу данных
                    // console.log(data)
                    return [2 /*return*/, data];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.coinStats = coinStats;
// Function for link 3
function kuCoin() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, jsonData, query, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get('https://api.kucoin.com/api/v1/market/allTickers')];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    jsonData = JSON.stringify(data);
                    query = 'UPDATE data SET Kucoin = ?';
                    // Выполнение запроса с параметром
                    return [4 /*yield*/, connection.query(query, [jsonData])];
                case 2:
                    // Выполнение запроса с параметром
                    _a.sent();
                    console.log('Данные успешно записаны в БД.');
                    // Сохранение данных в базу данных
                    // console.log(data)
                    return [2 /*return*/, data];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.kuCoin = kuCoin;
// Function for link 4
function coinPaprika() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, jsonData, query, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get('https://api.coinpaprika.com/v1/ticker')];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    jsonData = JSON.stringify(data);
                    query = 'UPDATE data SET CoinPaprika = ?';
                    // Выполнение запроса с параметром
                    return [4 /*yield*/, connection.query(query, [jsonData])];
                case 2:
                    // Выполнение запроса с параметром
                    _a.sent();
                    console.log('Данные успешно записаны в БД.');
                    // Сохранение данных в базу данных
                    return [2 /*return*/, data];
                case 3:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.coinPaprika = coinPaprika;
// Function for link 5
// =======================================================================================
var crypto = require("crypto");
var request = require("request");
var apiKey = 'mTLJTqCxBZ2Ayzsb';
var secretKey = 'azoWLdJEn677ijh3drH5RRpBDGWUUT6R';
var apiEndpoint = 'https://api.coinbase.com/v2';
// Функция для создания аутентификационных заголовков
function createAuthHeaders(method, path, body) {
    var timestamp = Math.floor(Date.now() / 1000);
    var message = "".concat(timestamp).concat(method).concat(path).concat(JSON.stringify(body || {}));
    var signature = crypto
        .createHmac('sha256', secretKey)
        .update(message)
        .digest('hex');
    return {
        'CB-ACCESS-KEY': apiKey,
        'CB-ACCESS-SIGN': signature,
        'CB-ACCESS-TIMESTAMP': timestamp,
        'CB-ACCESS-PASSPHRASE': '',
        'Content-Type': 'application/json',
    };
}
// Функция для выполнения запроса к API CoinBase
function makeRequest(method, path, body) {
    return new Promise(function (resolve, reject) {
        var options = {
            url: "".concat(apiEndpoint).concat(path),
            method: method,
            headers: createAuthHeaders(method, path, body),
            json: body || true,
        };
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            else {
                resolve(body);
            }
        });
    });
}
// Получение списка криптовалют
function getCryptocurrencies(coin) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, makeRequest('GET', "/exchange-rates?currency=".concat(coin.toUpperCase()))];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    // const btc = data.rates.find((crypto) => crypto.id === `${coin}`)
                    console.log(data.rates.USD); // Обработка ответа
                    return [2 /*return*/, data.rates.USD];
                case 2:
                    error_1 = _a.sent();
                    console.error('Произошла ошибка:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// =======================================================================================
function runEveryFiveMinutes() {
    // -
    coinMarketCap();
    coinStats();
    kuCoin();
    coinPaprika();
    // -
}
setInterval(runEveryFiveMinutes, 5 * 60 * 1000); // Запускаем функцию каждые 5 минут (5 * 60 * 1000 миллисекунд)
// ========================================================================
// Route handlers
router.get('/coinmarketcap', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = 'SELECT CoinMarketCap FROM data';
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.error('Ошибка выполнения запроса:', error);
                return;
            }
            res.json(results[0].CoinMarketCap);
        });
        return [2 /*return*/];
    });
}); });
router.get('/coinstats', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = 'SELECT CoinStats FROM data';
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.error('Ошибка выполнения запроса:', error);
                return;
            }
            res.json(results[0].CoinStats);
        });
        return [2 /*return*/];
    });
}); });
router.get('/kucoin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = 'SELECT Kucoin FROM data';
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.error('Ошибка выполнения запроса:', error);
                return;
            }
            res.json(results[0].Kucoin);
        });
        return [2 /*return*/];
    });
}); });
router.get('/coinpaprika', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = 'SELECT CoinPaprika FROM data';
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.error('Ошибка выполнения запроса:', error);
                return;
            }
            res.json(results[0].CoinPaprika);
        });
        return [2 /*return*/];
    });
}); });
router.get('/coinbase', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json('Use /api/coinbase/COIN - to catch USD price of coin');
        return [2 /*return*/];
    });
}); });
router.get('/:exchange/:coin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var coin, exchange, _a, query_cmp, query_cs, query_kc, query_cp, resultCB;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                coin = req.params.coin;
                exchange = req.params.exchange;
                _a = exchange;
                switch (_a) {
                    case 'coinmarketcap': return [3 /*break*/, 1];
                    case 'coinstats': return [3 /*break*/, 2];
                    case 'kucoin': return [3 /*break*/, 3];
                    case 'coinpaprika': return [3 /*break*/, 4];
                    case 'coinbase': return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 1:
                query_cmp = 'SELECT CoinMarketCap FROM data';
                connection.query(query_cmp, function (error, results, fields) {
                    if (error) {
                        console.error('Ошибка выполнения запроса:', error);
                        return;
                    }
                    var coinMarketCapData = JSON.parse(results[0].CoinMarketCap);
                    var coinChoose_CMP = coinMarketCapData.data.find(function (crypto) { return crypto.symbol === coin.toUpperCase(); }); // В поиске по data
                    console.log(coinChoose_CMP);
                    res.json(coinChoose_CMP);
                });
                return [3 /*break*/, 7];
            case 2:
                query_cs = 'SELECT CoinStats FROM data';
                connection.query(query_cs, function (error, results, fields) {
                    if (error) {
                        console.error('Ошибка выполнения запроса:', error);
                        return;
                    }
                    var coinStatsData = JSON.parse(results[0].CoinStats);
                    var coinChoose_CS = coinStatsData.coins.find(function (crypto) { return crypto.symbol === coin.toUpperCase(); }); // В поиске по coins
                    console.log(coinChoose_CS);
                    res.json(coinChoose_CS);
                });
                return [3 /*break*/, 7];
            case 3:
                query_kc = 'SELECT Kucoin FROM data';
                connection.query(query_kc, function (error, results, fields) {
                    if (error) {
                        console.error('Ошибка выполнения запроса:', error);
                        return;
                    }
                    var kuCoinData = JSON.parse(results[0].Kucoin);
                    var coinChoose_KC = kuCoinData.data.ticker.find(function (crypto) { return crypto.symbol === "".concat(coin.toUpperCase(), "-USDT"); });
                    console.log(coinChoose_KC);
                    res.json(coinChoose_KC);
                });
                return [3 /*break*/, 7];
            case 4:
                query_cp = 'SELECT CoinPaprika FROM data';
                connection.query(query_cp, function (error, results, fields) {
                    if (error) {
                        console.error('Ошибка выполнения запроса:', error);
                        return;
                    }
                    var coinPaprikaData = JSON.parse(results[0].CoinPaprika);
                    var coinChoose_CP = coinPaprikaData.find(function (crypto) { return crypto.symbol === coin.toUpperCase(); });
                    console.log(coinChoose_CP);
                    res.json(coinChoose_CP);
                });
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, getCryptocurrencies(coin)];
            case 6:
                resultCB = _b.sent();
                res.json(Number(resultCB));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// ====================
router.get('/:coin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var coin, cost, query_cmp, query_cs, query_kc, resultCB, err_1, query_cp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coin = req.params.coin;
                cost = 0;
                query_cmp = 'SELECT CoinMarketCap FROM data';
                connection.query(query_cmp, function (error, results, fields) {
                    if (error) {
                        console.error('Ошибка выполнения запроса:', error);
                        return;
                    }
                    try {
                        var coinMarketCapData = JSON.parse(results[0].CoinMarketCap);
                        var coinChoose_CMP = coinMarketCapData.data.find(function (crypto) { return crypto.symbol === coin.toUpperCase(); }); // В поиске по data
                        cost += coinChoose_CMP.quote.USD.price;
                    }
                    catch (err) {
                        console.log(err);
                    }
                });
                query_cs = 'SELECT CoinStats FROM data';
                connection.query(query_cs, function (error, results, fields) {
                    if (error) {
                        console.error('Ошибка выполнения запроса:', error);
                        return;
                    }
                    try {
                        var coinStatsData = JSON.parse(results[0].CoinStats);
                        var coinChoose_CS = coinStatsData.coins.find(function (crypto) { return crypto.symbol === coin.toUpperCase(); }); // В поиске по coins
                        cost += coinChoose_CS.price;
                    }
                    catch (err) {
                        console.log(err);
                    }
                });
                query_kc = 'SELECT Kucoin FROM data';
                connection.query(query_kc, function (error, results, fields) {
                    if (error) {
                        console.error('Ошибка выполнения запроса:', error);
                        return;
                    }
                    try {
                        var kuCoinData = JSON.parse(results[0].Kucoin);
                        var coinChoose_KC = kuCoinData.data.ticker.find(function (crypto) { return crypto.symbol === "".concat(coin.toUpperCase(), "-USDT"); });
                        cost += Number(coinChoose_KC.sell);
                    }
                    catch (err) {
                        console.log(err);
                    }
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getCryptocurrencies(coin)];
            case 2:
                resultCB = _a.sent();
                cost += Number(resultCB);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4:
                query_cp = 'SELECT CoinPaprika FROM data';
                connection.query(query_cp, function (error, results, fields) {
                    if (error) {
                        console.error('Ошибка выполнения запроса:', error);
                        return;
                    }
                    try {
                        var coinPaprikaData = JSON.parse(results[0].CoinPaprika);
                        var coinChoose_CP = coinPaprikaData.find(function (crypto) { return crypto.symbol === coin.toUpperCase(); });
                        cost += Number(coinChoose_CP.price_usd);
                    }
                    catch (err) {
                        console.log(err);
                    }
                    res.json(cost / 5);
                });
                return [2 /*return*/];
        }
    });
}); });
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send('You can use this GETs to get info /api/MARKET/COIN   --- Where MARKET is market --- Where COIN is coin === Or /api/COIN');
        return [2 /*return*/];
    });
}); });
exports.default = router;
