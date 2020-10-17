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
    req.check('name', 'NAME は必ず入力して下さい。').notEmpty();
    req.check('email', 'EMAIL はメールアドレスを入力して下さい。').isEmail();
    req.check('password', 'PASSWORD は7文字以上で入力して下さい。').isLength({ min: 7 });
    req.assert('comfirm_password', '確認用の値と一致しません。').equals(req.body.password);
    req.getValidationResult().then((result) => {
      // バリデーション失敗
      if (!result.isEmpty()) {
        let content = '<ul class="error">';
        const result_arr = result.array();　　// エラー内容が配列に返る
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
    })
  }
}