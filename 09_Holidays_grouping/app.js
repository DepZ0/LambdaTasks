const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Ошибка чтения файла: ", err);
    return;
  }

    const data = JSON.parse(jsonString);
    console.log("Содержимое файла data.json: ", data);

// Создать объект для хранения данных о пользователях и их отпусках
const users = {};

// Пройти по каждой заявке и добавить информацию об отпуске в соответствующий объект пользователя
data.forEach((request) => {
  const userId = request.user._id;
  if (!users[userId]) {
    users[userId] = {
      userId: userId,
      name: request.user.name,
      weekendDates: [],
    };
  }
  users[userId].weekendDates.push({
    startDate: request.startDate,
    endDate: request.endDate,
  });
});

// Преобразовать объект в массив пользователей
const result = Object.values(users);

// Вывести результат
console.log(result);


});


