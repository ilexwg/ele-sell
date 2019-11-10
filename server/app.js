const express = require('express');
const app = express();
const config = require('../config/index');
const port = config.build.port;
const router = express.Router();

// 设置跨域访问
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

const appData = require('../data.json');
const {seller, goods, ratings} = appData;

router.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  });
});

router.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  });
});

router.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', router);

app.listen(port, function () {
  console.log(`Server is running at port http://localhost:${port}`);
});
