const router = require('express').Router();
const mysql = require('mysql');

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

const User = BookShelf.Model.extend({
  hasTimestamps: true,
  tableName: 'users',
});

router.get('/', (req, res) => {
  res.render('./register.ejs');
});

module.exports = router;
