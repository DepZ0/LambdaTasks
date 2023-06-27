import * as express from 'express';
import router from './router.js';

const app = express();




app.use('/api', router);











app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});