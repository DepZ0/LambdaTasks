const fs = require('fs');
const { uniq } = require('lodash');
let allUsers = 0;
let uniqUsers = 0;
// let repUsers = 0;
async function checkUsernames() {
  
    for (let i = 0; i < 20; i++) {
    const fileContent = await fs.promises.readFile(`./base/out${i}.txt`, 'utf-8');
    const usernames = fileContent.split('\n');
    allUsers += usernames.length;
    // console.log(`Всего имен пользователей: ${[i]} : ${allUsers}`);
    // Далее следует код для проверки уникальности ников
    const uniqueUsernames = new Set();
let duplicates = 0;

for (const username of usernames) {
  if (uniqueUsernames.has(username)) {
    duplicates++;
  } else {
    uniqueUsernames.add(username);
  }

}
uniqUsers += uniqueUsernames.size;
// repUsers += duplicates;

// console.log(`Уникальные имена пользователей: ${uniqUsers}`);
// console.log(`Повторяющиеся имена пользователей: ${repUsers} \n`);
  
    }  
    const result = `Всего имен пользователей: ${allUsers}\n Уникальных значений: ${uniqUsers}\n`
    console.log(result);
}

checkUsernames();

// -------------------------------------------------------------------------------------------------------------------

async function countCommonUsernames(filePaths) {
  try {
    // читаем содержимое всех файлов и объединяем их в одну строку
    const allUsernames = await Promise.all(
      filePaths.map(filePath => fs.promises.readFile(filePath, 'utf-8'))
    );
    const allUsernamesStr = allUsernames.join('\n');

    // создаем объект, где ключом является юзернейм, а значением количество его вхождений во всех файлах
    const usernameCounts = {};
    const usernames = allUsernamesStr.split('\n');
    for (const username of usernames) {
      if (username) { // игнорируем пустые строки
        usernameCounts[username] = (usernameCounts[username] || 0) + 1;
      }
    }

    // находим количество юзернеймов, которые встречаются во всех файлах
    let count = 0;
    for (const username in usernameCounts) {
      if (usernameCounts[username] === filePaths.length) {
        count++;
      }
    }

    console.log(`\nСловосочетаний, которые есть во всех 20 файлах: ${count}\n`);
  } catch (err) {
    console.error(err);
  }
}

// пример использования функции
function fp () {
  let filePath = [];
  for (let i = 0; i < 20; i++) {
    filePath.push(`./base/out${i}.txt`)
  }
  return filePath
}
countCommonUsernames(fp());

// -------------------------------------------------------------------------------------------------------------------

async function countCommonUsernamesInFiles(filePaths, minFileCount) {
  try {
    const allUsernames = await Promise.all(
      filePaths.map(filePath => fs.promises.readFile(filePath, 'utf-8'))
    );
    const allUsernamesStr = allUsernames.join('\n');
    const usernameCounts = {};
    const usernames = allUsernamesStr.split('\n');
    for (const username of usernames) {
      if (username) {
        usernameCounts[username] = (usernameCounts[username] || 0) + 1;
      }
    }

    let count = 0;
    for (const username in usernameCounts) {
      if (usernameCounts[username] >= minFileCount) {
        count++;
      }
    }

    console.log(`Словосочетаний, которые есть, как минимум, в ${minFileCount} файлах: ${count}\n`);
  } catch (err) {
    console.error(err);
  }
}

// пример использования функции

countCommonUsernamesInFiles(fp(), 10);