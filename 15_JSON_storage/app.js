const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();
const mongoUrl = `mongodb+srv://ADMIN:admin@cluster1.pqqtk1a.mongodb.net/?retryWrites=true&w=majority`; // URL для подключения к MongoDB

app.use(bodyParser.json());

// Создание схемы и модели для хранения JSON
const jsonSchema = new mongoose.Schema({
  route: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
});
const JsonModel = mongoose.model('Json', jsonSchema);

// Обработчик POST-запроса для сохранения JSON по указанному маршруту
app.post('/:route', async (req, res) => {
  const { route } = req.params;
  const { body } = req;

  try {
    // Проверка, существует ли JSON с указанным маршрутом
    let json = await JsonModel.findOne({ route });

    if (json) {
      // Если JSON существует, обновляем его данные
      json.data = body;
    } else {
      // Если JSON не существует, создаем новую запись
      json = new JsonModel({ route, data: body });
    }

    await json.save();

    res.status(200).json({ message: 'JSON сохранен' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Обработчик GET-запроса для получения JSON по указанному маршруту
app.get('/:route', async (req, res) => {
  const { route } = req.params;

  try {
    // Поиск JSON по указанному маршруту
    const json = await JsonModel.findOne({ route });

    if (json) {
      res.status(200).json(json.data);
    } else {
      res.status(404).json({ message: 'JSON не найден' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

const start = async () => {
  try {
    await mongoose.connect(mongoUrl);
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
