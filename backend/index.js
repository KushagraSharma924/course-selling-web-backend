const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Adminrouter = require('../backend/routes/admin.js');
const Userrouter = require('../backend/routes/user.js');

app.use(bodyParser.json());
app.use('/admin', Adminrouter);
app.use('/user', Userrouter);

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
