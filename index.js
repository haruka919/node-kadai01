const express = require('express');
const app = express();

const session = require('express-session');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

// セッションの設定
const session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 },
};
app.use(session(session_opt));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// routeの設定
app.use('/', require('./routes/index.js'));
app.listen(8889);
