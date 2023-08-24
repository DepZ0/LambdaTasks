import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const token = 'TOKEN';
const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {
  if (msg.text.toLowerCase() === 'photo') {
    axios.get('https://picsum.photos/200/300', { responseType: 'stream' })
      .then(response => {
        bot.sendPhoto(msg.chat.id, response.data);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    console.log(`Received message from ${msg.chat.first_name} (${msg.chat.id}): ${msg.text}`);
  }
});