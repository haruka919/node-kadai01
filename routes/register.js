const router = require('express').Router();

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

router.get('/', (req, res) => {
  let data = {
    title: '会員登録',
    form: {
      name: '',
      email: '',
    },
    content: '',
  };
  res.render('./register.ejs', data);
});

// ユーザー登録の送信処理
router.post('/', (req, res, next) => {
  req.check('name', 'NAME は必ず入力して下さい。').notEmpty();
  req.check('email', 'EMAIL はメールアドレスを入力して下さい。').isEmail();
  req.check('password', 'PASSWORD は7文字以上で入力して下さい。').isLength({ min: 7 });
  req.assert('comfirm_password', '確認用の値と一致しません。').equals(req.body.password);
  req.getValidationResult().then((result) => {
    // バリデーションに引っかかったらエラーメッセージを表示
    if (!result.isEmpty()) {
      let content = '<ul class="error">';
      let result_arr = result.array();　　// エラー内容が配列に返る
      for (let n in result_arr) {
        content += '<li>' + result_arr[n].msg + '</li>';
      }
      content += '</ul>';
      let data = {
        title: '会員登録',
        content: content,
        form: req.body,　// nameとemailは入力したものを返す
      };
      res.render('register', data);
    } else {
      console.log('OK')
    }
  })
});


module.exports = router;
