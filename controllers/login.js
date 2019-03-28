const fs = require('fs');

module.exports = (req, res) => {
  let { email, password } = req.body;
  // console.log(req.body);
  // get text from file
  const dataString = fs.readFileSync('./database.json', 'UTF-8');
  // parse json string to object
  let data = JSON.parse(dataString);
  // console.log(data);

  if (email && password) {
    let userFound = data.users.find(user => user.email === email && user.password === password);
    if (!userFound) {
      res.status(401).json({ message: 'El email introducido o la contraseña no es correcto' });
      return;
    }

    // response
    res.status(201).json({ message: `Bienvenido ${userFound.username}` });
  } else {
    res.status(400).json({ message: 'necesitamos los 3 parámetros' });
  }
};


