const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
app.use(bodyParser.json());

// Хранилище ссылок
const links = {};

// Обработчик POST-запроса для создания укороченной ссылки
app.post('/shorten', (req, res) => {
  const { url } = req.body;
  const id = shortid.generate(); // Генерация уникального идентификатора

  links[id] = url;

  const shortenedUrl = `shortlink/${id}`; // Замените на ваш домен

  res.json({ shortenedUrl });
});

// Обработчик GET-запроса для перехода по укороченной ссылке
app.get('/:id', (req, res) => {
  const { id } = req.params;
  const originalUrl = links[id];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('Ссылка не найдена');
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
