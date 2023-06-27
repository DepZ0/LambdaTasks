const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sortWordsAlphabetically(words) {
  return words.sort();
}

function displayNumbersAscending(numbers) {
  return numbers.sort((a, b) => a - b);
}

function displayNumbersDescending(numbers) {
  return numbers.sort((a, b) => b - a);
}

function sortWordsByLength(words) {
  return words.sort((a, b) => a.length - b.length);
}

function showUniqueWords(words) {
  return [...new Set(words)];
}

function showUniqueValues(input) {
  const values = input.split(' ').map((wordOrNumber) => {
    const parsed = parseFloat(wordOrNumber);
    return Number.isNaN(parsed) ? wordOrNumber : parsed;
  });
  return [...new Set(values)];
}

function askForInput() {
  rl.question('Введите несколько слов и чисел через пробел: ', (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    const wordsAndNumbers = input.split(' ');
    const words = wordsAndNumbers.filter((wordOrNumber) => isNaN(wordOrNumber));
    const numbers = wordsAndNumbers.filter((wordOrNumber) => !isNaN(wordOrNumber)).map((number) => parseFloat(number));

    rl.question('Какую операцию вы хотите выполнить? ', (operation) => {
      let result;
      switch (operation.toLowerCase()) {
        case '1':
          result = sortWordsAlphabetically(words);
          break;
        case '2':
          result = displayNumbersAscending(numbers);
          break;
        case '3':
          result = displayNumbersDescending(numbers);
          break;
        case '4':
          result = sortWordsByLength(words);
          break;
        case '5':
          result = showUniqueWords(words);
          break;
        case '6':
          result = showUniqueValues(input);
          break;
        default:
          console.log(`Неизвестная операция: ${operation}`);
          askForInput();
          return;
      }

      console.log(`Результат: ${result.join(' ')}`);
      askForInput();
    });
  });
}

askForInput();
