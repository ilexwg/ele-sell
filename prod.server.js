const express = require('express');
const config = require('./config/index');
const app = express();
const port = process.env.PORT || config.build.port;
const router = express.Router();

// 设置跨域访问
// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//   res.header('X-Powered-By', ' 3.2.1');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

router.get('/', (req, res, next) => {
  req.url = '/index.html';
  next();
});

app.use(router);

const appData = require('./data.json');
const {seller, goods, ratings} = appData;

const apiRouter = express.Router();

apiRouter.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRouter.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRouter.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRouter);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at port http://localhost:${port}`);
});
