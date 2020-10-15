const express = require('express');
const app = express();

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// routeの設定
app.use('/', require('./routes/index.js'));
app.listen(8889);
