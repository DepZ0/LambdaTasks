import * as express from 'express';
import axios, { AxiosResponse } from 'axios';
const router = express.Router();
import * as mysql from 'mysql';


// Настройки подключения к базе данных
const connectionConfig: mysql.ConnectionConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'crypto'
};

// Подключение к базе данных
const connection: mysql.Connection = mysql.createConnection(connectionConfig);

// Установка обработчиков событий подключения
connection.connect((err: mysql.MysqlError) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Подключено к базе данных');
});

// Function for link 1
 export async function coinMarketCap() {

  try {
    const response: AxiosResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': 'c923682c-b328-419e-a7a8-af708213e247',
      }
    });

    const data = response.data;

    const jsonData = JSON.stringify(data);
    const query = 'UPDATE data SET CoinMarketCap = ?';

    // Выполнение запроса с параметром
    await connection.query(query, [jsonData]);

    console.log('Данные успешно записаны в БД.');
    // Сохранение данных в базу данных

    // console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
}




// Function for link 2
export async function coinStats() {
  try {
    const response: AxiosResponse = await axios.get('https://api.coinstats.app/public/v1/coins?skip=0&limit=1000');
    const data = response.data;

    const jsonData = JSON.stringify(data);
    const query = 'UPDATE data SET CoinStats = ?';

    // Выполнение запроса с параметром
    await connection.query(query, [jsonData]);

    console.log('Данные успешно записаны в БД.');
    // Сохранение данных в базу данных

    // console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
}


// Function for link 3
export async function kuCoin() {
  try {
    const response: AxiosResponse = await axios.get('https://api.kucoin.com/api/v1/market/allTickers');
    const data = response.data;

    const jsonData = JSON.stringify(data);
    const query = 'UPDATE data SET Kucoin = ?';

    // Выполнение запроса с параметром
    await connection.query(query, [jsonData]);

    console.log('Данные успешно записаны в БД.');
    // Сохранение данных в базу данных

    // console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
}

// Function for link 4
export async function coinPaprika() {
  try {
    const response: AxiosResponse = await axios.get('https://api.coinpaprika.com/v1/ticker');
    const data = response.data;

    const jsonData = JSON.stringify(data);
    const query = 'UPDATE data SET CoinPaprika = ?';

    // Выполнение запроса с параметром
    await connection.query(query, [jsonData]);

    console.log('Данные успешно записаны в БД.');
    // Сохранение данных в базу данных

    return data
  } catch (e) {
    console.log(e);
  }
}

// Function for link 5
// =======================================================================================
import * as crypto from 'crypto';
import * as request from 'request';

const apiKey = 'mTLJTqCxBZ2Ayzsb';
const secretKey = 'azoWLdJEn677ijh3drH5RRpBDGWUUT6R';
const apiEndpoint = 'https://api.coinbase.com/v2';

// Функция для создания аутентификационных заголовков
function createAuthHeaders(method: string, path: string, body?: object): any {
  const timestamp = Math.floor(Date.now() / 1000);
  const message = `${timestamp}${method}${path}${JSON.stringify(body || {})}`;
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('hex');

  return {
    'CB-ACCESS-KEY': apiKey,
    'CB-ACCESS-SIGN': signature,
    'CB-ACCESS-TIMESTAMP': timestamp,
    'CB-ACCESS-PASSPHRASE': '', // Если вы не установили пароль, оставьте пустым
    'Content-Type': 'application/json',
  };
}

// Функция для выполнения запроса к API CoinBase
function makeRequest(method: string, path: string, body?: object): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${apiEndpoint}${path}`,
      method,
      headers: createAuthHeaders(method, path, body),
      json: body || true,
    };

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

// Получение списка криптовалют
async function getCryptocurrencies(coin): Promise<void> {
  try {
    const response = await makeRequest('GET', `/exchange-rates?currency=${coin.toUpperCase()}`);
    const data = response.data;
    // const btc = data.rates.find((crypto) => crypto.id === `${coin}`)
    console.log(data.rates.USD); // Обработка ответа
    return data.rates.USD;
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

// =======================================================================================

function runEveryFiveMinutes() {
// -
    coinMarketCap()
    coinStats()
    kuCoin()
    coinPaprika()
// -
}

setInterval(runEveryFiveMinutes, 5 * 60 * 1000); // Запускаем функцию каждые 5 минут (5 * 60 * 1000 миллисекунд)


// ========================================================================


// Route handlers
router.get('/coinmarketcap', async (req, res) => {
  const query = 'SELECT CoinMarketCap FROM data'
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      return;
    }

    res.json(results[0].CoinMarketCap);
  });
});



router.get('/coinstats', async (req, res) => {
  const query = 'SELECT CoinStats FROM data'
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      return;
    }

    res.json(results[0].CoinStats);
  });
});

router.get('/kucoin', async (req, res) => {
  const query = 'SELECT Kucoin FROM data'
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      return;
    }

    res.json(results[0].Kucoin);
  });
});

router.get('/coinpaprika', async (req, res) => {
  const query = 'SELECT CoinPaprika FROM data'
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      return;
    }

    res.json(results[0].CoinPaprika);
  });
});

router.get('/coinbase', async (req, res) => {
  res.json('Use /api/coinbase/COIN - to catch USD price of coin')
});




router.get('/:exchange/:coin', async (req, res) => {
  const coin = req.params.coin;
  const exchange = req.params.exchange;

  switch (exchange) {
    case 'coinmarketcap':
      const query_cmp = 'SELECT CoinMarketCap FROM data'
      connection.query(query_cmp, (error, results, fields) => {
        if (error) {
          console.error('Ошибка выполнения запроса:', error);
          return;
        }
      
        const coinMarketCapData = JSON.parse(results[0].CoinMarketCap);
        const coinChoose_CMP = coinMarketCapData.data.find((crypto) => crypto.symbol === coin.toUpperCase()); // В поиске по data
        console.log(coinChoose_CMP);
        res.json(coinChoose_CMP);
        
      })
      break;

    case 'coinstats':
      const query_cs = 'SELECT CoinStats FROM data'
      connection.query(query_cs, (error, results, fields) => {
        if (error) {
          console.error('Ошибка выполнения запроса:', error);
          return;
        }
        
          const coinStatsData = JSON.parse(results[0].CoinStats);
          const coinChoose_CS = coinStatsData.coins.find((crypto) => crypto.symbol === coin.toUpperCase()); // В поиске по coins
          console.log(coinChoose_CS);
          res.json(coinChoose_CS);
          
      });
      break;

    case 'kucoin':
      const query_kc = 'SELECT Kucoin FROM data'
      connection.query(query_kc, (error, results, fields) => {
        if (error) {
          console.error('Ошибка выполнения запроса:', error);
          return;
        }
        const kuCoinData = JSON.parse(results[0].Kucoin);
        const coinChoose_KC = kuCoinData.data.ticker.find((crypto) => crypto.symbol === `${coin.toUpperCase()}-USDT`); 
        console.log(coinChoose_KC);
        res.json(coinChoose_KC);
      });  

      break;

    case 'coinpaprika':
      const query_cp = 'SELECT CoinPaprika FROM data'
      connection.query(query_cp, (error, results, fields) => {
        if (error) {
          console.error('Ошибка выполнения запроса:', error);
          return;
        }
        const coinPaprikaData = JSON.parse(results[0].CoinPaprika);
        const coinChoose_CP = coinPaprikaData.find((crypto) => crypto.symbol === coin.toUpperCase()); 
        console.log(coinChoose_CP);
        res.json(coinChoose_CP);
      });
      break;

      case 'coinbase':
        const resultCB = await getCryptocurrencies(coin); 
        res.json(Number(resultCB));
        break;

    default:
      // Обработка для остальных монет на указанной бирже
  } 

});


// ====================


router.get('/:coin', async (req, res) => {

  const coin = req.params.coin;
  let cost = 0;
  // === CMC
  const query_cmp = 'SELECT CoinMarketCap FROM data'
  connection.query(query_cmp, (error, results, fields) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      return;
    }
    try {
    const coinMarketCapData = JSON.parse(results[0].CoinMarketCap);
    const coinChoose_CMP = coinMarketCapData.data.find((crypto) => crypto.symbol === coin.toUpperCase()); // В поиске по data
    cost += coinChoose_CMP.quote.USD.price;    
    } catch (err) {
      console.log(err);
    }
  });
// === CS
const query_cs = 'SELECT CoinStats FROM data'
connection.query(query_cs, (error, results, fields) => {
  if (error) {
    console.error('Ошибка выполнения запроса:', error);
    return;
  }
    try {
    const coinStatsData = JSON.parse(results[0].CoinStats);
    const coinChoose_CS = coinStatsData.coins.find((crypto) => crypto.symbol === coin.toUpperCase()); // В поиске по coins
    cost += coinChoose_CS.price;    
    } catch (err) {
      console.log(err)
    }
  });

// === KC
const query_kc = 'SELECT Kucoin FROM data'
connection.query(query_kc, (error, results, fields) => {
  if (error) {
    console.error('Ошибка выполнения запроса:', error);
    return;
  }
  try {
  const kuCoinData = JSON.parse(results[0].Kucoin);
  const coinChoose_KC = kuCoinData.data.ticker.find((crypto) => crypto.symbol === `${coin.toUpperCase()}-USDT`); 
  cost += Number(coinChoose_KC.sell);
  } catch (err) {
    console.log(err);
  }
  });

// ==========
try {
  const resultCB = await getCryptocurrencies(coin); 
  cost += Number(resultCB);
} catch (err) {
  console.log(err)
}
// ==========

// === CP
const query_cp = 'SELECT CoinPaprika FROM data'
connection.query(query_cp, (error, results, fields) => {
  if (error) {
    console.error('Ошибка выполнения запроса:', error);
    return;
  }
  try {
  const coinPaprikaData = JSON.parse(results[0].CoinPaprika);
  const coinChoose_CP = coinPaprikaData.find((crypto) => crypto.symbol === coin.toUpperCase()); 
  cost += Number(coinChoose_CP.price_usd);
  } catch (err) {
    console.log(err);
  }
  
  res.json(cost / 5)
});
  
})


router.get('/', async (req, res) => {
  res.send('You can use this GETs to get info /api/MARKET/COIN   --- Where MARKET is market --- Where COIN is coin === Or /api/COIN')
});








export default router;
