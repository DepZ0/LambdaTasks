const fs = require('fs');


async function checkUsernames() {
  let allUsers = 0;
  let uniqUsers = 0;

  const allUsernames = await Promise.all(
    filePath().map(filePath => fs.promises.readFile(filePath, 'utf-8'))
      );
  const allUsernamesStr = allUsernames.join('\n');

  const usernames = allUsernamesStr.split('\n');
    allUsers += usernames.length;

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

async function countCommonUsernamesInNFiles(filePaths, n) {
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

    // находим количество юзернеймов, которые встречаются в 10 или более файлах
    let count = 0;
    for (const username in usernameCounts) {
      if (usernameCounts[username] >= n) {
        count++;
      }
    }

    console.log(`\nСловосочетаний, которые есть в не менее чем ${n} файлах: ${count}\n`);
  } catch (err) {
    console.error(err);
  }
}
countCommonUsernamesInNFiles(filePath(), 10);

// пример использования функции
function filePath () {
  let filePath = [];
  for (let i = 0; i < 20; i++) {
    filePath.push(`./base/out${i}.txt`)
  }
  return filePath
}
countCommonUsernames(filePath());

// -------------------------------------------------------------------------------------------------------------------

// function countCommonUsernamesInFiles(arrays, n) {
//   const set = new Map();
//     for (let i = 0; i < arrays.length; i++) {
//         const setArr = new Set(arrays[i]);
//         for (const elem of setArr ) {
//           const count = set.get(elem) || 0;
//           set.set(elem, count + 1)
//         }
//     }

//     return arrays.filter((e) => {
//       return set.get(e) >= n;
//     })
//   }

// // пример использования функции

// console.log(countCommonUsernamesInFiles(fp(), 10))
