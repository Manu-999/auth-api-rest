const express = require('express');
const app = express();
//  const app = require('express)();   ----->> es lo mismo que lo de arriba
const fs = require('fs');

// body parse to json ----> middleware para indicar que todo se lea como json
app.use(express.json());

const port = process.argv[2] || 3000

app.get('/ping', (request, response) => {
  let myResponse = {
    code: 200,
    data: 'pong'
  }
  response.json(myResponse)
  console.log('Alguien ha hecho una peticion GET a /ping');
});

app.post('/register', (req, res) => {
  let { username, email, password } = req.body;

  if (username && email && password) {

    // get text from file
    const dataString = fs.readFileSync('./database.json', 'UTF-8');
    // parse json string to object
    const data = JSON.parse(dataString);
    // update object
    data.users.push(req.body);
    // transform object to string
    const outPutString = JSON.stringify(data);
    // write string to file
    fs.writeFileSync('./database.json', outPutString);
    // response
    res.status(201).json({ data: 'created' });

  } else {
    res.status(400).json({ message: 'necesitamos los 3 parámetros' });
  }

});

app.listen(port, () => console.log(`App running on port ${port}`));



