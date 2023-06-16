const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => console.log(err));

module.exports = mongoose;
