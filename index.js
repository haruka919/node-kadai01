const express = require('express');
const app = express();

const validator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const setUser = require('./routes/setUser');

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

// バリデーション
app.use(validator());

app.use(cookieParser());

// POSTデータを取得する時に必要
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// セッションの設定
const session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 },
};
app.use(session(session_opt));


app.use('/', setUser, indexRouter);
app.use('/login', setUser, loginRouter);
app.use('/register', setUser, registerRouter);

// routeの設定
app.use('/', require('./routes/index.js'));
app.listen(8889);
