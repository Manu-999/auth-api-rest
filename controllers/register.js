const fs = require('fs');
const validator = require('validator');
const uniqid = require('uniqid');

module.exports = (req, res) => {
  let { username, email, password } = req.body;
  // console.log(req.body);
  // get text from file
  const dataString = fs.readFileSync('./database.json', 'UTF-8');
  // parse json string to object
  let data = JSON.parse(dataString);
  // console.log(data);

  if (username && email && password) {

    if (data.users.find(user => user.username === username)) {
      res.status(401).json({ message: 'El nombre de usuario elegido ya existe.' });
      return;
    }

    if (password.length < 8) {
      res.status(401).json({ message: 'La contraseña debe tener, al menos, 8 caracteres.' });
      return;
    }

    if (!validator.isEmail(email)) {
      res.status(401).json({ message: 'El email introducido no es un email válido.' });
      return;
    }

    if (data.users.find(user => user.email === email)) {
      res.status(401).json({ message: 'El email introducido ya está registrado.' });
      return;
    }

    const newUser = {
      id: uniqid(),
      username,
      email,
      password
    };

    // update object
    data.users.push(newUser);
    // transform object to string
    const outPutString = JSON.stringify(data);

    // write string to file
    fs.writeFileSync('./database.json', outPutString);
    // response
    res.status(201).json({ message: 'Usuario creado correctamente' });

  } else {
    res.status(400).json({ message: 'necesitamos los 3 parámetros' });
  }
}
