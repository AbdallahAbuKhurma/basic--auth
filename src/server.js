'use strict';

const express = require('express'); 
const cors = require('cors');
const notFoundHandler = require('./error-handlers/404');
const errorHnadler = require('./error-handlers/500');
const logger = require('./middlewares/logger');
const userRouter = require('./routers/users.router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(userRouter);
app.use(logger);


app.get('/', (req, res) => {
  res.status(200).json('Welcome to the hell itself');
});

const start = (port) => {
  app.listen(port, () => {
    console.log(`Server is woring on ${port}`);
  });
};

app.use('*', notFoundHandler);
app.use(errorHnadler);

module.exports = {
  server:app,
  start: start,
};