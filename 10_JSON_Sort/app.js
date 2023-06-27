const axios = require('axios');

// Функция для получения значения ключа "isDone"
async function getIsDone(url) {
  try {
    const response = await axios.get(url);
    const isDone = response.data.isDone;
    console.log(`${url} : isDone - ${isDone}`);
    return isDone;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Список адресов эндпоинтов
const endpoints = [
    'https://jsonbase.com/lambdajson_type1/793',
    'https://jsonbase.com/lambdajson_type1/955',
    'https://jsonbase.com/lambdajson_type1/231',
    'https://jsonbase.com/lambdajson_type1/931',
    'https://jsonbase.com/lambdajson_type1/93',
    'https://jsonbase.com/lambdajson_type2/342',
    'https://jsonbase.com/lambdajson_type2/770',
    'https://jsonbase.com/lambdajson_type2/491',
    'https://jsonbase.com/lambdajson_type2/281',
    'https://jsonbase.com/lambdajson_type2/718',
    'https://jsonbase.com/lambdajson_type3/310',
    'https://jsonbase.com/lambdajson_type3/806',
    'https://jsonbase.com/lambdajson_type3/469',
    'https://jsonbase.com/lambdajson_type3/258',
    'https://jsonbase.com/lambdajson_type3/516',
    'https://jsonbase.com/lambdajson_type4/79',
    'https://jsonbase.com/lambdajson_type4/706',
    'https://jsonbase.com/lambdajson_type4/521',
    'https://jsonbase.com/lambdajson_type4/350',
    'https://jsonbase.com/lambdajson_type4/64',
];

// Функция для получения значения ключа "isDone" для всех эндпоинтов
async function getIsDoneForAllEndpoints() {
  const results = [];
  for (let i = 0; i < endpoints.length; i++) {
    let isDone = null;
    for (let attempt = 1; attempt <= 3 && isDone === null; attempt++) {
      isDone = await getIsDone(endpoints[i]);
    }
    if (isDone !== null) {
      results.push(isDone);
    }
  }
  const trueCount = results.filter(result => result === true).length;
  const falseCount = results.filter(result => result === false).length;
  const undfCount = results.filter(result => result === undefined).length
  console.log(`True - ${trueCount}`);
  console.log(`False - ${falseCount}`);
  console.log(`Undefined - ${undfCount}`);
}

// Вызов функции для получения значения ключа "isDone" для всех эндпоинтов
getIsDoneForAllEndpoints();
