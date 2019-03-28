const express = require('express');
const app = express();
//  const app = require('express)();   ----->> es lo mismo que lo de arriba
const resgisterController = require('./controllers/register');
const loginController = require('./controllers/login');

// body parse to json ----> middleware para indicar que todo se lea como json
app.use(express.json());

// servir archivos html

app.use(express.static('public'));

const port = process.argv[2] || 3000;

app.get('/ping', (request, response) => {
  let myResponse = {
    code: 200,
    data: 'pong'
  }
  response.json(myResponse);
  console.log('Alguien ha hecho una peticion GET a /ping');
});

app.post('/register', resgisterController);
app.post('/login', loginController);

app.listen(port, () => console.log(`App running on port ${port}`));

