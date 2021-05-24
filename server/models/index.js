const mongoose = require('mongoose');
const Todo = require('./todo');
require('dotenv/config');

const uri = process.env.DATABASE_URL || 'mongodb://localhost/express-app';
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectDb = () => mongoose.connect(uri, options)
  .catch((err) => {
    throw err;
  });

const models = { Todo };

module.exports = {
  connectDb,
  models,
};
