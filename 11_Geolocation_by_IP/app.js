const express = require('express');
const fs = require('fs/promises');
const app = express();


const CSV_PATH = './data.csv';

app.get('/location', (req, res) => {

const strings = async () => {
    const fileContent = await fs.readFile(CSV_PATH, 'utf-8');
    const lines = fileContent.replace(/["\r]/g, '').split('\n');
    let count = 0;
    const arrayOfFileStrings = fileContent.split(`\n`);
    const arrayOfFilesArrays = arrayOfFileStrings.map((str) => {
      str.replace("'", "");
      const a = str.replace('\r', '').split(',');
      const range = {
        min: Number(a[0].slice(1, a[0].length - 1)),
        max: Number(a[1].slice(1, a[1].length - 1)),
        country: a[2],
      };
  
      return range;
    });
  
    // console.log(arrayOfFilesArrays);
  
    const ipAddressToCompare = req.headers['x-forwarded-for']; // Здесь указывается IP-адрес, который нужно сравнить
  
    const ipToDecimal = (ip) => {
      var parts = ip.split('.');
      var decimal = 0;
  
      for (var i = 0; i < parts.length; i++) {
        decimal = decimal * 256 + parseInt(parts[i], 10);
      }
  
      return decimal;
    };
  
    const decimalFormat = ipToDecimal(ipAddressToCompare);
  
    const foundRange = arrayOfFilesArrays.find((range) => {
      return decimalFormat >= range.min && decimalFormat <= range.max;
    });
  
    if (foundRange) {
      console.log(
        'IP-адрес ' +
          ipAddressToCompare +
          ' находится в диапазоне ' +
          foundRange.country
      );

      res.send(
        'IP-адрес ' +
          ipAddressToCompare +
          ' находится в диапазоне ' +
          foundRange.country
      );

    } else {
      console.log('IP-адрес ' + ipAddressToCompare + ' не найден в диапазонах');
    }
  };
  
  strings();

})

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
  });