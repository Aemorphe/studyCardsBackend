const express = require('express');
const mongoose = require('mongoose');
const dbRoutes = require('./routes/databaseAccess.js');
const bodyParser = require('body-parser');

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
// initialize http server
const app = express();
//const router = Router();

// MIDDLEWARE
app.use(express.static('build'));
app.use('/db', dbRoutes);
app.use(bodyParser.json());
// handle / route
app.get('/', (req, res) =>
  res.send('Hello world.')
)

// launch server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${port}`);
})
