const express = require('express');

const app = express();

app.get('/', (req, res) => app.res(console.log('Petition done')));

app.listen(8080, () => console.log('Server running on port 8080'));

