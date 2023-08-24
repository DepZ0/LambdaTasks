import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const botToken = 'TOKEN'; 
const apiUrl = ' https://9994-185-137-217-83.ngrok-free.app/api'; 

const bot = new TelegramBot(botToken, { polling: true });

const strat_message = 'Добро пожаловать! Я бот для управления криптовалютой. Введите /help для получения списка команд.';

const help_message = `Я бот для управления криптовалютой. Доступные команды:
/listRecent - получить список "хайповой" крипты
/crypto {currency_symbol} - получить подробную информацию о криптовалюте (btc/BTC, eth/ETH, .....)
/addToFavourite {currency_symbol} - добавить крипту в избранное
/listFavourite - получить список избранной крипты
/deleteFavourite {currency_symbol} - удалить крипту из избранного`;

const hypeCoins = `TOP 20 coins\n\nBitcoin - BTC || Ethereum - ETH || BNB - BNB\nLitecoin - LTC || Solana - SOL\nTrust Wallet Token - TWT\nTron - TRX || Dogecoin - DOGE\n
Cardano - ADA || Aptos - APT || Monero - XMR\nSui - SUI || Arbitrum - ARB || Avalanche - AVAX\nFantom - FTM || EOS - EOS || Metal - MTL\nAxie Infinity - AXS || Uniswap - UNI`;

// Создаем объект для хранения избранных криптовалют
const favouriteCoins = new Set();

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === '/start' || msg.text === '/back') {
    const keyboard = {
      reply_markup: {
        keyboard: [[{ text: '/help' }, { text: '/listRecent' }, { text: '/listFavourite'}]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    };
    bot.sendMessage(chatId, strat_message, keyboard)
  }

  if (msg.text === '/help') {
    const keyboard = {
      reply_markup: {
        keyboard: [[{ text: '/back'}]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    };
    bot.sendMessage(chatId, help_message, keyboard)
  }

  if (msg.text === '/listRecent') {
    const keyboard = {
      reply_markup: {
        keyboard: [[{ text: '/back'}]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    };
    bot.sendMessage(chatId, hypeCoins, keyboard);      
  }

  if (msg.text.startsWith('/crypto ')) {
    const keyboard = {
      reply_markup: {
        keyboard: [[{ text: '/back'}]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    };
    
    const coin = msg.text.substr('/crypto '.length);

    try {
      const responseMidPrice = await axios.get(`${apiUrl}/${coin}`);
      const midPrice = responseMidPrice.data;
      // == CoinMarketCap
      const responseCMC = await axios.get(`${apiUrl}/coinmarketcap/${coin}`)
      const cmcInf = responseCMC.data.quote.USD;
      // == CoinStats
      const responseCS = await axios.get(`${apiUrl}/coinstats/${coin}`)
      const csInf = responseCS.data;
      // // == KuCoin
      const responseKC = await axios.get(`${apiUrl}/kucoin/${coin}`)
      const kcInf = responseKC.data;
      // // == CoinPaprika
      const responseCP = await axios.get(`${apiUrl}/coinpaprika/${coin}`)
      const cpInf = responseCP.data;
      // // == CoinBase
      const responseCB = await axios.get(`${apiUrl}/coinbase/${coin}`)
      const cbInf = responseCB.data;
      // =========================================================================
      bot.sendMessage(chatId, `.
                *${coin.toUpperCase()}*\n
      Mid Price by 5 markets:\n  ${midPrice}\n
      CoinMarketCap:\nPrice: ${cmcInf.price}\n Percent change:\n24h : ${cmcInf.percent_change_24h}\n30d : ${cmcInf.percent_change_30d}\n60d : ${cmcInf.percent_change_60d}\n
      CoinStats:\nPrice: ${csInf.price}\n Price Change:\n1h : ${csInf.priceChange1h}\n1d : ${csInf.priceChange1d}\n1w : ${csInf.priceChange1w}\n
      KuCoin:\nPrice: ${kcInf.sell}\n Change Price :\n24h : ${kcInf.changePrice}\n
      CoinPaprika:\nPrice: ${cpInf.price_usd}\n Percent change:\n1h : ${cpInf.percent_change_1h}\n1d : ${cpInf.percent_change_24h}\n7d : ${cpInf.percent_change_7d}\n
      CoinBase:\nPrice: ${cbInf}\n
                *${responseCMC.data.name}*\n${responseCMC.data.last_updated}`,
      { parse_mode: 'Markdown' });

    } catch (error) {
      bot.sendMessage(chatId, 'Произошла ошибка при получении списка криптовалют.');
    }
  }

  if (msg.text.startsWith('/addToFavourite ')) {
    const coin = msg.text.substr('/addToFavourite '.length).toUpperCase();
    if (!favouriteCoins.has(coin)) {
      favouriteCoins.add(coin);
      bot.sendMessage(chatId, `Криптовалюта ${coin} добавлена в избранное.`);
    } else {
      bot.sendMessage(chatId, `Криптовалюта ${coin} уже присутствует в избранном.`);
    }
  }

  if (msg.text === '/listFavourite') {
    if (favouriteCoins.size > 0) {
      const favouriteList = Array.from(favouriteCoins).join('\n');
      bot.sendMessage(chatId, `Избранные криптовалюты:\n\n${favouriteList}`);
    } else {
      bot.sendMessage(chatId, 'Избранных криптовалют нет.');
    }
  }

  if (msg.text.startsWith('/deleteFavourite ')) {
    const coin = msg.text.substr('/deleteFavourite '.length).toUpperCase();
    if (favouriteCoins.has(coin)) {
      favouriteCoins.delete(coin);
      bot.sendMessage(chatId, `Криптовалюта ${coin} удалена из избранного.`);
    } else {
      bot.sendMessage(chatId, `Криптовалюта ${coin} не найдена в избранном.`);
    }
  }
});