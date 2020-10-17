const router = require('express').Router();
const register = require('../controllers/registerController')

const knex = require('knex')({
  dialect: 'mysql',       // 使用するデータベースを指定
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'node_db',
    charset: 'utf8',
  },
});

const BookShelf = require('bookshelf')(knex);

// データベースにあるテーブルを扱うためのオブジェクトを作成
const User = BookShelf.Model.extend({
  hasTimestamps: true,
  tableName: 'users',
});

router.get('/', register.show);

// ユーザー登録の送信処理
router.post('/', register.create);

module.exports = router;
