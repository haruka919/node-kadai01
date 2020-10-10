const express = require('express');
const app = express();

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

// staticメソッドを利用し、指定ディレクトリ以下の静的ファイルを読み込む
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// routeの設定
app.use('/', require('./routes/index.js'));
app.listen(3000);
