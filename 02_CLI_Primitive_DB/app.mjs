import inquirer from 'inquirer';
import fs from 'fs';


const dataPath = './data.json';

// Проверяем, существует ли файл с данными
if (!fs.existsSync(dataPath)) {
  // Если файл не существует, создаем пустой массив и записываем его в файл
  fs.writeFileSync(dataPath, '[]');
}

// Читаем данные из файла и парсим их из JSON в массив объектов
const readData = () => JSON.parse(fs.readFileSync(dataPath));

// Записываем массив объектов в файл в формате JSON
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data));

// Функция для создания новой записи
const createRecord = async () => {
  const { name, gender, age } = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Введите имя:' },


    { type: 'list',
      name: 'gender',
      message: 'Укажите Ваш пол:',
      choices: ['М', 'Ж'] },
      
    
    { type: 'input', name: 'age', message: 'Введите Ваш возраст:' },
  ]);

  const newData = { name, gender, age };

  // Читаем текущие данные из файла, добавляем новый объект в массив и записываем обновленные данные в файл
  const currentData = readData();
  currentData.push(newData);
  writeData(currentData);

  console.log('Новая запись успешно создана!');
};

// Функция для поиска записей
const searchRecords = async () => {
  const { search } = await inquirer.prompt([
    { type: 'input', name: 'search', message: 'Введите поисковый запрос:' },
  ]);

  // Читаем данные из файла, фильтруем массив объектов и выводим результаты на экран
  const currentData = readData();
  const filteredData = currentData.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.gender.toLowerCase().includes(search.toLowerCase()) ||
      user.age.toLowerCase().includes(search.toLowerCase())
  );
  console.table(filteredData);
};

// Основная функция приложения
const main = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Выберите действие:',
      choices: ['Создать новую запись', 'Найти записи'],
    },
  ]);

  if (action === 'Создать новую запись') {
    await createRecord();
  } else if (action === 'Найти записи') {
    await searchRecords();
  }

  // Запрашиваем у пользователя, хочет ли он продолжить работу с приложением
  const { again } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'again',
      message: 'Хотите продолжить?',
      default: true,
    },
  ]);

  if (again) {
    main();
  } else {
    console.log('До свидания!');
  }
};

// Запускаем основную функцию
main();