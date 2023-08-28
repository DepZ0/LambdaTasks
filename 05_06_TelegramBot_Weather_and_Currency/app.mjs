import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import fs from 'fs';


const token = '5665210675:AAGGGJICDPpOBEyn23UPlsKYC8rIkAnd7lE';
const bot = new TelegramBot(token, {polling: true});
const weatherToken = '3e26fa60c19d67a712fb7527088abebd';
const baseUrl = 'https://api.openweathermap.org/data/2.5';
const urlPrivat = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';


// Запись курса для МоноБанка -------------------------------------------------------------------------
const MonoUSD = 'monoUsd.txt';
const MonoEUR = 'monoEur.txt';
// Проверяем наличие файла
if (!fs.existsSync(MonoUSD)) {
  // Если файл не существует, создаем его
  fs.writeFileSync(MonoUSD, '');
}

if (!fs.existsSync(MonoEUR)) {
  // Если файл не существует, создаем его
  fs.writeFileSync(MonoEUR, '');
}

// Функция для получения курса доллара из API Monobank
async function getMonoExchangeRate() {
  const url = 'https://api.monobank.ua/bank/currency';
  const response = await axios.get(url);
  const rates = response.data;
  const usdRate = rates.find(rate => rate.currencyCodeA === 840 && rate.currencyCodeB === 980);
  const textUsd = `Курс валюты USD к UAH\nПокупка: ${usdRate.rateBuy}\nПродажа: ${usdRate.rateSell}\n`;

  const eurRate = rates.find(rate => rate.currencyCodeA === 978 && rate.currencyCodeB === 980);
  const textEur = `Курс валюты EUR к UAH\nПокупка: ${eurRate.rateBuy}\nПродажа: ${eurRate.rateSell}\n`;
  // Записываем курс доллара в файл
  fs.writeFileSync(MonoUSD, textUsd);
  fs.writeFileSync(MonoEUR, textEur);
}

// Запускаем запрос каждые 70 секунд
setInterval(getMonoExchangeRate, 70000);
 // Запись курса для МоноБанка END ---------------------------------------------------------------------








bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
if (msg.text === '/start' || msg.text === 'Назад') {
    
      const keyboard = {
        reply_markup: {
          keyboard: [[{ text: 'Погода' }, { text: 'Валюты' }]],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      };
      bot.sendMessage(chatId, 'Привет, выбери действие!', keyboard)
    }



// ВАЛЮТЫ


if (msg.text === 'Валюты') {
  const keyboard = {
    reply_markup: {
      keyboard: [[{text: 'USD'}, {text: 'EUR'}, { text: 'Назад' }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };
  bot.sendMessage(chatId, 'Выбери валюту', keyboard);
}

   // USD 
      // PRIVAT
      if (msg.text === 'USD') {
        const keyboard = {
          reply_markup: {
            keyboard: [[{text: 'USD'}, {text: 'EUR'}, { text: 'Назад' }]],
            resize_keyboard: true,
            one_time_keyboard: true
          }
        };
        axios.get(urlPrivat)
        .then(response => { 
          const data = response.data[1];
          bot.sendMessage(chatId, `PrivatBank:\nКурс валюты ${data.ccy} к UAH\n Покупка: ${data.buy}\n Продажа: ${data.sale}`, keyboard)
        })
      }
      // MONO

        
      if (msg.text === 'USD') {       
        const fileContents = fs.readFileSync(MonoUSD, 'utf-8');
        bot.sendMessage(chatId, `MonoBank:\n${fileContents}`);
      }



    
    // EUR
      // PRIVAT
      if (msg.text === 'EUR') {
        const keyboard = {
          reply_markup: {
            keyboard: [[{text: 'USD'}, {text: 'EUR'}, { text: 'Назад' }]],
            resize_keyboard: true,
            one_time_keyboard: true
          }
        };
        axios.get(urlPrivat)
        .then(response => {
          const data = response.data[0];
          bot.sendMessage(chatId, `PrivatBank:\nКурс валюты ${data.ccy} к ${data.base_ccy}\n Покупка: ${data.buy}\n Продажа: ${data.sale}`, keyboard)
        })
      }
      // MONO

      if (msg.text === 'EUR') {       
        const fileContents = fs.readFileSync(MonoEUR, 'utf-8');
        bot.sendMessage(chatId, `MonoBank:\n${fileContents}`);
      }


// ВАЛЮТЫ End
    
// ПОГОДА

    if (msg.text === 'Погода') {
      const keyboard = {
        reply_markup: {
          keyboard: [[{ text: 'C интервалом 3 часа' }, { text: 'C интервалом 6 часов' }, { text: 'Назад' }]],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      };
      bot.sendMessage(chatId, 'Выберите интервал', keyboard);
    }

    // Погода 3ч
          if (msg.text === 'C интервалом 3 часа') {
            try {
              const response = await axios.get(`${baseUrl}/forecast?q=Dnipro,ua&units=metric&appid=${weatherToken}`);
              const forecast = response.data.list;
              let message = '';
              for (let i = 0; i < forecast.length; i++) {
                if (i % 3 === 0) {
                  const date = new Date(forecast[i].dt * 1000).toLocaleString();
                  const temp = forecast[i].main.temp;
                  const description = forecast[i].weather[0].description;
                  message += `Дата: ${date}\nТемпература: ${Math.floor(temp)}°C\nОписание: ${description}\n\n`;
                }
              }

                            //--back
                            const keyboard = {
                              reply_markup: {
                                keyboard: [[{ text: 'Назад' }]],
                                resize_keyboard: true,
                                one_time_keyboard: true
                              }
                            }; // --

              bot.sendMessage(chatId, message, keyboard);
            } catch (error) {
              bot.sendMessage(chatId, 'Не удалось получить данные о погоде');
            }
          }
              // Погода 3ч END

          // Погода 6ч
          if (msg.text === 'C интервалом 6 часов') {
            try {
              const response = await axios.get(`${baseUrl}/forecast?q=Dnipro,ua&units=metric&appid=${weatherToken}`);
              const forecast = response.data.list;
              let message = '';
              for (let i = 0; i < forecast.length; i++) {
                if (i % 4 === 0) {
                  const date = new Date(forecast[i].dt * 1000).toLocaleString();
                  const temp = forecast[i].main.temp;
                  const description = forecast[i].weather[0].description;
                  message += `Дата: ${date}\nТемпература: ${Math.floor(temp)}°C\nОписание: ${description}\n\n`;
                }
              }
                              //--back
                              const keyboard = {
                                reply_markup: {
                                  keyboard: [[{ text: 'Назад' }]],
                                  resize_keyboard: true,
                                  one_time_keyboard: true
                                }
                              }; // --

              bot.sendMessage(chatId, message, keyboard);
            } catch (error) {
              bot.sendMessage(chatId, 'Не удалось получить данные о погоде');
            }
          }
          // Погода 6ч END
//  Погода END



if (
  msg.text != '/start' 
  && msg.text != 'Погода' 
  && msg.text != 'Валюты' 
  && msg.text != 'Назад' 
  && msg.text != 'Выберите интервал' 
  && msg.text != 'C интервалом 3 часа' 
  && msg.text != 'C интервалом 6 часов' 
  && msg.text != 'Не удалось получить данные о погоде'
  && msg.text != 'Выбери валюту'
  && msg.text != 'USD'
  && msg.text != 'EUR'
  && msg.text != 'Ошибка при получении данных'
  && msg.text != '/AdminPanel'
  && msg.text != 'Отправить сообщение'
  ) {

  const keyboard = {
     reply_markup: {
       keyboard: [[{ text: 'Погода' }, { text: 'Валюты' }]],
       resize_keyboard: true,
       one_time_keyboard: true
     }
   };
   bot.sendMessage(chatId, 'Выбери действие!', keyboard);

}

// ------------------------


const dataPath = './log.txt';

// Проверяем, существует ли файл с данными
if (!fs.existsSync(dataPath)) {
  // Если файл не существует, создаем пустой массив и записываем его в файл
  fs.writeFileSync(dataPath, '[]');
}


const time = new Date(msg.date * 1000).toLocaleTimeString();
const senderName = `${msg.from.first_name} ${msg.from.last_name}`;
const senderId = msg.from.id;
const message = msg.text;
const logMessage = `[${time}] ${senderName} (${senderId}): ${message}\n`;

fs.appendFile('log.txt', logMessage, (err) => {
  if (err) throw err;
  // console.log(`Message logged: ${logMessage}`);
});

// ------------------------




if (msg.text === '/AdminPanel') {

      if (chatId === 453004433 || chatId === 1907735364) {
      const keyboard = {
        reply_markup: {
          keyboard: [[{ text: 'Отправить сообщение' }, { text: 'Назад' }]],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      }
      bot.sendMessage(chatId, 'Добро пожаловать!', keyboard)
    } else {
      const keyboard = {
        reply_markup: {
          keyboard: [[{ text: 'Погода' }, { text: 'Валюта' }]],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      };
      bot.sendMessage(chatId, 'Выбери действие', keyboard)
    };
};
      // if (msg.text === 'Отправить сообщение') {
          
      // if (chatId === 453004433) {
      //   const keyboard = {
      //     reply_markup: {
      //       keyboard: [[{ text: 'Отправить сообщение' }, { text: 'Назад' }]],
      //       resize_keyboard: true,
      //       one_time_keyboard: true
      //     }
      //   }
      //   bot.sendMessage(453004433, 'Добро пожаловать!', keyboard)
      
      
      
      
      // } 
      
      
      
      // else {
      //   const keyboard = {
      //     reply_markup: {
      //       keyboard: [[{ text: 'Погода' }, { text: 'Валюта' }]],
      //       resize_keyboard: true,
      //       one_time_keyboard: true
      //     }
      //   };
      //   bot.sendMessage(chatId, 'Выбери действие', keyboard)
      // };  

      // }


// ------------------------------

if (msg.text === 'Получить 100 грн') {

const stk = 'CAACAgIAAxkBAAPRZFNxP-mBZLBpxCOp12id0agdfrEAAswTAAKeeKFJtOKMlwgS4TsvBA';
   bot.sendSticker(chatId, stk);

};


});

const botCommands = [
  // Системные комманды  
    '/start', // № 1
    'Погода', // № 2
    'Валюты', // № 3
    'Назад', // № 4
  
  // Комманды чата
    // Погода
    'Выберите интервал', // № 5
    'C интервалом 3 часа', // № 6
    'C интервалом 6 часов', // № 7
    'Не удалось получить данные о погоде', // № 8
      // Валюта
    'Выбери валюту',
    'USD',
    'EUR',
  ];

  let botCommandsInfo = '';
  for (let i = 0; i < botCommands.length; i++) {
    botCommandsInfo += `    " ${botCommands[i]} "\n`
  }

  console.log(`Бот имеет ${botCommands.length} команд, а именно:\n${botCommandsInfo}`);
  