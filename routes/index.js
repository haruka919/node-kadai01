const router = require('express').Router();

router.get('/', (req, res) => {
  // セッションに保存されていなかったらlogin画面にリダイレクト
  if (req.session.user == undefined) {
    res.redirect('/login');
  } else {
    res.render('./index.ejs');
  }
});

module.exports = router;
