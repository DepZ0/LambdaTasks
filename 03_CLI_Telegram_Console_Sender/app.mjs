import inquirer from "inquirer";
import {program} from 'commander';
import TelegramBot from "node-telegram-bot-api";
import fs from 'fs';


const token = '5878335229:AAH9qlu-NQYIWrVeYzALkzEBNOdm3757Scg';
const bot = new TelegramBot(token, {polling: true});

function sendMessage(text) {
  bot.sendMessage(453004433, `${text}`);
}

function handleCommand(command, text) {
  switch (command) {
    case 'n':
      sendMessage(text);
      break;
    case 'h':
      help();
      break;
    case 'p':
      photo(text);
      break;
    default:
      console.log('Неверная команда');
      break;
  }
}

function help() {
  console.log('Список команд:\n n - отправить текст\n h - вызвать справку\n p - показать фото');
}

function photo(text) {
  bot.sendPhoto(453004433, `${text}`);
}

function main () {
inquirer
  .prompt([
    {
      type: 'input',
      name: 'commandAndText',
      message: 'Введите команду и текст в формате "команда текст":',
      validate: function (input) {
        // Проверяем, что строка имеет правильный формат
        const parts = input.split(' ');
        const command = parts[0];
        if (command === 'h') {
          return true;
        }
        if (parts.length < 2) {
          return 'Неверный формат. Введите команду и текст в формате "команда текст"';
        }
        if (!['n', 'p'].includes(command)) {
          return 'Неверная команда';
        }
        return true;
      },
    },
  ])
  .then((answers) => {
    // Обработка введенной команды и текста
    const parts = answers.commandAndText.split(' ');
    const command = parts[0];
    const text = parts.slice(1).join(' ');
    handleCommand(command, text);
    main();
  });
}
main();
