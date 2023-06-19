const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// router
const writerRouter = require('./app/api/v1/writer/router');
const participantsRouter = require('./app/api/v1/participants/router');
const imagesRouter = require('./app/api/v1/images/router');
// const categoriesRouter = require('./app/api/v1/categories/router');

const urlV1 = '/api/v1';


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to api semina',
  });
});

// app.use(`${urlV1}/cms`, categoriesRouter);
app.use(`${urlV1}/cms`, writerRouter);
app.use(`/api/v1`, participantsRouter);
app.use(`${urlV1}/cms`, imagesRouter);


module.exports = app;
