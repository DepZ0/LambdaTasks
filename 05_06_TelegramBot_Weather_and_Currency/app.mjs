import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const token = '5665210675:AAGGGJICDPpOBEyn23UPlsKYC8rIkAnd7lE';
const bot = new TelegramBot(token, {polling: true});
const weatherToken = '3e26fa60c19d67a712fb7527088abebd';
const baseUrl = 'https://api.openweathermap.org/data/2.5';
const urlPrivat = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
const urlMono = 'https://api.monobank.ua/bank/currency'



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
          bot.sendMessage(chatId, `PrivatBank:\nКурс валюты ${data.ccy} к ${data.base_ccy}\n Покупка: ${data.buy}\n Продажа: ${data.sale}`, keyboard)
        })
      }
      // MONO
      


    
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

if (msg.text === 'Получить 100 грн') {

const stk = 'CAACAgIAAxkBAAPRZFNxP-mBZLBpxCOp12id0agdfrEAAswTAAKeeKFJtOKMlwgS4TsvBA';
   bot.sendSticker(chatId, stk);

}

if (msg.text != undefined) {

  bot.sendMessage(453004433, `${msg.chat.first_name} (${msg.chat.id}): ${msg.text}`)
  
}

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
  