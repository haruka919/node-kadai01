const express = require('express');
const app = express();

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

// routeの設定
app.use('/', require('./routes/index.js'));
app.listen(8889);
