const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Adminrouter = require('../express-praqc/routes/admin.js');
const Userrouter = require('../express-praqc/routes/user.js');

app.use(bodyParser.json());
app.use('/admin', Adminrouter);
app.use('/user', Userrouter);

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
