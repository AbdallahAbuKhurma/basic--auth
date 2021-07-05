'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(`${MONGO_URI}/auth`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,

}).then(() => {
  server.start(PORT);

}).catch((err) => {
  console.log('CONNECTION ERROR', err.message);
});
