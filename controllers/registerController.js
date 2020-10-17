const { validationResult } = require('express-validator/check');
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

module.exports = {
  // ユーザー登録画面表示
  show (req, res) {
    const data = {
      title: '会員登録',
      form: {
        name: '',
        email: '',
      },
      content: '',
    };
    res.render('./register.ejs', data);
  },
  // ユーザー登録の送信処理
  create (req, res) {
    // バリデーションの結果にエラーがあるかのチェック
      const errors = validationResult(req);
      // バリデーション失敗
      if (!errors.isEmpty()) {
        let content = '<ul class="error">';
        const result_arr = errors.array();　　// エラー内容が配列に返る
        for (let n in result_arr) {
          content += '<li>' + result_arr[n].msg + '</li>';
        }
        content += '</ul>';
        const data = {
          title: '会員登録',
          content: content,
          form: req.body,　// nameとemailは入力したものを返す
        };
        res.render('register', data);
      } else {
        // バリデーション成功(ユーザー登録後、ホーム画面にリダイレクト)
        new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
        .save()
        .then(() => {
          // セッションにnameを保存
          req.session.user = req.body.name;
          res.redirect('/');
        });
      }
  }
}