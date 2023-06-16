const express = require('express');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT;

const router = require('./router');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
