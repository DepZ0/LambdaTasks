

const url = 'http://localhost:5000/auth';




function signUp () {
    let user_email = document.querySelector('.inp_email').value;
    let user_pass = document.querySelector('.inp_pass').value;

    const data = {
        username: user_email,
        password: user_pass
      };
      
      axios.post(`${url}/registration`, data)
        .then(response => {
          console.log('Успешный запрос!');
          console.log('Ответ от сервера:', response.data);
        })
        .catch(error => {
          console.error('Ошибка запроса:', error);
        });
}

function login () {
    const loginUrl = `${url}/login`;
    let user_email = document.querySelector('.inp_email').value;
    let user_pass = document.querySelector('.inp_pass').value;

    const data = {
        username: user_email,
        password: user_pass
      };

axios.post(loginUrl, data)
  .then(response => {
    console.log('Успешная аутентификация!');
    const token = response.data.token; // Получаем токен из ответа
    // Пример отправки других запросов с использованием полученного токена
    const profileUrl = `${url}/users`;
    const headers = {
      Authorization: `Bearer ${token}` // Устанавливаем заголовок Authorization с токеном
    };

    // Пример GET-запроса с использованием токена
    axios.get(profileUrl, { headers })
      .then(response => {
        console.log('Профиль пользователя:', response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении профиля:', error);
      });

    // Пример других запросов...
  })
  .catch(error => {
    console.error('Ошибка аутентификации:', error);
  });
}

document.querySelector('.but1').onclick = () => { signUp(); }
document.querySelector('.but2').onclick = () => { 
  fetch('http://localhost:5000/auth/test')
 }
